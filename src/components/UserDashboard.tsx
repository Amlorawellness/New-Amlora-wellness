import React, { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
  onNavigateToAdmin: () => void;
}

export default function UserDashboard({ user, onLogout, onNavigateToAdmin }: UserDashboardProps) {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Tabs: 'profile' | 'orders' | 'address'
  const [subTab, setSubTab] = useState<"profile" | "orders" | "address">("orders");

  // Profile Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchProfileAndOrders();
  }, [user]);

  const fetchProfileAndOrders = async () => {
    setLoading(true);
    try {
      // 1. Fetch Profile info
      const { data: profData, error: profErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profErr) throw profErr;

      // Populate states with defaults
      const currentProf = profData || {
        full_name: user?.raw_user_meta_data?.full_name || "New Customer",
        phone: user?.raw_user_meta_data?.phone || "",
        address: "",
        city: "",
        state: "Uttar Pradesh",
        pincode: "",
        role: (user?.email === "amlorawellness@gmail.com" || user?.email?.includes("admin")) ? "admin" : "user"
      };

      setProfile(currentProf);
      setFullName(currentProf.full_name || "");
      setPhone(currentProf.phone || "");
      setAddress(currentProf.address || "");
      setCity(currentProf.city || "");
      setStateName(currentProf.state || "Uttar Pradesh");
      setPincode(currentProf.pincode || "");

      // 2. Fetch User Orders
      const { data: ordData, error: ordErr } = await supabase
        .from("orders")
        .select("*")
        .eq("email", user.email);

      if (ordErr) throw ordErr;
      setOrders(ordData || []);
    } catch (err) {
      console.error("Dashboard data fetching failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const updatedProfile = {
        id: user.id,
        full_name: fullName,
        phone,
        address,
        city,
        state: stateName,
        pincode,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updatedProfile);

      if (error) throw error;

      setProfile({ ...profile, ...updatedProfile });
      setMessage({ type: "success", text: "Profile details successfully updated on secure servers!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to preserve settings." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0F3D2E] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-500 font-mono">RETRIEVING SECURITY PROFILES...</p>
      </div>
    );
  }

  const isAdmin = profile?.role === "admin" || user?.email === "amlorawellness@gmail.com";

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-[#0F3D2E] font-sans" id="user-dashboard-wrapper">
      {/* Dashboard Brand Board */}
      <div className="bg-[#0F3D2E] text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md mb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-2.5 py-1 rounded">
              ✦ Patron Console
            </span>
            {isAdmin && (
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 border border-emerald-300/35 bg-emerald-300/10 px-2.5 py-1 rounded">
                ✔ Admin Privilege
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-4xl font-serif text-[#FAF9F5] mt-3">
            Namaste, <span className="italic">{fullName || "Amlora Member"}</span>
          </h2>
          <p className="text-xs text-cream/70 mt-1 font-light">
            Linked Identity: <span className="font-mono text-[11px] text-[#D4AF37]">{user.email}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {isAdmin && (
            <button
              onClick={onNavigateToAdmin}
              className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#Bfa030] text-[#0F3D2E] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow"
              id="goto-admin-btn"
            >
              ⚙ Access Admin Panel
            </button>
          )}
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-[#FAF9F5] border border-white/20 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
            id="members-dashboard-logout-btn"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Grid: Menu & Sub-tab display */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white p-4 border border-[#0F3D2E]/10 rounded-xl space-y-2 h-fit">
          <button 
            onClick={() => setSubTab("orders")}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex justify-between items-center ${
              subTab === "orders" ? "bg-[#0F3D2E] text-white" : "text-[#0F3D2E]/80 hover:bg-[#FAF9F5]"
            }`}
          >
            <span>📜 Dispatch Ledger</span>
            <span className="bg-amber-300/10 text-amber-500 text-[10px] py-0.5 px-2 rounded-full border border-amber-300/10">
              {orders.length}
            </span>
          </button>
          <button 
            onClick={() => setSubTab("profile")}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              subTab === "profile" ? "bg-[#0F3D2E] text-white" : "text-[#0F3D2E]/80 hover:bg-[#FAF9F5]"
            }`}
          >
            👤 Member Profile
          </button>
          <button 
            onClick={() => setSubTab("address")}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              subTab === "address" ? "bg-[#0F3D2E] text-white" : "text-[#0F3D2E]/80 hover:bg-[#FAF9F5]"
            }`}
          >
            🏡 Dispatch Coordinates
          </button>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 bg-white p-6 md:p-8 border border-[#0F3D2E]/10 rounded-xl min-h-[400px]">
          {subTab === "orders" && (
            <div className="space-y-6">
              <div className="border-b border-[#0F3D2E]/10 pb-4">
                <h3 className="text-xl font-serif">Order History</h3>
                <p className="text-[11px] text-gray-500 font-light mt-1">Review live packing records and payments logged securely to your name.</p>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-gray-400 space-y-2">
                  <p className="text-xs">No orders logged under your email address so far.</p>
                  <p className="text-[10px]">Add products to your cart and check out as a registered patron!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord: any) => (
                    <div 
                      key={ord.id || ord.orderId}
                      className="border border-[#0F3D2E]/10 rounded-xl overflow-hidden shadow-sm hover:border-[#D4AF37]/30 transition-all font-sans"
                    >
                      {/* Order Core Details */}
                      <div className="bg-[#FAF9F5] p-4 flex flex-wrap justify-between items-center gap-2 border-b border-[#0F3D2E]/5">
                        <div className="space-y-1">
                          <p className="text-[11px] text-gray-500 font-mono">REFERENCE ID</p>
                          <p className="text-xs font-bold text-[#0F3D2E] font-mono">{ord.order_id || ord.orderId}</p>
                        </div>
                        <div className="space-y-1 text-center">
                          <p className="text-[11px] text-gray-500 font-mono">PLACED ON</p>
                          <p className="text-xs font-light">{new Date(ord.created_at || ord.orderDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                        </div>
                        <div className="space-y-1 text-center">
                          <p className="text-[11px] text-gray-500 font-mono">PAYMENT STATUS</p>
                          <span className={`inline-block text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${
                            ord.payment_status === "paid" 
                              ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-800 border-amber-500/20"
                          }`}>
                            {ord.payment_status || "COD / UNPAID"}
                          </span>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[11px] text-gray-500 font-mono">DELIVERY STATUS</p>
                          <span className={`inline-block text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${
                            ord.order_status === "delivered" 
                              ? "bg-blue-500/10 text-blue-800 border-blue-500/20" 
                              : ord.order_status === "cancelled" 
                                ? "bg-rose-500/10 text-rose-800 border-rose-500/20"
                                : "bg-teal-500/10 text-teal-800 border-teal-500/20"
                          }`}>
                            {ord.order_status || "pending"}
                          </span>
                        </div>
                      </div>

                      {/* Purchased Products Display */}
                      <div className="p-4 bg-white space-y-3">
                        <div className="divide-y divide-[#0F3D2E]/5">
                          {(() => {
                            let itemsArray = [];
                            try {
                              itemsArray = typeof ord.items === "string" ? JSON.parse(ord.items) : ord.items;
                            } catch {
                              itemsArray = [];
                            }
                            if (!Array.isArray(itemsArray)) itemsArray = [];
                            return itemsArray.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between py-2 text-xs">
                                <div>
                                  <span className="font-bold">{item.name}</span>
                                  <span className="text-gray-500 font-mono ml-2">x{item.quantity}</span>
                                </div>
                                <span className="font-semibold text-gray-700">₹{item.total || (item.price * item.quantity)}</span>
                              </div>
                            ));
                          })()}
                        </div>

                        {/* Order billing summary footer */}
                        <div className="flex flex-wrap justify-between items-center pt-3 border-t border-[#0F3D2E]/5 text-[11px] text-gray-500">
                          <div>
                            <span className="font-bold uppercase text-[#0F3D2E]/80">Mode: </span>
                            <span className="font-mono text-[#D4AF37]">{ord.payment_method === "cod" ? "Cash On Delivery (COD)" : "Razorpay Digital Gateway"}</span>
                          </div>
                          <div className="text-xs text-[#0F3D2E]">
                            Total Paid: <span className="text-sm font-bold ml-1 font-serif">₹{ord.total_amount || ord.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {subTab === "profile" && (
            <div className="space-y-6">
              <div className="border-b border-[#0F3D2E]/10 pb-4">
                <h3 className="text-xl font-serif">Patron Identity</h3>
                <p className="text-[11px] text-gray-500 font-light mt-1">Keep your contact parameters synchronized with our delivery databases.</p>
              </div>

              {message && (
                <div 
                  className={`p-3 rounded-lg text-xs ${
                    message.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-800" : "bg-rose-500/10 border border-rose-500/20 text-rose-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">Contact Phone</label>
                    <input 
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#0F3D2E] hover:bg-[#07241a] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : "Commit Settings ➜"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {subTab === "address" && (
            <div className="space-y-6">
              <div className="border-b border-[#0F3D2E]/10 pb-4">
                <h3 className="text-xl font-serif">Delivery Addresses</h3>
                <p className="text-[11px] text-gray-500 font-light mt-1">Provide your verified address coordinates to fast-track packaging workflows.</p>
              </div>

              {message && (
                <div 
                  className={`p-3 rounded-lg text-xs ${
                    message.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-800" : "bg-rose-500/10 border border-rose-500/20 text-rose-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">Shipping Address (House, Street, Area)</label>
                  <textarea 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    placeholder="Provide detailed dispatch coordinates..."
                    className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D4AF37] font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">City / District</label>
                    <input 
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Pratapgarh"
                      className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">State / Region</label>
                    <input 
                      type="text"
                      required
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      placeholder="e.g., Uttar Pradesh"
                      className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">Pincode / Postal Code</label>
                    <input 
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g., 230001"
                      className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#0F3D2E] hover:bg-[#07241a] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : "Verify & Save Address ➜"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
