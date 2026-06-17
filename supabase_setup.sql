-- ====================================================================
-- SUPABASE SCHEMA SETUP FOR AMLORA WELLNESS PRODUCTS TABLE
-- ====================================================================
-- Run this script in the Supabase SQL Editor (SQL Web Console) to
-- provision your 'products' table and seed it with initial items.

-- 1. Create the products table if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('powder', 'candy', 'cubes', 'juice', 'wellness')),
    price NUMERIC NOT NULL DEFAULT 0.00,
    mrp NUMERIC NOT NULL DEFAULT 0.00,
    rating NUMERIC(3,2) DEFAULT 5.00,
    reviews_count INTEGER DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    category TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add an index to speed up common select filters by category
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);

-- 3. Enable Row Level Security (RLS) for public database protection
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies to allow anyone to READ products, but require auth for write actions
CREATE POLICY "Allow public read access to products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated admin writes to products" 
ON public.products 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 5. Seed the products table with premium Organic Wellness catalog items
INSERT INTO public.products (name, type, price, mrp, rating, reviews_count, stock, category, tagline, description, image_url)
VALUES 
(
    'Pure Amla Powder', 
    'powder', 
    299.00, 
    399.00, 
    4.8, 
    142, 
    45, 
    'Wellness Powder', 
    'Hand-Deseeded & Farm-Spun Sun-Dried Pulp', 
    '100% pure organic amla powder directly from the farmyards of Pratapgarh, Uttar Pradesh. Rich in Vitamin C and natural antioxidants.',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400'
),
(
    'Spiced Chatpata Candy', 
    'candy', 
    199.00, 
    249.00, 
    4.9, 
    328, 
    80, 
    'Healthy Confectionery', 
    'Sun-cured Candy with Ayurvedic Rock Salt Herbs', 
    'Tangy organic amla snack infused with traditional carminative digestion spices and traditional black salt.',
    'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&q=80&w=400'
),
(
    'Chewable Fruity Cubes', 
    'cubes', 
    249.00, 
    299.00, 
    4.7, 
    94, 
    25, 
    'Juicy Cubes', 
    'Honey-Glazed High-Density Vitamin C Bites', 
    'Pure botanical chewables rich in immune-boosting raw bioflavonoids and hand-pressed organic honey.',
    'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400'
)
ON CONFLICT DO NOTHING;
