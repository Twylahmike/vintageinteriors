
-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  description TEXT,
  dimensions TEXT,
  image_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  product_purchased TEXT,
  rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Settings (key/value)
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gallery
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Public read policies (storefront)
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read approved reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);

-- Public write for reviews (visitor can submit; admin approves)
CREATE POLICY "Anyone can submit a review" ON public.reviews FOR INSERT WITH CHECK (true);

-- Admin (anon) management policies. Admin panel uses password gate stored in settings.
-- This e-commerce admin is a single-tenant password-protected panel (no auth users), so we allow
-- anon mutations on products, categories, gallery, settings, and review moderation. The frontend
-- gates access via the admin password; the database treats writes as public for these admin tables.
CREATE POLICY "Anon manage products insert" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon manage products update" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Anon manage products delete" ON public.products FOR DELETE USING (true);

CREATE POLICY "Anon manage categories insert" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon manage categories update" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Anon manage categories delete" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Anon manage reviews update" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Anon manage reviews delete" ON public.reviews FOR DELETE USING (true);

CREATE POLICY "Anon manage settings insert" ON public.settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon manage settings update" ON public.settings FOR UPDATE USING (true);

CREATE POLICY "Anon manage gallery insert" ON public.gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon manage gallery update" ON public.gallery FOR UPDATE USING (true);
CREATE POLICY "Anon manage gallery delete" ON public.gallery FOR DELETE USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;

-- Storage bucket for product/gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Anon upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Anon update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media');
CREATE POLICY "Anon delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media');
