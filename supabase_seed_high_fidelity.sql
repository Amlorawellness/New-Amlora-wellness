-- ====================================================================
-- SUPABASE HIGH-FIDELITY SEED SCRIPT FOR AMLORA WELLNESS
-- ====================================================================
-- This script contains the exact INSERT statements to seed the three 
-- flagship Amlora products with their precise name, image, price, and 
-- specs to match the high-fidelity frontend theme.
--
-- EXECUTION: Run this script inside your Supabase project's SQL Editor.
-- ====================================================================

-- 1. Create categories if they do not exist
INSERT INTO public.categories (name, slug, description)
VALUES 
('Wellness Powder', 'wellness-powder', 'Pure seedless wellness botanical powders'),
('Healthy Confectionery', 'healthy-confectionery', 'Tangy and Ayurvedic digestive amla snacks'),
('Juicy Cubes', 'juicy-cubes', 'Delightful family-friendly chewy amla fruit cubes')
ON CONFLICT (slug) DO NOTHING;

-- 2. Clean inserting of the 3 flagship items
-- This query resolves category_id dynamically based on slug mappings.

INSERT INTO public.products (
    sku, 
    name, 
    type,
    price, 
    mrp, 
    rating, 
    reviews_count, 
    stock, 
    status, 
    tagline, 
    description, 
    image_url,
    category_id
)
VALUES 
(
    'AML-PW-2401', 
    'AMLORA AMLA POWDER', 
    'powder', 
    299.00, 
    499.00, 
    4.90, 
    342, 
    75, 
    'active', 
    '100% Pure Amla Powder. Free from Seeds.', 
    'Inspired by traditional wisdom, our premium powder contains absolutely zero seed grit. Processed with advanced seed-separation tech to deliver only pure, potent, nutrient-dense amla flesh.',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600',
    (SELECT id FROM public.categories WHERE slug = 'wellness-powder' LIMIT 1)
),
(
    'AML-CC-2402', 
    'AMLORA CHATPATA AMLA CANDY', 
    'candy', 
    299.00, 
    499.00, 
    4.80, 
    219, 
    120, 
    'active', 
    'Spicy, savory wellness candy crafted from mature Amla.', 
    'The classic Indian digestive treat reinvented. Soft seasoned cubes dusted in a premium blend of spices and rock salt. Made with wholesome Amla slices that are both tangy and delightfully snackable.',
    'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&q=80&w=600',
    (SELECT id FROM public.categories WHERE slug = 'healthy-confectionery' LIMIT 1)
),
(
    'AML-FC-2403', 
    'AMLORA AMLA FRUITY CUBES', 
    'cubes', 
    299.00, 
    499.00, 
    4.70, 
    185, 
    60, 
    'active', 
    'Soft, colorful, natural fruit jellies infused with pure Amla pulp.', 
    'Modern healthy snacking for the entire family. Soft chewable cubes crafted with wholesome Amla pulp and infused with natural berry and fruit extracts. A massive hit with children!',
    'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600',
    (SELECT id FROM public.categories WHERE slug = 'juicy-cubes' LIMIT 1)
)
ON CONFLICT (sku) 
DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    price = EXCLUDED.price,
    mrp = EXCLUDED.mrp,
    rating = EXCLUDED.rating,
    reviews_count = EXCLUDED.reviews_count,
    stock = EXCLUDED.stock,
    status = EXCLUDED.status,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    category_id = EXCLUDED.category_id,
    updated_at = timezone('utc'::text, now());
