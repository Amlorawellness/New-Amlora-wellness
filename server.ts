import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Path to orders storage file (simple structured JSON database)
const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");

// Helper: Ensure orders file exists
if (!fs.existsSync(ORDERS_FILE_PATH)) {
  fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
}

// Generate unique Order ID
function generateOrderId(mSymbol = "AML"): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `${mSymbol}-${dateStr}-${randomNum}`;
}

// API Route: Place/Submit Order
app.post("/api/orders", async (req, res) => {
  console.log("Order received");
  console.log("[DEBUG] Received body payload:", JSON.stringify(req.body));
  try {
    const { formData, cartItems, cartTotal, paymentMethod, razorpayId } = req.body;

    // Server-side validation
    if (!formData || !cartItems || !cartItems.length) {
      console.warn("[DEBUG] Missing required order data arrays or customer details.");
      return res.status(400).json({ success: false, error: "Missing required order data" });
    }

    const { name, phone, email, address, city, state, pincode } = formData;
    if (!name || !phone || !email || !address || !city || !state || !pincode) {
      console.warn("[DEBUG] Missing one or more shipping information parameters.");
      return res.status(400).json({ success: false, error: "Missing required shipping information" });
    }

    const orderId = generateOrderId(paymentMethod === "cod" ? "AML-COD" : "AML-RZP");
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

    // 1. Read existing orders & write new order
    try {
      const currentOrdersRaw = fs.readFileSync(ORDERS_FILE_PATH, "utf-8");
      const currentOrders = JSON.parse(currentOrdersRaw);
      currentOrders.push(newOrder);
      fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(currentOrders, null, 2), "utf-8");
    } catch (saveErr) {
      console.error("Order logging failed, proceeding with processing:", saveErr);
    }

    // 2. Prepare Email Notification Templates (Customer & Admin)
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

    // Professional HTML Email for the Customer
    const customerEmailHtml = `
      <div style="background-color: #FAF9F5; padding: 30px 15px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0F3D2E;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <!-- Brand Header -->
          <div style="background-color: #0F3D2E; padding: 30px 20px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0; font-family: Georgia, serif; font-size: 26px; font-weight: normal; letter-spacing: 2px;">
              Amlora Wellness
            </h1>
            <p style="color: #ffffff; font-size: 12px; margin: 5px 0 0; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85;">
              Pure Pratapgarh Seedless Elixirs
            </p>
          </div>
          
          <!-- Welcome Section -->
          <div style="padding: 30px 25px;">
            <p style="font-size: 16px; margin-top: 0; line-height: 1.5; color: #1e293b;">
              Dear <strong>${name}</strong>,
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: #475569;">
              Thank you for choosing Amlora Wellness. Your order has been placed successfully and is currently being packaged with extreme freshness guidelines.
            </p>
            
            <!-- Order Metadata Table -->
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

            <!-- Ordered Items Product Table -->
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

            <!-- Shipping address -->
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

    // Professional HTML Email for the Admin
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

    // 3. Mailing Dispatch Pipeline
    let customerMailSent = false;
    let adminMailSent = false;
    let mailErrorDiagnostic = "";

    // Read SMTP secrets or fallback to simulated mail logs if not set up
    const isSmtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER);

    if (isSmtpConfigured) {
      console.log("Email sending started");
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Send to Customer
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Amlora Wellness" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Your Amlora Wellness Order Has Been Confirmed",
          html: customerEmailHtml,
        });
        customerMailSent = true;

        // Send to Admin
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Amlora Sourcing Alert" <${process.env.SMTP_USER}>`,
          to: "info@amlorawellness.com",
          subject: "New Order Received - Amlora Wellness",
          html: adminEmailHtml,
        });
        adminMailSent = true;

        console.log("Email sent successfully");
        console.log(`REAL MAIL DISPATCH SUCCESS: Info sent securely to user & admin desk for order ${orderId}`);
      } catch (mailErr: any) {
        console.error(mailErr);
        mailErrorDiagnostic = mailErr.message || "Unknown SMTP error";
      }
    } else {
      console.log(`*** SANDBOX MODE (Pending SMTP Env Keys) ***`);
      console.log(`SUBJECT: "Your Amlora Wellness Order Has Been Confirmed" dispatched to: ${email}`);
      console.log(`SUBJECT: "New Order Received - Amlora Wellness" dispatched to: info@amlorawellness.com`);
      customerMailSent = true;
      adminMailSent = true;
    }

    // Determine final message based on email dispatch status
    const emailSuccess = customerMailSent && adminMailSent;
    const finalMessage = emailSuccess ? "Order placed successfully" : "Order received but email notification failed";

    // Respond back to frontend with full status summary
    res.status(200).json({
      success: true,
      message: finalMessage,
      orderId,
      customerMailSent,
      adminMailSent,
      isSimulated: !isSmtpConfigured,
      mailError: mailErrorDiagnostic || null,
      orderSummary: newOrder
    });

    return Response.json({
      success: true,
      message: finalMessage
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
    return Response.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
});

// Serve frontend assets using Vite middleware or Static built folder
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("SERVER: Mounted Vite Core Development Middlewares");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("SERVER: Serving Static Build Assets from /dist in Production");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVER: Active and listening securely on http://localhost:${PORT}`);
  });
}

bootstrap();
