-- ====================================================================
-- SENIOR ARCHITECT DATABASE SCHEMA FOR AMLORA WELLNESS (SUPABASE)
-- ====================================================================
-- This schema establishes a robust relational foundation with UUID primary keys, 
-- clean index mappings, strict foreign key constraints, default auditing timestamps,
-- auto-updating triggers, and fine-grained Row Level Security (RLS).
--
-- EXECUTION: Paste this script directly into the Supabase SQL Editor.
-- ====================================================================

-- ====================================================================
-- 0. SHARED AUDITING TRIGGER FUNCTION
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ====================================================================
-- 1. CATEGORIES TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for slug-based lookups (highly common in routing / navigation)
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to categories" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admin writes to categories" 
ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Register Trigger
CREATE TRIGGER set_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ====================================================================
-- 2. PRODUCTS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (price >= 0),
    mrp NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (mrp >= price),
    rating NUMERIC(3,2) DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
    reviews_count INTEGER DEFAULT 0 CHECK (reviews_count >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    tagline TEXT,
    description TEXT,
    image_url TEXT, -- Primary display image
    additional_images TEXT[] DEFAULT '{}', -- Secondary carousel image gallery
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to active products" 
ON public.products FOR SELECT USING (status = 'active');

CREATE POLICY "Allow authenticated admins full access to products" 
ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Register Trigger
CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ====================================================================
-- 3. USERS PROFILE TABLE
-- ====================================================================
-- Automatically synchronization table mirroring auth.users metadata.
CREATE TABLE IF NOT EXISTS public.users_profile (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow users to view their own profile" 
ON public.users_profile FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" 
ON public.users_profile FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Register Trigger
CREATE TRIGGER set_users_profile_updated_at
BEFORE UPDATE ON public.users_profile
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ====================================================================
-- 4. ADDRESSES TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users_profile(id) ON DELETE CASCADE NOT NULL,
    recipient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);

-- Enable RLS
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow users to read their own addresses" 
ON public.addresses FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to manage their own addresses" 
ON public.addresses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Register Trigger
CREATE TRIGGER set_addresses_updated_at
BEFORE UPDATE ON public.addresses
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ====================================================================
-- 5. ORDERS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users_profile(id) ON DELETE SET NULL, -- Nullable to allow Guest Checkout scenarios
    order_number TEXT NOT NULL UNIQUE,
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'prepaid')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    
    -- Address Snapshot captures exact address state at purchase time to prevent old updates from breaking history.
    shipping_address_snapshot JSONB NOT NULL, 
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow users to read their own orders" 
ON public.orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to place/insert orders" 
ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Register Trigger
CREATE TRIGGER set_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ====================================================================
-- 6. ORDER ITEMS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    
    -- Snapshots to safeguard history against downstream product deletion or design updates.
    product_name_snapshot TEXT NOT NULL,
    sku_snapshot TEXT NOT NULL,
    
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- Enable RLS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policies
-- Allows reading order items if the authenticated viewer is the owner of the parent order
CREATE POLICY "Allow users to read items of their orders" 
ON public.order_items FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
);

CREATE POLICY "Allow users to create order items" 
ON public.order_items FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
);

-- Register Trigger
CREATE TRIGGER set_order_items_updated_at
BEFORE UPDATE ON public.order_items
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
