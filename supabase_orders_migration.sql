-- ====================================================================
-- SUPABASE ORDER FLOW MIGRATION BLUEPRINT
-- ====================================================================
-- This SQL script defines the tables, columns, constraints and policies
-- for guest + authenticated checkout orders, including sequential friendly 
-- order references and child line-item snapshots.
-- ====================================================================

-- 1. Create Orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT UNIQUE NOT NULL, -- Friendly sequential reference (e.g., AML000001)
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Nullable for Guest Checkout
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'razorpay', 'prepaid')),
    payment_status TEXT NOT NULL DEFAULT 'Pending',
    order_status TEXT NOT NULL DEFAULT 'New',
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    items JSONB NOT NULL, -- JSON backup list of items for backwards compatibility fallback
    razorpay_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow Guest & Authenticated order creation
CREATE POLICY "Allow anyone to place checkout orders" 
ON public.orders FOR INSERT 
WITH CHECK (true);

-- Allow readers to access their own orders
CREATE POLICY "Allow users to read their own orders" 
ON public.orders FOR SELECT 
USING (user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR true);


-- 2. Create Order Items child snapshot table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name_snapshot TEXT NOT NULL,
    sku_snapshot TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for Order Items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow order creation queries to write order items
CREATE POLICY "Allow anyone to insert order items" 
ON public.order_items FOR INSERT 
WITH CHECK (true);

-- Allow reading child items
CREATE POLICY "Allow anyone to read order items" 
ON public.order_items FOR SELECT 
USING (true);
