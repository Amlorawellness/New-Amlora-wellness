-- ====================================================================
-- SUPABASE DATABASE SCHEMATIC MIGRATION
-- Target Table: public.orders
-- ====================================================================

-- 1. ADD NEW MISSING COLUMNS
ALTER TABLE public.orders 
    ADD COLUMN IF NOT EXISTS order_id TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS customer_name TEXT,
    ADD COLUMN IF NOT EXISTS phone TEXT,
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS address TEXT,
    ADD COLUMN IF NOT EXISTS city TEXT,
    ADD COLUMN IF NOT EXISTS state TEXT,
    ADD COLUMN IF NOT EXISTS pincode TEXT,
    ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT;

-- 2. DROP OBSOLETE/STRICT NOT-NULL CONSTRAINTS FOR PAYLOAD COMPATIBILITY
-- The client payload does not contain 'order_number' or 'shipping_address_snapshot' directly.
ALTER TABLE public.orders ALTER COLUMN order_number DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN shipping_address_snapshot DROP NOT NULL;

-- 3. DROP RESTRICTIVE CHECK CONSTRAINTS TO PREVENT PAYLOAD VALUES REJECTION
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_status_check;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_order_status_check;

-- 4. RECREATE EXPANDED CHECK CONSTRAINTS TO FIT BOTH LEGACY & NEW PAYLOAD VALUES
-- The active order payload inserts:
--   payment_method: 'cod' or 'razorpay'
--   payment_status: 'Pending' or 'unpaid'
--   order_status: 'New' or 'pending'
ALTER TABLE public.orders 
    ADD CONSTRAINT orders_payment_method_check 
    CHECK (payment_method IN ('cod', 'razorpay', 'prepaid')),
    
    ADD CONSTRAINT orders_payment_status_check 
    CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed', 'Pending', 'pending')),
    
    ADD CONSTRAINT orders_order_status_check 
    CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'New', 'confirmed', 'dispatched'));

-- 5. SET LOGICAL DEFAULT VALUES
ALTER TABLE public.orders 
    ALTER COLUMN payment_status SET DEFAULT 'Pending',
    ALTER COLUMN order_status SET DEFAULT 'New';

-- 6. VERIFICATION COMMENTS
COMMENT ON TABLE public.orders IS 'Unified orders table supporting both guest and authenticated checkout flows';
