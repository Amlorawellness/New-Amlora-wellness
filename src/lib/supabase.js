import { createClient } from "@supabase/supabase-js";

// Retrieve keys from React+Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase configuration keys (VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY) are missing in the current client environment."
  );
}

// Create and export the Supabase Client
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co", 
  supabaseAnonKey || "placeholder-anon-key"
);

/**
 * Reusable utility to verify connection state by executing
 * a light limit query against the products table.
 */
export async function verifyConnection() {
  console.log("[Supabase Connection Test] Querying the 'products' table...");
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .limit(1);

    if (error) {
       console.error("[Supabase Connection Error]:", error.message || error);
       return { success: false, error };
    }

    console.log("[Supabase Connection Success] Read verified successfully! First entry:", data);
    return { success: true, data };
  } catch (err) {
    console.error("[Supabase Connection Exception]:", err);
    return { success: false, error: err };
  }
}
