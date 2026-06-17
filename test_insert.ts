import { createClient } from "@supabase/supabase-js";

async function run() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

  // Generate a test order with mock payload mimicking real user values
  const orderId = `AML000001_TEST`;
  const orderPayload = {
    order_id: orderId,
    customer_name: "Test Customer",
    phone: "9999999999",
    email: "test@example.com",
    address: "123 Test Street, Test City, Test State - 110001",
    city: "Test City",
    state: "Test State",
    pincode: "110001",
    payment_method: "cod",
    payment_status: "Pending",
    order_status: "New",
    total_amount: 199.00,
    items: [
      {
        id: "2",
        name: "Spiced Chatpata Candy",
        price: 199,
        quantity: 1,
        total: 199
      }
    ],
    razorpay_order_id: null
  };

  const response = await supabaseAdmin
    .from("orders")
    .insert(orderPayload)
    .select();

  console.log("--- START SUPABASE RAW INSERTION RESPONSE ---");
  console.log(JSON.stringify(response, null, 2));
  console.log("--- END SUPABASE RAW INSERTION RESPONSE ---");
}

run().catch(console.error);
