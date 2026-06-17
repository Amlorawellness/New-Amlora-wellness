import { createClient } from "@supabase/supabase-js";

// Retrieve keys from environment variables (prefixed with VITE_ for client accessibility)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check configuration state
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://your-supabase-project.supabase.co");

// Local storage fallback state tracker (for high-fidelity standalone evaluation when credentials are dummy)
class LocalSupabaseFallbackStore {
  private getStorage(key: string): any[] {
    try {
      const val = localStorage.getItem(`amlora_fallback_${key}`);
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  }

  private setStorage(key: string, data: any[]) {
    try {
      localStorage.setItem(`amlora_fallback_${key}`, JSON.stringify(data));
    } catch {}
  }

  // Fallback Auth state handler
  public getCurrentUser() {
    try {
      const user = localStorage.getItem("amlora_fallback_user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  public setCurrentUser(user: any) {
    if (user) {
      localStorage.setItem("amlora_fallback_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("amlora_fallback_user");
    }
  }

  // Sync methods for tables
  public query(table: string): any[] {
    // Initial pre-seed data
    const existing = this.getStorage(table);
    if (existing.length === 0) {
      if (table === "products") {
        const prodData = [
          {
            id: "1",
            name: "Pure Amla Powder",
            type: "powder",
            price: 299,
            mrp: 399,
            rating: 4.8,
            reviews_count: 142,
            stock: 45,
            category: "Wellness Powder",
            tagline: "Hand-Deseeded & Farm-Spun Sun- Dried Pulp",
            description: "100% pure organic amla powder directly from the farmyards of Pratapgarh.",
          },
          {
            id: "2",
            name: "Spiced Chatpata Candy",
            type: "candy",
            price: 199,
            mrp: 249,
            rating: 4.9,
            reviews_count: 328,
            stock: 80,
            category: "Healthy Confectionery",
            tagline: "Sun-cured Candy with Ayurvedic Rock Salt Herbs",
            description: "Tangy, organic amla snack infused with traditional carminative digestion spices.",
          },
          {
            id: "3",
            name: "Chewable Fruity Cubes",
            type: "cubes",
            price: 249,
            mrp: 299,
            rating: 4.7,
            reviews_count: 94,
            stock: 25,
            category: "Juicy Cubes",
            tagline: "Honey-Glazed High-Density Vitamin C Bites",
            description: "Pure botanical chewables rich in immune-boosting raw bioflavonoid values.",
          }
        ];
        this.setStorage(table, prodData);
        return prodData;
      }
      if (table === "coupons") {
        const couponData = [
          { id: "c1", code: "AMLA10", discount_type: "percentage", discount_value: 10, expiry_date: "2027-12-31", usage_limit: 100, usage_count: 4, min_cart_amount: 300 },
          { id: "c2", code: "PUREVITALITY50", discount_type: "fixed", discount_value: 50, expiry_date: "2027-12-31", usage_limit: 200, usage_count: 12, min_cart_amount: 400 }
        ];
        this.setStorage(table, couponData);
        return couponData;
      }
      if (table === "shipping_rules") {
        const shippingData = [
          { id: "s1", name: "Standard Shipping Below ₹500", min_cart_value: 0, fee: 50 },
          { id: "s2", name: "Free Delivery On Premium Vitality", min_cart_value: 500, fee: 0 }
        ];
        this.setStorage(table, shippingData);
        return shippingData;
      }
      if (table === "settings") {
        const settingsData = [
          { key: "tax_rules", value: { gst_percentage: 18, enabled: true, tax_name: "GST" } }
        ];
        this.setStorage(table, settingsData);
        return settingsData;
      }
    }
    return existing;
  }

  public write(table: string, record: any): any {
    const records = this.query(table);
    if (!record.id) record.id = Math.random().toString(36).substr(2, 9);
    records.push(record);
    this.setStorage(table, records);
    return record;
  }

  public updateRecord(table: string, id: string, updatedFields: any): any {
    const records = this.query(table);
    const idx = records.findIndex(r => r.id === id || r.key === id);
    if (idx !== -1) {
      records[idx] = { ...records[idx], ...updatedFields };
      this.setStorage(table, records);
      return records[idx];
    }
    return null;
  }

  public deleteRecord(table: string, id: string): boolean {
    const records = this.query(table);
    const filtered = records.filter(r => r.id !== id && r.key !== id);
    this.setStorage(table, filtered);
    return true;
  }
}

export const fallbackStore = new LocalSupabaseFallbackStore();

// Define fallback client mimicking the Supabase Client API structure
const mockSupabaseClient: any = {
  auth: {
    getSession: async () => {
      const u = fallbackStore.getCurrentUser();
      return u ? { data: { session: { user: u } }, error: null } : { data: { session: null }, error: null };
    },
    getUser: async () => {
      const u = fallbackStore.getCurrentUser();
      return u ? { data: { user: u }, error: null } : { data: { user: null }, error: null };
    },
    signUp: async ({ email, password, options }: any) => {
      const mockUser = {
        id: "mock-user-id-" + Math.random().toString(36).substr(2, 9),
        email,
        raw_user_meta_data: options?.data || {},
        role: "authenticated"
      };
      // Promote amlorawellness@gmail.com and info@amlorawellness.com automatically to admin
      const profileRole = (email === "amlorawellness@gmail.com" || email === "info@amlorawellness.com") ? "admin" : "user";
      
      fallbackStore.setCurrentUser(mockUser);
      fallbackStore.write("profiles", {
        id: mockUser.id,
        role: profileRole,
        full_name: options?.data?.full_name || "New Customer",
        phone: options?.data?.phone || "",
        address: options?.data?.address || "",
        city: options?.data?.city || "",
        state: options?.data?.state || "",
        pincode: options?.data?.pincode || "",
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      });
      return { data: { user: mockUser }, error: null };
    },
    signInWithPassword: async ({ email, password }: any) => {
      const profiles = fallbackStore.query("profiles");
      const matchedProfile = profiles.find(p => p.email === email || (email.split("@")[0] === "admin" && p.role === "admin") || email === "amlorawellness@gmail.com");
      
      const mockUser = {
        id: matchedProfile?.id || "mock-user-id-admin",
        email,
        raw_user_meta_data: {
          full_name: matchedProfile?.full_name || "Admin Master"
        },
        role: "authenticated"
      };
      
      if (!matchedProfile) {
        // Auto create mock session profile
        const profileRole = (email === "amlorawellness@gmail.com" || email === "info@amlorawellness.com" || email.includes("admin")) ? "admin" : "user";
        fallbackStore.write("profiles", {
          id: mockUser.id,
          role: profileRole,
          full_name: "Amlora Member",
          phone: "+91 9999999999",
          address: "Pratapgarh Sourcing Hub",
          city: "Pratapgarh",
          state: "Uttar Pradesh",
          pincode: "230001",
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        });
      }

      fallbackStore.setCurrentUser(mockUser);
      return { data: { user: mockUser }, error: null };
    },
    signOut: async () => {
      fallbackStore.setCurrentUser(null);
      return { error: null };
    },
    onAuthStateChange: (callback: any) => {
      // Return unsubscriber handle
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  
  // Table querying builder
  from: (table: string) => {
    return {
      select: (columns: string = "*") => {
        const records = fallbackStore.query(table);
        return {
          order: (column: string, { ascending = true } = {}) => {
            const sorted = [...records].sort((a: any, b: any) => {
              if (a[column] < b[column]) return ascending ? -1 : 1;
              if (a[column] > b[column]) return ascending ? 1 : -1;
              return 0;
            });
            return Promise.resolve({ data: sorted, error: null });
          },
          eq: (column: string, value: any) => {
            const filtered = records.filter(r => r[column] === value);
            return {
              single: () => Promise.resolve({ data: filtered[0] || null, error: filtered[0] ? null : { message: "No row found" } }),
              maybeSingle: () => Promise.resolve({ data: filtered[0] || null, error: null }),
              then: (onfulfilled: any) => onfulfilled({ data: filtered, error: null })
            };
          },
          then: (onfulfilled: any) => onfulfilled({ data: records, error: null })
        };
      },
      insert: (recordsToInsert: any) => {
        const list = Array.isArray(recordsToInsert) ? recordsToInsert : [recordsToInsert];
        const inserted = list.map(item => fallbackStore.write(table, item));
        return Promise.resolve({ data: inserted, error: null });
      },
      update: (fieldsToUpdate: any) => {
        return {
          eq: (column: string, value: any) => {
            const records = fallbackStore.query(table);
            const targets = records.filter(r => r[column] === value);
            targets.forEach(t => {
              const idToUpdate = t.id || t.key;
              fallbackStore.updateRecord(table, idToUpdate, fieldsToUpdate);
            });
            return Promise.resolve({ data: targets, error: null });
          }
        };
      },
      delete: () => {
        return {
          eq: (column: string, value: any) => {
            const records = fallbackStore.query(table);
            const targets = records.filter(r => r[column] === value);
            targets.forEach(t => {
              const idToUpdate = t.id || t.key;
              fallbackStore.deleteRecord(table, idToUpdate);
            });
            return Promise.resolve({ data: targets, error: null });
          }
        };
      },
      upsert: (recordToUpsert: any) => {
        const id = recordToUpsert.id || recordToUpsert.key;
        let result;
        if (id) {
          result = fallbackStore.updateRecord(table, id, recordToUpsert);
        }
        if (!result) {
          result = fallbackStore.write(table, recordToUpsert);
        }
        return Promise.resolve({ data: [result], error: null });
      }
    };
  }
};

// Real client constructor using current parameters
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabaseClient as any;
