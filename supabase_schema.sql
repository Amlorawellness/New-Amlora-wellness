-- =====================================================================
-- AMLORA WELLNESS: SUPABASE POSTGRESQL SCHEMA & SECURITY POLICIES (RLS)
-- Senior Architect Suite for Vercel/Netlify/Cloud Run deployments
-- =====================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES Table (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. PRODUCTS Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'powder' CHECK (type IN ('powder', 'candy', 'cubes')),
    purity_badge TEXT,
    packaging_type TEXT,
    net_weight TEXT,
    mrp NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    rating NUMERIC(3,2) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    tagline TEXT,
    description TEXT,
    long_description TEXT,
    ingredients TEXT,
    stock INTEGER DEFAULT 100,
    category TEXT DEFAULT 'Wellness',
    image_url TEXT,
    features TEXT[], -- Array of features
    specs JSONB, -- Specs key-value features
    nutritional_info JSONB, -- Nutritional values JSON
    back_details JSONB, -- Back packaging details JSON
    color_theme JSONB, -- CSS styling rules JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. COUPONS Table
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(10,2) NOT NULL,
    expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
    usage_limit INTEGER DEFAULT 100,
    usage_count INTEGER DEFAULT 0,
    min_cart_amount NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- 4. SHIPPING_RULES Table
CREATE TABLE IF NOT EXISTS public.shipping_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    min_cart_value NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    fee NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Shipping Rules
ALTER TABLE public.shipping_rules ENABLE ROW LEVEL SECURITY;

-- 5. SETTINGS Table (Holds GST/Taxes and global config parameters)
CREATE TABLE IF NOT EXISTS public.settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Settings Table
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 6. ORDERS Table (Unified WooCommerce-level Order management list)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cod', 'razorpay')),
    payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
    order_status VARCHAR(50) DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'dispatched', 'delivered', 'cancelled')),
    total_amount NUMERIC(10,2) NOT NULL,
    discount_amount NUMERIC(10,2) DEFAULT 0.00,
    shipping_fee NUMERIC(10,2) DEFAULT 0.00,
    tax_amount NUMERIC(10,2) DEFAULT 0.00,
    coupon_used TEXT,
    items JSONB NOT NULL, -- Array of bought items with product details
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 7. TRANSACTIONS Table (Secure store for Razorpay audit trial)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_uuid UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    amount NUMERIC(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status TEXT,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;


-- =====================================================================
-- RLS POLICIES (ROLE BASED ACCESS CONTROL)
-- =====================================================================

-- Helper Security Functions (Determines if client requester is an Admin)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles are visible to owner" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
    ON public.profiles FOR SELECT 
    USING (public.is_admin());

CREATE POLICY "Admins can update anyone's profile" 
    ON public.profiles FOR UPDATE 
    USING (public.is_admin());

-- Products Policies
CREATE POLICY "Products are visible to everyone" 
    ON public.products FOR SELECT 
    USING (true);

CREATE POLICY "Admins can manage products" 
    ON public.products ALL 
    USING (public.is_admin());

-- Coupons Policies
CREATE POLICY "Anyone can look up a valid coupon" 
    ON public.coupons FOR SELECT 
    USING (expiry_date > now() AND usage_count < usage_limit);

CREATE POLICY "Admins have full coupons rights" 
    ON public.coupons ALL 
    USING (public.is_admin());

-- Shipping Rules Policies
CREATE POLICY "Anyone can view shipping rules" 
    ON public.shipping_rules FOR SELECT 
    USING (true);

CREATE POLICY "Admins can edit shipping rules" 
    ON public.shipping_rules ALL 
    USING (public.is_admin());

-- Settings Policies
CREATE POLICY "Settings are readable by anyone" 
    ON public.settings FOR SELECT 
    USING (true);

CREATE POLICY "Admins can edit settings" 
    ON public.settings ALL 
    USING (public.is_admin());

-- Orders Policies
CREATE POLICY "Users can view their own orders" 
    ON public.orders FOR SELECT 
    USING (auth.uid() = user_id OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Anyone can create an checkout order" 
    ON public.orders FOR INSERT 
    WITH CHECK (true); -- Guest checkouts and logged-in checkouts allowed

CREATE POLICY "Users can update their payments for checkout reference" 
    ON public.orders FOR UPDATE 
    USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can manage all orders" 
    ON public.orders ALL 
    USING (public.is_admin());

-- Transactions Policies
CREATE POLICY "Users can query transaction for owned orders" 
    ON public.transactions FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = transactions.order_uuid AND orders.user_id = auth.uid()
    ));

CREATE POLICY "Orders flow can write transactions" 
    ON public.transactions FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Admins can manage transactions" 
    ON public.transactions ALL 
    USING (public.is_admin());


-- =====================================================================
-- AUTOMATION TRIGGERS CODES
-- =====================================================================

-- Automated trigger to sync new auth user login registers with profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role VARCHAR(20) := 'user';
BEGIN
  -- Auto promote first registered user, or matching amlorawellness admin email to admin
  IF NEW.email = 'amlorawellness@gmail.com' OR NEW.email = 'info@amlorawellness.com' THEN
    v_role := 'admin';
  END IF;

  INSERT INTO public.profiles (id, role, full_name, phone)
  VALUES (
    NEW.id,
    v_role,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New Customer'),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =====================================================================
-- INITIAL BOOTSTRAP SEEDS (WELLNESS PRODUCTS & SETTINGS SETUP)
-- =====================================================================

-- Pre-seed setup parameters
INSERT INTO public.settings (key, value) VALUES (
    'tax_rules',
    '{"gst_percentage": 18, "enabled": true, "tax_name": "GST"}'
) ON CONFLICT (key) DO NOTHING;

-- Pre-seed default free shipping minimums
INSERT INTO public.shipping_rules (name, min_cart_value, fee) VALUES 
('Standard Shipping Below ₹500', 0.00, 50.00),
('Free Delivery On Premium Vitality', 500.00, 0.00)
ON CONFLICT DO NOTHING;

-- Pre-seed initial active coupons
INSERT INTO public.coupons (code, discount_type, discount_value, expiry_date, usage_limit, usage_count, min_cart_amount) VALUES
('AMLA10', 'percentage', 10.00, now() + INTERVAL '12 months', 500, 0, 300.00),
('PUREVITALITY50', 'fixed', 50.00, now() + INTERVAL '6 months', 200, 0, 400.00)
ON CONFLICT (code) DO NOTHING;
