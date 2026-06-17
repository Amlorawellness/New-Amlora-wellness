import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function onRequestPost({ request, env }: { request: Request; env: any }) {
  console.log("[CLOUDFLARE ENDPOINT] Order request received.");
  try {
    const body: any = await request.json();
    const { formData, cartItems, cartTotal, paymentMethod, razorpayId } = body;

    // 1. Validation check
    if (!formData || !cartItems || !cartItems.length) {
      console.warn("[CHECKOUT ERROR] Missing basic order data parameters.");
      return new Response(JSON.stringify({ success: false, error: "Missing required order data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { name, phone, email, address, city, state, pincode } = formData;
    if (!name || !phone || !email || !address || !city || !state || !pincode) {
      console.warn("[CHECKOUT ERROR] Missing shipping fields.");
      return new Response(JSON.stringify({ success: false, error: "Missing required shipping information" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Initialize Supabase Admin Client dynamically for V8 serverless environments
    const supabaseUrl = env.VITE_SUPABASE_URL || "https://your-supabase-url.supabase.co";
    const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY || "your_supabase_anon_key";

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    // 3. Generate Sequential Order ID
    let orderSeq = 1;
    let orderId = "";
    try {
      const { count, error: countErr } = await supabaseAdmin
        .from("orders")
        .select("*", { count: "exact", head: true });

      if (!countErr && count !== null) {
        orderSeq = count + 1;
        orderId = `AML${String(orderSeq).padStart(6, "0")}`;
      } else {
        const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
        const randomNum = Math.floor(100 + Math.random() * 900);
        orderId = `AML${dateStr}${randomNum}`;
      }
    } catch (countExc) {
      const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const randomNum = Math.floor(100 + Math.random() * 900);
      orderId = `AML${dateStr}${randomNum}`;
    }

    const orderDate = new Date().toISOString();

    const newOrder = {
      orderId,
      orderDate,
      customerName: name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      razorpayId: razorpayId || null,
      items: cartItems.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity
      })),
      totalAmount: cartTotal
    };

    // 4. Double Insertion - parent orders & child order_items
    let insertedOrderRef: any = null;
    let failureStage = "before the orders insert";
    const orderPayload = {
      order_number: orderId,
      total_amount: Number(cartTotal),
      payment_method: paymentMethod === "cod" ? "cod" : "prepaid",
      payment_status: paymentMethod === "cod" ? "unpaid" : "paid",
      order_status: "pending",
      shipping_address_snapshot: {
        name,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        razorpay_order_id: razorpayId || null
      }
    };

    console.log(`[DIAGNOSTIC] Current Failure Stage: ${failureStage}`);
    console.log(`[DIAGNOSTIC] Exact orders insert payload:\n`, JSON.stringify(orderPayload, null, 2));

    try {
      failureStage = "during the orders insert";
      console.log(`[DIAGNOSTIC] Current Failure Stage: ${failureStage}`);
      console.log(`[CLOUDFLARE SUPABASE] Querying primary INSERT database request to public.orders table...`);

      const insertResponse = await supabaseAdmin
        .from("orders")
        .insert(orderPayload)
        .select()
        .single();

      console.log("[DIAGNOSTIC] Complete orders insert response:\n", JSON.stringify(insertResponse, null, 2));

      const { data: insertedOrder, error: dbErr } = insertResponse;

      if (dbErr) {
        console.error("[DIAGNOSTIC DATABASE ERROR DETAILS]");
        console.error(`- code:    `, dbErr.code);
        console.error(`- message: `, dbErr.message);
        console.error(`- details: `, dbErr.details);
        console.error(`- hint:    `, dbErr.hint);

        const diagnosticError: any = new Error(dbErr.message || "orders insert error");
        diagnosticError.dbDetails = {
          code: dbErr.code,
          message: dbErr.message,
          details: dbErr.details,
          hint: dbErr.hint
        };
        throw diagnosticError;
      }

      if (!insertedOrder) {
        throw new Error("Retrieve order details returned empty state");
      }

      failureStage = "after the orders insert";
      console.log(`[DIAGNOSTIC] Current Failure Stage: ${failureStage}`);
      insertedOrderRef = insertedOrder;

      failureStage = "during the order_items insert";
      console.log(`[DIAGNOSTIC] Current Failure Stage: ${failureStage}`);

      // Map and write children order items list
      const childItemsPayload = cartItems.map((item: any) => ({
        order_id: insertedOrder.id,
        product_id: item.product.id || null,
        product_name_snapshot: item.product.name,
        sku_snapshot: item.product.sku || item.product.sku_snapshot || item.product.id || "AML_PROD",
        price: Number(item.product.price),
        quantity: Number(item.quantity)
      }));

      console.log(`[DIAGNOSTIC] Exact order_items insert payload:\n`, JSON.stringify(childItemsPayload, null, 2));

      const childResponse = await supabaseAdmin
        .from("order_items")
        .insert(childItemsPayload);

      console.log("[DIAGNOSTIC] Complete order_items insert response:\n", JSON.stringify(childResponse, null, 2));

      const { error: itemsErr } = childResponse;

      if (itemsErr) {
        console.error("[DIAGNOSTIC ERROR] Child items insert failed. Rollbacking parent:", insertedOrder.id);
        await supabaseAdmin.from("orders").delete().eq("id", insertedOrder.id);

        console.error("[DIAGNOSTIC ORDER_ITEMS DATABASE ERROR DETAILS]");
        console.error(`- code:    `, itemsErr.code);
        console.error(`- message: `, itemsErr.message);
        console.error(`- details: `, itemsErr.details);
        console.error(`- hint:    `, itemsErr.hint);

        const diagnosticError: any = new Error(itemsErr.message || "order_items insert error");
        diagnosticError.dbDetails = {
          code: itemsErr.code,
          message: itemsErr.message,
          details: itemsErr.details,
          hint: itemsErr.hint
        };
        throw diagnosticError;
      }

      console.log("[CLOUDFLARE SUPABASE SUCCESS] Consistency achieved. Sub-items linked.");

    } catch (dbTxError: any) {
      console.error("[CLOUDFLARE DATABASE EXCEPTION]");
      console.error("- Message:", dbTxError.message);
      console.error("- Stack:", dbTxError.stack);
      if (dbTxError.dbDetails) {
        console.error("- PostgreSQL/Supabase raw properties:", JSON.stringify(dbTxError.dbDetails, null, 2));
      }

      // Return ONLY raw/original Supabase/PostgreSQL error fields exactly inside error & details.
      const errorResponse = {
        success: false,
        error: dbTxError.message || String(dbTxError),
        code: dbTxError.dbDetails?.code,
        details: dbTxError.dbDetails?.details,
        hint: dbTxError.dbDetails?.hint,
        stack: dbTxError.stack,
        diagnostic: {
          failureStage: failureStage,
          ordersPayloadSnapshot: orderPayload
        }
      };

      return new Response(JSON.stringify(errorResponse), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 5. Construct Branded HTML Email Templates
    const productListHtml = newOrder.items.map((item: any) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 10px; font-family: sans-serif; font-size: 14px; text-align: left; color: #1e293b;">
          <strong>${item.name}</strong>
        </td>
        <td style="padding: 12px 10px; font-family: sans-serif; font-size: 14px; text-align: center; color: #64748b;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 10px; font-family: sans-serif; font-size: 14px; text-align: right; color: #1e293b; font-weight: bold;">
          ₹${item.total}
        </td>
      </tr>
    `).join("");

    const customerEmailHtml = `
      <div style="background-color: #FAF9F5; padding: 30px 15px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0F3D2E;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <div style="background-color: #0F3D2E; padding: 30px 20px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0; font-family: Georgia, serif; font-size: 26px; font-weight: normal; letter-spacing: 2px;">
              Amlora Wellness
            </h1>
            <p style="color: #ffffff; font-size: 12px; margin: 5px 0 0; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85;">
              Pure Pratapgarh Seedless Elixirs
            </p>
          </div>
          <div style="padding: 30px 25px;">
            <p style="font-size: 16px; margin-top: 0; line-height: 1.5; color: #1e293b;">
              Dear <strong>${name}</strong>,
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: #475569;">
              Thank you for choosing Amlora Wellness. Your order has been placed successfully and is currently being packaged with extreme freshness guidelines.
            </p>
            <div style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9; padding: 15px; margin: 25px 0;">
              <table style="width: 100%; font-size: 13px; color: #475569;" cellpadding="4">
                <tr>
                  <td><strong>Order ID:</strong></td>
                  <td style="color: #0F3D2E; font-weight: bold;">${orderId}</td>
                </tr>
                <tr>
                  <td><strong>Payment Mode:</strong></td>
                  <td style="text-transform: uppercase;">${paymentMethod === "cod" ? "Cash on Delivery (COD)" : `Prepaid - ${razorpayId}`}</td>
                </tr>
                <tr>
                  <td><strong>Estimated Delivery:</strong></td>
                  <td style="color: #15803d; font-weight: bold;">3-4 Business Days</td>
                </tr>
              </table>
            </div>
            <h3 style="font-family: Georgia, serif; color: #0F3D2E; border-bottom: 2px solid #0F3D2E; pb: 4px; font-weight: normal; margin-bottom: 12px; font-size: 18px;">
              Sourced Item Summary
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <thead>
                <tr style="background-color: #f1f5f9; border-bottom: 2px solid #e2e8f0;">
                  <th style="padding: 10px; font-family: sans-serif; font-size: 12px; text-transform: uppercase; text-align: left; color: #475569;">Product</th>
                  <th style="padding: 10px; font-family: sans-serif; font-size: 12px; text-transform: uppercase; text-align: center; color: #475569;">Qty</th>
                  <th style="padding: 10px; font-family: sans-serif; font-size: 12px; text-transform: uppercase; text-align: right; color: #475569;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${productListHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 15px 10px 5px; font-size: 14px; text-align: right; font-weight: bold; color: #64748b;">Grand Total:</td>
                  <td style="padding: 15px 10px 5px; font-size: 16px; text-align: right; font-weight: 900; color: #0F3D2E;">₹${cartTotal}</td>
                </tr>
              </tfoot>
            </table>
            <h3 style="font-family: Georgia, serif; color: #0F3D2E; border-bottom: 1px solid #e2e8f0; pb: 4px; font-weight: normal; margin-bottom: 10px; font-size: 16px;">
              Delivery Address
            </h3>
            <p style="font-size: 14px; line-height: 1.5; color: #475569; background-color: #fbfbf9; padding: 12px; border-radius: 6px; border: 1px dashed #ded6c9; margin-top: 0;">
              ${address}<br/>
              ${city}, ${state} - <strong>${pincode}</strong><br/>
              Contact: ${phone}
            </p>
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="font-size: 11px; color: #94a3b8; line-height: 1.4; margin: 0;">
                For any support queries, reply directly to this message or write us at <a href="mailto:info@amlorawellness.com" style="color: #D4AF37; text-decoration: none;">info@amlorawellness.com</a>.
              </p>
              <p style="font-size: 11px; color: #94a3b8; font-style: italic; margin: 8px 0 0;">
                Amlora Wellness Premium Sourcing Unit, Pratapgarh.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const adminEmailHtml = `
      <div style="background-color: #f1f5f9; padding: 30px 15px; font-family: sans-serif; color: #334155;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #cbd5e1; overflow: hidden;">
          <div style="background-color: #0F3D2E; padding: 20px 25px; color: #ffffff;">
            <p style="text-transform: uppercase; font-size: 11px; tracking-spacing: 2px; color: #D4AF37; margin: 0 0 5px 0; font-weight: bold;">
              Internal Order Desk Alert
            </p>
            <h2 style="margin: 0; font-size: 20px; font-weight: normal;">New Order Received - Amlora Wellness</h2>
          </div>
          <div style="padding: 25px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; width: 140px;">Order ID:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #0F3D2E;">${orderId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Customer Name:</td>
                <td style="padding: 10px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Phone Number:</td>
                <td style="padding: 10px 0; color: #0f172a;">+91 ${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email Address:</td>
                <td style="padding: 10px 0; color: #0f172a;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Order Date/Time:</td>
                <td style="padding: 10px 0; color: #0f172a;">${new Date(orderDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Payment Method:</td>
                <td style="padding: 10px 0; text-transform: uppercase;">${paymentMethod} ${razorpayId ? `(${razorpayId})` : ""}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Shipping Address:</td>
                <td style="padding: 10px 0; color: #0f172a; line-height: 1.5;">
                  ${address}<br/>
                  ${city}, ${state} - <strong>${pincode}</strong>
                </td>
              </tr>
            </table>
            <h4 style="margin: 25px 0 10px 0; color: #0F3D2E; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">Ordered Items Billing Detail</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1;">
                  <th style="padding: 8px; text-align: left; color: #64748b;">Product</th>
                  <th style="padding: 8px; text-align: center; color: #64748b; width: 60px;">Quantity</th>
                  <th style="padding: 8px; text-align: right; color: #64748b; width: 80px;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${productListHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 15px 8px 5px; font-weight: bold; text-align: right; color: #64748b;">Total Amount due:</td>
                  <td style="padding: 15px 8px 5px; font-weight: bold; text-align: right; color: #0F3D2E; font-size: 15px;">₹${cartTotal}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    `;

    // 6. Resend Dispatch
    let customerMailSent = false;
    let adminMailSent = false;
    let mailErrorDiagnostic = "";

    const resendApiKey = env.RESEND_API_KEY;
    const resendFrom = env.RESEND_FROM || "Amlora Wellness <onboarding@resend.dev>";

    if (resendApiKey) {
      try {
        const resendInstance = new Resend(resendApiKey);

        // Send confirmation email to customer
        console.log(`[CLOUDFLARE RESEND] Sending confirmation to customer: ${email}`);
        const customerResponse = await resendInstance.emails.send({
          from: resendFrom,
          to: email,
          subject: `Your Amlora Wellness Order #${orderId} Has Been Confirmed`,
          html: customerEmailHtml,
        });

        if (customerResponse.error) {
          console.error("[CLOUDFLARE RESEND CUSTOMER ERROR]", customerResponse.error);
          mailErrorDiagnostic += `Customer Email Error: ${customerResponse.error.message}. `;
        } else {
          customerMailSent = true;
          console.log(`[CLOUDFLARE RESEND] Customer confirmation email sent successfully.`);
        }

        // Send alert email to admin
        const adminRecipients = ["info@amlorawellness.com", "amlorawellness@gmail.com"];
        console.log(`[CLOUDFLARE RESEND] Sending order alert to admin: ${adminRecipients.join(", ")}`);
        const adminResponse = await resendInstance.emails.send({
          from: resendFrom,
          to: adminRecipients,
          subject: `[New Order Alert] Order #${orderId} - ${name} (₹${cartTotal})`,
          html: adminEmailHtml,
        });

        if (adminResponse.error) {
          console.error("[CLOUDFLARE RESEND ADMIN ERROR]", adminResponse.error);
          mailErrorDiagnostic += `Admin Email Error: ${adminResponse.error.message}. `;
        } else {
          adminMailSent = true;
          console.log(`[CLOUDFLARE RESEND] Admin order alert sent successfully.`);
        }

      } catch (mailException: any) {
        console.error("[CLOUDFLARE RESEND EXCEPTION]", mailException);
        mailErrorDiagnostic = mailException.message || String(mailException);
      }
    } else {
      console.warn("[CLOUDFLARE RESEND MISSING] RESEND_API_KEY is not defined in the environment.");
      mailErrorDiagnostic = "RESEND_API_KEY environment variable is missing on Cloudflare Pages/Worker custom settings.";
    }

    // 7. Safe fallback Return Status (always successful since order is backed up to database)
    if (customerMailSent && adminMailSent) {
      return new Response(JSON.stringify({
        success: true,
        orderCreated: true,
        customerEmailSent: true,
        adminEmailSent: true,
        orderId,
        orderSummary: newOrder
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      console.warn("[CLOUDFLARE MAIL WARNING] Order created successfully but transaction-email notifications degraded:", mailErrorDiagnostic);
      return new Response(JSON.stringify({
        success: true,
        orderCreated: true,
        emailError: mailErrorDiagnostic || "Email dispatch unsuccessful.",
        orderId,
        orderSummary: newOrder
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

  } catch (ex: any) {
    console.error("[CLOUDFLARE EXCEPTION]", ex);
    return new Response(JSON.stringify({
      success: false,
      error: ex.message || String(ex),
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
