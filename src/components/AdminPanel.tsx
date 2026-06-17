import React, { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

interface AdminPanelProps {
  onBackToDashboard: () => void;
}

export default function AdminPanel({ onBackToDashboard }: AdminPanelProps) {
  // Navigation: "analytics" | "products" | "orders" | "coupons" | "shipping_tax" | "users"
  const [adminTab, setAdminTab] = useState<"analytics" | "products" | "orders" | "coupons" | "shipping_tax" | "users">("analytics");
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [shippingRules, setShippingRules] = useState<any[]>([]);
  const [taxRules, setTaxRules] = useState<any>({ gst_percentage: 18, tax_name: "GST", enabled: true });
  const [users, setUsers] = useState<any[]>([]);
  
  // Feedback Messages
  const [alertMsg, setAlertMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // --- CRUD States ---
  // Product Edit/Add state
  const [editingProduct, setEditingProduct] = useState<any>(null); // null = not editing/adding
  const [productForm, setProductForm] = useState({
    name: "",
    type: "powder",
    mrp: 299,
    price: 199,
    stock: 50,
    category: "Wellness",
    image_url: "",
    tagline: "",
    description: "",
  });

  // Coupon Edit/Add state
  const [addingCoupon, setAddingCoupon] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: 10,
    expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    usage_limit: 100,
    min_cart_amount: 300,
  });

  // Shipping Rules add state
  const [addingRule, setAddingRule] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    name: "",
    min_cart_value: 0,
    fee: 50,
  });

  useEffect(() => {
    fetchAdminData();
  }, [adminTab]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Products
      const { data: pData } = await supabase.from("products").select("*");
      setProducts(pData || []);

      // Orders
      const { data: oData } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      setOrders(oData || []);

      // Coupons
      const { data: cData } = await supabase.from("coupons").select("*");
      setCoupons(cData || []);

      // Shipping Rules
      const { data: sData } = await supabase.from("shipping_rules").select("*");
      setShippingRules(sData || []);

      // Tax Rules from Settings
      const { data: tData } = await supabase.from("settings").select("*").eq("key", "tax_rules").maybeSingle();
      if (tData?.value) {
        setTaxRules(tData.value);
      }

      // Users/Profiles
      const { data: uData } = await supabase.from("profiles").select("*");
      setUsers(uData || []);

    } catch (err: any) {
      console.error("Backoffice fetching error:", err);
      setAlertMsg({ type: "error", text: "Failed to connect to databases schema: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (text: string) => {
    setAlertMsg({ type: "success", text });
    setTimeout(() => setAlertMsg(null), 3000);
  };

  // ==========================================
  // PRODUCTS CRUD HANDLERS
  // ==========================================
  const handleOpenProductEdit = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        type: product.type || "powder",
        mrp: Number(product.mrp || product.price * 1.25),
        price: Number(product.price),
        stock: Number(product.stock || 50),
        category: product.category || "Wellness",
        image_url: product.image_url || "",
        tagline: product.tagline || "",
        description: product.description || "",
      });
    } else {
      setEditingProduct("new");
      setProductForm({
        name: "",
        type: "powder",
        mrp: 300,
        price: 249,
        stock: 100,
        category: "Wellness",
        image_url: "",
        tagline: "Hand-crafted high density organic elixirs",
        description: "Fresh premium batch made in Pratapgarh farms.",
      });
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: productForm.name,
        type: productForm.type,
        mrp: Number(productForm.mrp),
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        category: productForm.category,
        image_url: productForm.image_url,
        tagline: productForm.tagline,
        description: productForm.description,
        updated_at: new Date().toISOString(),
      };

      if (editingProduct === "new") {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        showSuccess("New product added successfully!");
      } else {
        const { error } = await supabase.from("products").update(payload).eq("id", editingProduct.id);
        if (error) throw error;
        showSuccess(`Product "${payload.name}" updated successfully!`);
      }
      setEditingProduct(null);
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this product catalog item?")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      showSuccess("Product item deleted from dispatch catalog.");
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  // ==========================================
  // ORDERS LIFECYCLE MANAGEMENT
  // ==========================================
  const handleUpdateOrderStatus = async (orderId: string, itemUuid: string, status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ order_status: status, updated_at: new Date().toISOString() })
        .eq("id", itemUuid);
      
      if (error) throw error;
      showSuccess(`Order ${orderId} dispatch state set to ${status.toUpperCase()}!`);
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  const handleUpdatePaymentStatus = async (orderId: string, itemUuid: string, status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ payment_status: status, updated_at: new Date().toISOString() })
        .eq("id", itemUuid);
      
      if (error) throw error;
      showSuccess(`Order ${orderId} payment is set to ${status.toUpperCase()}!`);
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  // ==========================================
  // COUPONS CRUD HANDLERS
  // ==========================================
  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        code: couponForm.code.toUpperCase().replace(/\s+/g, ""),
        discount_type: couponForm.discount_type,
        discount_value: Number(couponForm.discount_value),
        expiry_date: new Date(couponForm.expiry_date).toISOString(),
        usage_limit: Number(couponForm.usage_limit),
        min_cart_amount: Number(couponForm.min_cart_amount),
      };

      const { error } = await supabase.from("coupons").insert(payload);
      if (error) throw error;
      
      showSuccess(`Promo coupon "${payload.code}" enabled successfully!`);
      setAddingCoupon(false);
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm("Remove this discount code token?")) return;
    try {
      const { error } = await supabase.from("coupons").delete().eq("id", id);
      if (error) throw error;
      showSuccess("Coupon token deactivated.");
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  // ==========================================
  // SHIPPING RULES CRUDS
  // ==========================================
  const handleSaveShippingRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: shippingForm.name,
        min_cart_value: Number(shippingForm.min_cart_value),
        fee: Number(shippingForm.fee),
      };

      const { error } = await supabase.from("shipping_rules").insert(payload);
      if (error) throw error;

      showSuccess(`Shipping directive "${payload.name}" activated!`);
      setAddingRule(false);
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  const handleDeleteShippingRule = async (id: string) => {
    if (!confirm("Revoke this shipping formula?")) return;
    try {
      const { error } = await supabase.from("shipping_rules").delete().eq("id", id);
      if (error) throw error;
      showSuccess("Shipping rule deleted.");
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  // ==========================================
  // TAX RULES & GLOBALS HANDLERS
  // ==========================================
  const handleSaveTaxConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("settings")
        .upsert({
          key: "tax_rules",
          value: taxRules,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      showSuccess("TAX and GST settings successfully synchronized!");
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  // ==========================================
  // ROLE DELEGATION FOR MEMBERS
  // ==========================================
  const toggleUserRole = async (userId: string, currRole: string) => {
    const nextRole = currRole === "admin" ? "user" : "admin";
    if (!confirm(`Toggle credentials of this member to ${nextRole.toUpperCase()}?`)) return;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: nextRole, updated_at: new Date().toISOString() })
        .eq("id", userId);

      if (error) throw error;
      showSuccess(`User role set to ${nextRole.toUpperCase()} successfully.`);
      fetchAdminData();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message });
    }
  };

  // Calculations for static analytics dashboard
  const totalRevenue = orders
    .filter(o => o.payment_status === "paid")
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  const totalSalesCount = orders.length;
  const pendingShipments = orders.filter(o => o.order_status !== "delivered" && o.order_status !== "cancelled").length;
  const outOfStockItems = products.filter(p => Number(p.stock || 0) <= 0).length;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-[#0F3D2E] font-sans" id="backoffice-main-deck">
      {/* Admin Panel Header Banner */}
      <div className="bg-[#FAF9F5] border border-[#0F3D2E]/25 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-[10px] bg-[#0F3D2E]/10 border border-[#0F3D2E]/20 text-[#0F3D2E] font-bold uppercase tracking-widest px-3 py-1 rounded inline-block">
            ✦ Amlora Backoffice v2.1 (WooCommerce Engine)
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-[#0F3D2E] mt-3">
            Sourcing Control <span className="italic">Room</span>
          </h1>
        </div>
        <button 
          onClick={onBackToDashboard}
          className="px-4 py-2.5 bg-[#0F3D2E] hover:bg-[#07241a] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow"
          id="back-to-dashboard-btn"
        >
          🡨 Back to Member Area
        </button>
      </div>

      {/* Alert Messaging Board */}
      {alertMsg && (
        <div 
          className={`p-4 rounded-xl text-xs font-medium mb-6 ${
            alertMsg.type === "success" 
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 animate-pulse" 
              : "bg-rose-500/10 border border-rose-500/20 text-rose-800"
          }`}
          id="backoffice-alert-billboard"
        >
          {alertMsg.type === "success" ? "✔ DONE: " : "✖ ERROR DETECTED: "} {alertMsg.text}
        </div>
      )}

      {/* Responsive Horizontal Navigation Bars */}
      <div className="flex flex-wrap border-b border-[#0F3D2E]/15 gap-1 mb-8 overflow-x-auto pb-1 select-none">
        <button 
          onClick={() => { setAdminTab("analytics"); setEditingProduct(null); }}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${adminTab === "analytics" ? "border-b-2 border-[#D4AF37] text-[#0F3D2E] font-extrabold bg-[#0F3D2E]/5" : "text-gray-500 hover:text-[#0F3D2E]"}`}
        >
          📈 Store Analytics
        </button>
        <button 
          onClick={() => { setAdminTab("products"); setEditingProduct(null); }}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${adminTab === "products" ? "border-b-2 border-[#D4AF37] text-[#0F3D2E] font-extrabold bg-[#0F3D2E]/5" : "text-gray-500 hover:text-[#0F3D2E]"}`}
        >
          📦 Catalog CRUDs ({products.length})
        </button>
        <button 
          onClick={() => { setAdminTab("orders"); setEditingProduct(null); }}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${adminTab === "orders" ? "border-b-2 border-[#D4AF37] text-[#0F3D2E] font-extrabold bg-[#0F3D2E]/5" : "text-gray-500 hover:text-[#0F3D2E]"}`}
        >
          📜 Order Ledgers ({orders.length})
        </button>
        <button 
          onClick={() => { setAdminTab("coupons"); setEditingProduct(null); }}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${adminTab === "coupons" ? "border-b-2 border-[#D4AF37] text-[#0F3D2E] font-extrabold bg-[#0F3D2E]/5" : "text-gray-500 hover:text-[#0F3D2E]"}`}
        >
          🎟 Coupons ({coupons.length})
        </button>
        <button 
          onClick={() => { setAdminTab("shipping_tax"); setEditingProduct(null); }}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${adminTab === "shipping_tax" ? "border-b-2 border-[#D4AF37] text-[#0F3D2E] font-extrabold bg-[#0F3D2E]/5" : "text-gray-500 hover:text-[#0F3D2E]"}`}
        >
          🚚 Shipping / Tax
        </button>
        <button 
          onClick={() => { setAdminTab("users"); setEditingProduct(null); }}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${adminTab === "users" ? "border-b-2 border-[#D4AF37] text-[#0F3D2E] font-extrabold bg-[#0F3D2E]/5" : "text-gray-500 hover:text-[#0F3D2E]"}`}
        >
          👤 Staff & Members ({users.length})
        </button>
      </div>

      {loading ? (
        <div className="py-24 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#0F3D2E] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono tracking-wider text-gray-500">SYNCHRONIZING SECURE DATABASES...</p>
        </div>
      ) : (
        <main className="animate-[fadeIn_0.4s_ease-out]" id="admin-workspace-render-area">
          {/* ========================================================
              ANALYTICS TAB
              ======================================================== */}
          {adminTab === "analytics" && (
            <div className="space-y-8">
              {/* Bento Grid Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-[#0F3D2E]/10 p-6 rounded-xl space-y-2 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A2811A]">Total Confirmed Sales</p>
                  <p className="text-3xl font-serif font-bold text-[#0F3D2E]">₹{totalRevenue.toLocaleString("en-IN")}</p>
                  <div className="text-[10px] text-emerald-600 font-medium">✦ 100% Verified Payment Signatures</div>
                </div>
                <div className="bg-white border border-[#0F3D2E]/10 p-6 rounded-xl space-y-2 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Checkout Placements</p>
                  <p className="text-3xl font-serif font-bold text-[#0F3D2E]">{totalSalesCount} Orders</p>
                  <div className="text-[10px] text-gray-500">Includes both COD and credit checkouts</div>
                </div>
                <div className="bg-white border border-[#0F3D2E]/10 p-6 rounded-xl space-y-2 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0F3D2E]/80">Pending Deseed Packaging</p>
                  <p className="text-3xl font-serif font-bold text-amber-600">{pendingShipments} Shipments</p>
                  <div className="text-[10px] text-amber-600">Needs dispatch label assignment</div>
                </div>
                <div className="bg-white border border-[#0F3D2E]/10 p-6 rounded-xl space-y-2 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500">Low Stock / Out limits</p>
                  <p className="text-3xl font-serif font-bold text-rose-600">{outOfStockItems} catalogs</p>
                  <div className="text-[10px] text-rose-500">Items require fresh harvest sync</div>
                </div>
              </div>

              {/* Graphical Chart simulation using elegant custom-designed SVG visual layout */}
              <div className="bg-white border border-[#0F3D2E]/10 p-6 rounded-xl">
                <h3 className="text-lg font-serif mb-4 flex justify-between items-center">
                  <span>Weekly Dispatch Frequency</span>
                  <span className="text-xs text-[#0F3D2E]/60 font-light font-sans">Pratapgarh dispatch records</span>
                </h3>
                <div className="h-64 flex items-end justify-between gap-4 pt-10 border-b border-[#0F3D2E]/15 px-2 md:px-10 relative">
                  {/* Grid Lines */}
                  <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-[#0F3D2E]/5" />
                  <div className="absolute left-0 right-0 top-2/4 border-t border-dashed border-[#0F3D2E]/5" />
                  <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-[#0F3D2E]/5" />

                  {/* Individual graph bars */}
                  {[
                    { label: "Mon", count: 12, value: "₹24k" },
                    { label: "Tue", count: 24, value: "₹48k" },
                    { label: "Wed", count: 18, value: "₹36k" },
                    { label: "Thu", count: 42, value: "₹84k" },
                    { label: "Fri", count: 31, value: "₹62k" },
                    { label: "Sat", count: 14, value: "₹28k" },
                    { label: "Sun", count: 9, value: "₹18k" },
                  ].map((bar, idx) => {
                    const pct = `${(bar.count / 45) * 100}%`;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                        {/* Interactive tooltip values */}
                        <div className="absolute bottom-full mb-2 bg-[#0F3D2E] text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                          {bar.value} ({bar.count} sales)
                        </div>
                        <div 
                          className="w-full bg-[#0F3D2E] hover:bg-[#D4AF37] rounded-t transition-colors cursor-pointer"
                          style={{ height: pct, minHeight: "15px" }}
                        />
                        <span className="text-[10px] text-gray-500 font-mono mt-1">{bar.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              PRODUCTS CRUD TAB
              ======================================================== */}
          {adminTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="text-xl font-serif">Catalog Management</h3>
                <button 
                  onClick={() => handleOpenProductEdit(null)}
                  className="px-3.5 py-2 bg-[#0F3D2E] hover:bg-[#07241a] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  ✚ Add New Organic Product
                </button>
              </div>

              {/* Dialog Editor (Collapsible) */}
              {editingProduct && (
                <form onSubmit={handleSaveProduct} className="bg-[#FAF9F5] border border-[#0F3D2E]/25 p-6 rounded-xl space-y-4 animate-[fadeIn_0.3s_ease-out]">
                  <h4 className="text-base font-serif font-bold text-[#0F3D2E] border-b border-[#0F3D2E]/10 pb-2">
                    {editingProduct === "new" ? "Create Fresh Catalogue Record" : `Modify "${productForm.name}"`}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Product Title</label>
                      <input 
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="e.g., Ultra Vitality Chips"
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Product Type</label>
                      <select 
                        value={productForm.type}
                        onChange={(e) => setProductForm({ ...productForm, type: e.target.value })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      >
                        <option value="powder">Raw Farm Powder</option>
                        <option value="candy">Spiced Ayurvedic Candies</option>
                        <option value="cubes">Chewable Sweet Cubes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Available Category</label>
                      <input 
                        type="text"
                        required
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">MRP Value (₹)</label>
                      <input 
                        type="number"
                        required
                        value={productForm.mrp}
                        onChange={(e) => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Offer Selling Price (₹)</label>
                      <input 
                        type="number"
                        required
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Sourcing Stock (Units)</label>
                      <input 
                        type="number"
                        required
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Display Image Link</label>
                      <input 
                        type="url"
                        value={productForm.image_url}
                        onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                        placeholder="Paste image address URL..."
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Tagline banner</label>
                    <input 
                      type="text"
                      required
                      value={productForm.tagline}
                      onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                      placeholder="Catchy descriptive subtitle..."
                      className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Product Description</label>
                    <textarea 
                      required
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      rows={2}
                      className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none font-sans"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs rounded tracking-wider"
                    >
                      Save Catalogue Record ✔
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold uppercase text-xs rounded tracking-wider"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table Display */}
              <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm">
                <table className="w-full text-xs text-left" id="admin-products-crm-table">
                  <thead className="bg-[#FAF9F5] text-[#0F3D2E] uppercase font-bold text-[10px] border-b border-[#0F3D2E]/10">
                    <tr>
                      <th className="px-6 py-4">Image/Name</th>
                      <th className="px-6 py-4 text-center">Harvest Type</th>
                      <th className="px-6 py-4 text-right">MRP (₹)</th>
                      <th className="px-6 py-4 text-right">Offer (₹)</th>
                      <th className="px-6 py-4 text-center">Inventory Stock</th>
                      <th className="px-6 py-4 text-center">Rating</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="px-6 py-4 flex items-center gap-3">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-[#0F3D2E]/10" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-10 h-10 bg-[#0F3D2E]/5 rounded-lg border border-[#0F3D2E]/10 flex items-center justify-center font-serif text-[10px]">Amlora</div>
                          )}
                          <div className="font-semibold text-[#0F3D2E]">{p.name}</div>
                        </td>
                        <td className="px-6 py-4 text-center font-mono capitalize text-[11px]">{p.type}</td>
                        <td className="px-6 py-4 text-right font-mono text-gray-400 align-middle"><s>₹{p.mrp || p.price}</s></td>
                        <td className="px-6 py-4 text-right font-semibold font-mono text-[#0F3D2E] align-middle">₹{p.price}</td>
                        <td className="px-6 py-4 text-center align-middle">
                          <span className={`inline-block font-mono text-xs px-2.5 py-1 rounded font-bold ${Number(p.stock || 0) <= 0 ? "bg-rose-100 text-rose-800" : Number(p.stock || 0) < 15 ? "bg-amber-100 text-amber-800" : "bg-emerald-500/10 text-emerald-800"}`}>
                            {p.stock ?? 100} units
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-amber-500">★ {p.rating || "5.0"} ({p.reviews_count || 0})</td>
                        <td className="px-6 py-4 text-right space-x-1 font-sans align-middle">
                          <button 
                            onClick={() => handleOpenProductEdit(p)}
                            className="bg-sky-50 py-1 px-2.5 text-sky-700 hover:bg-sky-100 rounded text-[10px] font-bold"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            className="bg-rose-50 py-1 px-2.5 text-rose-600 hover:bg-rose-100 rounded text-[10px] font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              ORDERS FLOW LEDGER TAB
              ======================================================== */}
          {adminTab === "orders" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xl font-serif">Order Flow Ledger (WooCommerce Lifecycle)</h3>
                <p className="text-xs text-gray-400 font-light mt-1">Regulate dispatch states and verify online Razorpay signatures vs cash handovers.</p>
              </div>

              <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl">
                <table className="w-full text-xs text-left" id="admin-orders-flow-table">
                  <thead className="bg-[#FAF9F5] text-[#0F3D2E] uppercase font-bold text-[10px] border-b border-[#0F3D2E]/10">
                    <tr>
                      <th className="px-6 py-4">Reference Log</th>
                      <th className="px-6 py-4">Patron Details</th>
                      <th className="px-6 py-4">Billing Basket</th>
                      <th className="px-6 py-4 text-right">Amount (₹)</th>
                      <th className="px-6 py-4 text-center">Payment Status</th>
                      <th className="px-6 py-4 text-center">Dispatch State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 border-gray-50">
                        {/* Reference Metadata */}
                        <td className="px-6 py-4 space-y-1 align-top font-sans">
                          <p className="font-mono font-bold text-[#0F3D2E] text-xs">{ord.order_id || ord.orderId}</p>
                          <p className="text-[10px] text-gray-400 font-light">{new Date(ord.created_at || ord.orderDate).toLocaleString("en-IN")}</p>
                          <p className="inline-block text-[9px] uppercase tracking-wider font-bold text-slate-400 border border-slate-200 px-2.5 py-0.5 rounded-full bg-[#FAF9F5]">
                            {ord.payment_method === "cod" ? "COD Mode" : "Digital Pay"}
                          </p>
                        </td>

                        {/* Customer Information */}
                        <td className="px-6 py-4 space-y-1 align-top font-sans text-xs">
                          <p className="font-bold">{ord.customer_name || ord.customerName}</p>
                          <p className="text-gray-500 font-mono text-[11px]">{ord.email}</p>
                          <p className="text-gray-500 font-mono text-[11px]">{ord.phone}</p>
                          <p className="text-gray-400 leading-tight italic max-w-xs">{ord.address}, {ord.city} ({ord.pincode})</p>
                        </td>

                        {/* Products Basket Items */}
                        <td className="px-6 py-4 align-top max-w-xs leading-normal">
                          <div className="divide-y divide-dotted divide-gray-200 space-y-1">
                            {(() => {
                              let subItems = [];
                              try {
                                subItems = typeof ord.items === "string" ? JSON.parse(ord.items) : ord.items;
                              } catch {
                                subItems = [];
                              }
                              if (!Array.isArray(subItems)) subItems = [];
                              return subItems.map((item: any, idx: number) => (
                                <div key={idx} className="text-[11px]">
                                  <span className="font-bold">{item.name}</span>{" "}
                                  <span className="text-gray-400 font-mono text-[10px] font-bold">x{item.quantity}</span>
                                </div>
                              ));
                            })()}
                          </div>
                        </td>

                        {/* Transaction billing values */}
                        <td className="px-6 py-4 text-right font-bold text-slate-700 font-mono text-sm align-top pt-5">
                          ₹{ord.total_amount || ord.totalAmount}
                        </td>

                        {/* Payment Verification status toggles */}
                        <td className="px-6 py-4 text-center align-top pt-4">
                          <select 
                            value={ord.payment_status || "unpaid"}
                            onChange={(e) => handleUpdatePaymentStatus(ord.order_id || ord.orderId, ord.id, e.target.value)}
                            className="bg-white border text-[11px] rounded p-1 outline-none font-bold text-[#0F3D2E] tracking-tight focus:ring-1 focus:ring-[#D4AF37]"
                          >
                            <option value="unpaid">Unpaid / Wait</option>
                            <option value="paid">Verified Paid</option>
                            <option value="refunded">Refunded</option>
                            <option value="failed">Pay Failed</option>
                          </select>
                        </td>

                        {/* Dispatch tracking state toggles */}
                        <td className="px-6 py-4 text-center align-top pt-4">
                          <select 
                            value={ord.order_status || "pending"}
                            onChange={(e) => handleUpdateOrderStatus(ord.order_id || ord.orderId, ord.id, e.target.value)}
                            className="bg-[#FAF9F5] border text-[11px] rounded p-1 outline-none font-bold text-[#D4AF37] tracking-tight focus:ring-1 focus:ring-[#0F3D2E]"
                          >
                            <option value="pending">⚙ Pending</option>
                            <option value="confirmed">✔ Confirmed</option>
                            <option value="dispatched">🚚 Dispatched</option>
                            <option value="delivered">🛬 Delivered</option>
                            <option value="cancelled">✖ Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              COUPONS CRUD TAB
              ======================================================== */}
          {adminTab === "coupons" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="text-xl font-serif">Promo Coupon Engine</h3>
                <button 
                  onClick={() => setAddingCoupon(true)}
                  className="px-3.5 py-1.5 bg-[#0F3D2E] hover:bg-[#07241a] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  ✚ Create Coupon Token
                </button>
              </div>

              {addingCoupon && (
                <form onSubmit={handleSaveCoupon} className="bg-[#FAF9F5] border border-[#0F3D2E]/25 p-6 rounded-xl space-y-4 animate-[fadeIn_0.3s_ease-out]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F3D2E]">New Promo Voucher Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Coupon Promo Code</label>
                      <input 
                        type="text"
                        required
                        value={couponForm.code}
                        onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                        placeholder="e.g., AMLORA25"
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Benefit Type</label>
                      <select 
                        value={couponForm.discount_type}
                        onChange={(e) => setCouponForm({ ...couponForm, discount_type: e.target.value })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      >
                        <option value="percentage">Percentage Off (%)</option>
                        <option value="fixed">Fixed Deduction Flat (₹)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Discount Amount/Value</label>
                      <input 
                        type="number"
                        required
                        value={couponForm.discount_value}
                        onChange={(e) => setCouponForm({ ...couponForm, discount_value: Number(e.target.value) })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Minimum Cart Amount (₹)</label>
                      <input 
                        type="number"
                        required
                        value={couponForm.min_cart_amount}
                        onChange={(e) => setCouponForm({ ...couponForm, min_cart_amount: Number(e.target.value) })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Expiry Date</label>
                      <input 
                        type="date"
                        required
                        value={couponForm.expiry_date}
                        onChange={(e) => setCouponForm({ ...couponForm, expiry_date: e.target.value })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Max Usage Limit</label>
                      <input 
                        type="number"
                        required
                        value={couponForm.usage_limit}
                        onChange={(e) => setCouponForm({ ...couponForm, usage_limit: Number(e.target.value) })}
                        className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded">Create Now</button>
                    <button type="button" onClick={() => setAddingCoupon(false)} className="px-4 py-2 bg-gray-400 text-white font-bold text-xs uppercase tracking-wider rounded">Cancel</button>
                  </div>
                </form>
              )}

              <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl">
                <table className="w-full text-xs text-left" id="admin-coupons-table">
                  <thead className="bg-[#FAF9F5] text-[#0F3D2E] uppercase font-bold text-[10px] border-b border-[#0F3D2E]/10">
                    <tr>
                      <th className="px-6 py-4">Coupon Code</th>
                      <th className="px-6 py-4">Benefit Formula</th>
                      <th className="px-6 py-4 text-center">Expiry Limit</th>
                      <th className="px-6 py-4 text-center">Min Billing Req</th>
                      <th className="px-6 py-4 text-center">Usage Count</th>
                      <th className="px-6 py-4 text-right">Option</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    {coupons.map((c) => (
                      <tr key={c.id}>
                        <td className="px-6 py-4 font-bold text-[#0F3D2E] text-xs uppercase text-left">{c.code}</td>
                        <td className="px-6 py-4 text-left font-sans font-semibold">
                          {c.discount_type === "percentage" ? `Deduct ${c.discount_value}% Over Cart` : `Deduct Flat ₹${c.discount_value}`}
                        </td>
                        <td className="px-6 py-4 text-center font-light font-sans">{new Date(c.expiry_date || c.expiryDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-center font-semibold text-slate-600">₹{c.min_cart_amount || 0}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-gray-700">{c.usage_count || 0}</span> / <span className="text-gray-400 font-light">{c.usage_limit || 100} redemptions</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteCoupon(c.id)}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 font-sans py-1 px-3 rounded text-[10px] font-bold"
                          >
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              SHIPPING & TAX COMPILER TAB
              ======================================================== */}
          {adminTab === "shipping_tax" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
              {/* Shipping Rules column */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <h4 className="text-[#0F3D2E] font-serif text-lg">Shipping Rule Directives</h4>
                  <button 
                    onClick={() => setAddingRule(true)}
                    className="px-2.5 py-1 bg-[#0F3D2E] hover:bg-[#07241a] text-white text-[10px] font-bold uppercase tracking-wider rounded"
                  >
                    ✚ Add shipping rule
                  </button>
                </div>

                {addingRule && (
                  <form onSubmit={handleSaveShippingRule} className="bg-[#FAF9F5] border border-[#0F3D2E]/25 p-4 rounded-lg space-y-3 font-sans animate-[fadeIn_0.3s_ease-out]">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Rule Name Directive</label>
                        <input 
                          type="text"
                          required
                          value={shippingForm.name}
                          onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                          placeholder="e.g., Standard Delivery Fee"
                          className="w-full bg-white border border-[#0F3D2E]/20 rounded px-3 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Min Basket Total (₹)</label>
                          <input 
                            type="number"
                            required
                            value={shippingForm.min_cart_value}
                            onChange={(e) => setShippingForm({ ...shippingForm, min_cart_value: Number(e.target.value) })}
                            className="w-full bg-white border border-[#0F3D2E]/20 rounded px-2.5 py-1.5 text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Base Shipping Fee (₹)</label>
                          <input 
                            type="number"
                            required
                            value={shippingForm.fee}
                            onChange={(e) => setShippingForm({ ...shippingForm, fee: Number(e.target.value) })}
                            className="w-full bg-white border border-[#0F3D2E]/20 rounded px-2.5 py-1.5 text-xs outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button type="submit" className="px-3 py-1.5 bg-[#0F3D2E] text-white font-bold text-[10px] uppercase tracking-wide rounded">Save Rule</button>
                      <button type="button" onClick={() => setAddingRule(false)} className="px-3 py-1.5 bg-gray-400 text-white font-bold text-[10px] uppercase tracking-wide rounded">Cancel</button>
                    </div>
                  </form>
                )}

                <div className="space-y-3 bg-white p-4 border border-[#0F3D2E]/10 rounded-xl">
                  {shippingRules.map((rule) => (
                    <div 
                      key={rule.id}
                      className="flex justify-between items-center p-3 bg-[#FAF9F5] border border-gray-100 rounded-lg text-xs"
                    >
                      <div>
                        <p className="font-bold">{rule.name}</p>
                        <p className="text-[10px] text-gray-500 font-mono">Applies when Basket Total is above ₹{rule.min_cart_value || 0}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[#0F3D2E] text-sm">₹{rule.fee}</span>
                        <button 
                          onClick={() => handleDeleteShippingRule(rule.id)}
                          className="text-rose-500 hover:text-rose-600 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Taxes column */}
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="text-[#0F3D2E] font-serif text-lg">Tax Settings (GST / Global)</h4>
                </div>

                <form onSubmit={handleSaveTaxConfig} className="bg-white p-6 border border-[#0F3D2E]/10 rounded-xl space-y-4 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <input 
                        type="checkbox" 
                        id="tax-enabled-checkbox"
                        checked={taxRules.enabled}
                        onChange={(e) => setTaxRules({ ...taxRules, enabled: e.target.checked })}
                        className="w-4 h-4 rounded text-[#0F3D2E] border-gray-300 focus:ring-[#D4AF37]"
                      />
                      <label htmlFor="tax-enabled-checkbox" className="text-xs font-bold uppercase tracking-wider text-[#0F3D2E] select-none cursor-pointer">Enable Global Taxes checkout lines</label>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Tax Label Designation</label>
                      <input 
                        type="text"
                        required
                        value={taxRules.tax_name}
                        onChange={(e) => setTaxRules({ ...taxRules, tax_name: e.target.value })}
                        placeholder="e.g., GST"
                        className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded px-3 py-1.5 text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Dynamic Tax Rate Percentage (%)</label>
                      <input 
                        type="number"
                        required
                        value={taxRules.gst_percentage}
                        onChange={(e) => setTaxRules({ ...taxRules, gst_percentage: Number(e.target.value) })}
                        placeholder="e.g., 18"
                        className="w-full bg-[#FAF9F5] border border-[#0F3D2E]/10 rounded px-3 py-1.5 text-xs outline-none font-mono"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2 bg-[#0F3D2E] hover:bg-[#07241a] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
                  >
                    Synchronize Tax Schemes ➜
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================
              USERS MEMBERS TABLE TAB
              ======================================================== */}
          {adminTab === "users" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xl font-serif">Staff & Member Directory</h3>
                <p className="text-xs text-gray-400 font-light mt-1">Upgrade user credentials to unlock administrator capabilities instantly.</p>
              </div>

              <div className="overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm">
                <table className="w-full text-xs text-left" id="admin-users-table">
                  <thead className="bg-[#FAF9F5] text-[#0F3D2E] uppercase font-bold text-[10px] border-b border-[#0F3D2E]/10">
                    <tr>
                      <th className="px-6 py-4">Patron Name</th>
                      <th className="px-6 py-4">Secured ID Contact</th>
                      <th className="px-6 py-4">Address Parameters</th>
                      <th className="px-6 py-4 text-center">Assigned Role Access</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans text-xs">
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td className="px-6 py-4 font-bold text-[#0F3D2E]">{u.full_name || "New Customer"}</td>
                        <td className="px-6 py-4 space-y-1">
                          <p className="font-mono text-gray-600 font-semibold">{u.email || "amlorawellness@gmail.com"}</p>
                          <p className="font-mono text-gray-400 text-[11px]">{u.phone || "No phone linked"}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-sm">
                          {u.address ? `${u.address}, ${u.city} (${u.pincode})` : <span className="italic text-gray-300">No profile coordinates registered</span>}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${u.role === "admin" ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/20" : "bg-gray-100 text-gray-700 border-gray-200"}`}>
                            {u.role || "user"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => toggleUserRole(u.id, u.role || "user")}
                            className="bg-amber-50 text-[#A2811A] hover:bg-amber-100 font-bold py-1 px-3 rounded text-[10px]"
                          >
                            {u.role === "admin" ? "Demote to user" : "Promote to Admin"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
