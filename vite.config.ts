import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import {defineConfig} from 'vite';

// Helper to generate unique Order ID inside Vite's Connect middleware fallback
function generateViteOrderId(mSymbol = "AML"): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${mSymbol}-${dateStr}-${randomNum}`;
}

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'vite-api-orders-fallback',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith('/api/test') && req.method === 'GET') {
              console.log("[DEBUG] /api/test called (via Vite Dev Middleware)");
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, source: 'vite-middleware' }));
              return;
            }

            if (req.url?.startsWith('/api/orders') && req.method === 'POST') {
              console.log("Order received");
              try {
                // Collect the raw request body stream
                let bodyStr = '';
                await new Promise<void>((resolve, reject) => {
                  req.on('data', (chunk) => { bodyStr += chunk; });
                  req.on('end', () => resolve());
                  req.on('error', (err) => reject(err));
                });

                const body = JSON.parse(bodyStr || '{}');
                const { formData, cartItems, cartTotal, paymentMethod, razorpayId } = body;

                // Server-side validation
                if (!formData || !cartItems || !cartItems.length) {
                  console.warn("[VITE MID] Missing required order data arrays or customer details.");
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: "Missing required order data" }));
                  return;
                }

                const { name, phone, email, address, city, state, pincode } = formData;
                if (!name || !phone || !email || !address || !city || !state || !pincode) {
                  console.warn("[VITE MID] Missing one or more shipping information parameters.");
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: "Missing required shipping information" }));
                  return;
                }

                const orderId = generateViteOrderId(paymentMethod === "cod" ? "AML-COD" : "AML-RZP");
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

                // Persistent Write to the system database JSON file
                const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");
                try {
                  let currentOrders = [];
                  if (fs.existsSync(ORDERS_FILE_PATH)) {
                    currentOrders = JSON.parse(fs.readFileSync(ORDERS_FILE_PATH, 'utf-8') || '[]');
                  }
                  currentOrders.push(newOrder);
                  fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(currentOrders, null, 2), 'utf-8');
                  console.log("[VITE MID] Order successfully logged to orders.json database file.");
                } catch (saveErr) {
                  console.error("[VITE MID] Persistent order logging failed, moving on:", saveErr);
                }

                // Prepare and send emails
                let customerMailSent = false;
                let adminMailSent = false;
                let mailErrorDiagnostic = "";

                // Check & Log Environment Variables (without exposing pass)
                const smtpHost = process.env.SMTP_HOST;
                const smtpPort = process.env.SMTP_PORT;
                const smtpSecure = process.env.SMTP_SECURE;
                const smtpUser = process.env.SMTP_USER;
                const smtpPass = process.env.SMTP_PASS;
                const smtpFrom = process.env.SMTP_FROM;

                const logDiag = (msg: string) => {
                  console.log(msg);
                  try {
                    fs.appendFileSync(path.join(process.cwd(), "server_status.log"), `[VITE-SMTP-DIAG] ${new Date().toISOString()} - ${msg}\n`);
                  } catch (err) {}
                };

                logDiag("Verifying environment variables...");
                logDiag(`- SMTP_HOST: ${smtpHost ? `"${smtpHost}"` : "MISSING"}`);
                logDiag(`- SMTP_PORT: ${smtpPort ? `"${smtpPort}"` : "MISSING"}`);
                logDiag(`- SMTP_SECURE: ${smtpSecure ? `"${smtpSecure}"` : "MISSING"}`);
                logDiag(`- SMTP_USER: ${smtpUser ? `"${smtpUser}"` : "MISSING"}`);
                logDiag(`- SMTP_PASS: ${smtpPass ? `DEFINED (length: ${smtpPass.length})` : "MISSING"}`);
                logDiag(`- SMTP_FROM: ${smtpFrom ? `"${smtpFrom}"` : "MISSING"}`);

                const isSmtpConfigured = !!(smtpHost && smtpUser && smtpPass);

                if (isSmtpConfigured) {
                  logDiag("Creating transporter with TLS rejectUnauthorized=false...");
                  try {
                    const transporter = nodemailer.createTransport({
                      host: smtpHost,
                      port: Number(smtpPort || 587),
                      secure: smtpSecure === "true",
                      auth: {
                        user: smtpUser,
                        pass: smtpPass,
                      },
                      tls: {
                        rejectUnauthorized: false
                      }
                    });

                    // Test SMTP Connection before sending email
                    logDiag("Authenticating & testing connection to SMTP server...");
                    await transporter.verify();
                    logDiag("SMTP Connection Verified Successfully!");

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
                    logDiag(`Dispatching confirmation email to customer at: ${email}`);
                    await transporter.sendMail({
                      from: smtpFrom || `"Amlora Wellness" <${smtpUser}>`,
                      to: email,
                      subject: "Your Amlora Wellness Order Has Been Confirmed",
                      html: customerEmailHtml,
                    });
                    customerMailSent = true;
                    logDiag(`Customer confirmation email sent successfully to ${email}`);

                    // Send admin email to info@amlorawellness.com
                    const adminEmailHtml = `<h3>New Order Received - ${orderId} from ${name} of ₹${cartTotal}</h3>`;
                    logDiag(`Dispatching alert email to admin at: info@amlorawellness.com`);
                    await transporter.sendMail({
                      from: smtpFrom || `"Amlora Sourcing Alert" <${smtpUser}>`,
                      to: "info@amlorawellness.com",
                      subject: "New Order Received - Amlora Wellness",
                      html: adminEmailHtml,
                    });
                    adminMailSent = true;
                    logDiag(`Admin alert email sent successfully to info@amlorawellness.com`);

                  } catch (mailErr: any) {
                    logDiag(`[SMTP SEND FAILURE - VITE DEV] Email pipeline error caught!`);
                    logDiag(`Exact SMTP Error: ${mailErr.stack || mailErr.message || String(mailErr)}`);
                    mailErrorDiagnostic = mailErr.stack || mailErr.message || String(mailErr);
                  }
                } else {
                  logDiag("FAILED: Missing one or more required SMTP variables.");
                  mailErrorDiagnostic = "SMTP parameters are not fully configured.";
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');

                if (customerMailSent && adminMailSent) {
                  res.end(JSON.stringify({
                    success: true,
                    orderCreated: true,
                    adminEmailSent: true,
                    customerEmailSent: true,
                    orderId,
                    orderSummary: newOrder
                  }));
                } else {
                  res.end(JSON.stringify({
                    success: true,
                    orderCreated: true,
                    emailError: mailErrorDiagnostic || "Email dispatch unsuccessful.",
                    orderId,
                    orderSummary: newOrder
                  }));
                }
              } catch (error: any) {
                console.error(error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: false,
                  error: error.message,
                  stack: error.stack
                }));
              }
              return;
            }

            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
