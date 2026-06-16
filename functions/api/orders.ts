export async function onRequestPost({ request, env }: { request: Request; env: any }) {
  console.log("Order received");
  try {
    const body: any = await request.json();
    const { formData, cartItems, cartTotal, paymentMethod, razorpayId } = body;

    // Server-side validation
    if (!formData || !cartItems || !cartItems.length) {
      console.warn("[DEBUG] Missing required order data arrays or customer details.");
      return new Response(JSON.stringify({ success: false, error: "Missing required order data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { name, phone, email, address, city, state, pincode } = formData;
    if (!name || !phone || !email || !address || !city || !state || !pincode) {
      console.warn("[DEBUG] Missing one or more shipping information parameters.");
      return new Response(JSON.stringify({ success: false, error: "Missing required shipping information" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const mSymbol = paymentMethod === "cod" ? "AML-COD" : "AML-RZP";
    const orderId = `${mSymbol}-${dateStr}-${randomNum}`;
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

    console.log("Email sending started");
    let customerMailSent = false;
    let adminMailSent = false;
    let mailErrorDiagnostic = "";

    // 1. Check & Log Environment Variables (without exposing pass)
    const smtpHost = env.SMTP_HOST || "";
    const smtpPort = env.SMTP_PORT || "";
    const smtpSecure = env.SMTP_SECURE || "";
    const smtpUser = env.SMTP_USER || "";
    const smtpPass = env.SMTP_PASS || "";
    const smtpFrom = env.SMTP_FROM || "";

    console.log("[SMTP CONFIG VERIFICATION - CLOUDFLARE] Verifying environment variables...");
    console.log(`- SMTP_HOST: ${smtpHost ? `"${smtpHost}"` : "MISSING (Verify configuration)"}`);
    console.log(`- SMTP_PORT: ${smtpPort ? `"${smtpPort}"` : "MISSING (Verify configuration)"}`);
    console.log(`- SMTP_SECURE: ${smtpSecure ? `"${smtpSecure}"` : "MISSING (Verify configuration)"}`);
    console.log(`- SMTP_USER: ${smtpUser ? `"${smtpUser}"` : "MISSING (Verify configuration)"}`);
    console.log(`- SMTP_PASS: ${smtpPass ? `DEFINED (length: ${smtpPass.length})` : "MISSING (Verify configuration)"}`);
    console.log(`- SMTP_FROM: ${smtpFrom ? `"${smtpFrom}"` : "MISSING (Verify configuration)"}`);

    const isSmtpConfigured = !!(smtpHost && smtpUser && smtpPass);

    if (isSmtpConfigured) {
      console.log("[SMTP SEND START - CLOUDFLARE] Lazy-load nodemailer module for dynamic dispatch...");
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort || 587),
          secure: smtpSecure === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Test SMTP Connection before sending email
        console.log("[SMTP CONNECTION STATUS - CLOUDFLARE] Authenticating & testing connection to SMTP server...");
        await transporter.verify();
        console.log("[SMTP CONNECTION STATUS - CLOUDFLARE] SMTP Connection Verified Successfully!");

        // Build standard layout HTML emails (matches server.ts layout)
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

        // Send customer email to the email entered during checkout
        console.log(`[SMTP SEND START - CLOUDFLARE] Dispatching confirmation email to customer at: ${email}`);
        await transporter.sendMail({
          from: smtpFrom || `"Amlora Wellness" <${smtpUser}>`,
          to: email,
          subject: "Your Amlora Wellness Order Has Been Confirmed",
          html: customerEmailHtml,
        });
        customerMailSent = true;
        console.log(`[SMTP SEND SUCCESS - CLOUDFLARE] Customer confirmation email sent successfully to ${email}`);

        // Send admin email to info@amlorawellness.com
        const adminEmailHtml = `<h3>New Order Received - ${orderId} from ${name} of ₹${cartTotal}</h3>`;
        console.log(`[SMTP SEND START - CLOUDFLARE] Dispatching alert email to admin at: info@amlorawellness.com`);
        await transporter.sendMail({
          from: smtpFrom || `"Amlora Sourcing Alert" <${smtpUser}>`,
          to: "info@amlorawellness.com",
          subject: "New Order Received - Amlora Wellness",
          html: adminEmailHtml,
        });
        adminMailSent = true;
        console.log(`[SMTP SEND SUCCESS - CLOUDFLARE] Admin alert email sent successfully to info@amlorawellness.com`);

      } catch (mailErr: any) {
        console.error("[SMTP SEND FAILURE - CLOUDFLARE] Email pipeline error caught!");
        console.error("Exact SMTP Error:", mailErr);
        mailErrorDiagnostic = mailErr.stack || mailErr.message || String(mailErr);
      }
    } else {
      console.warn("[SMTP CONFIG VERIFICATION - CLOUDFLARE] FAILED: Missing one or more required SMTP variables.");
      mailErrorDiagnostic = "SMTP parameters are not fully configured.";
    }

    if (customerMailSent && adminMailSent) {
      return new Response(JSON.stringify({
        success: true,
        orderCreated: true,
        adminEmailSent: true,
        customerEmailSent: true,
        orderId,
        orderSummary: newOrder
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
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

  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
