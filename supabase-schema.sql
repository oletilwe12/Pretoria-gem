-- Create the places table
CREATE TABLE IF NOT EXISTS places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  area TEXT NOT NULL,
  suburb TEXT NOT NULL,
  description TEXT NOT NULL,
  why_go TEXT NOT NULL,
  best_for TEXT NOT NULL,
  price_type TEXT NOT NULL,
  min_price NUMERIC,
  max_price NUMERIC,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  website_url TEXT,
  phone TEXT,
  opening_hours JSONB NOT NULL DEFAULT '{}',
  hero_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  suburb TEXT NOT NULL,
  description TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for searching
CREATE INDEX IF NOT EXISTS idx_places_search ON places USING GIN (to_tsvector('english', name || ' ' || suburb || ' ' || category || ' ' || array_to_string(tags, ' ')));

-- Enable RLS
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read access" ON places FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON places FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public submission" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin submission access" ON submissions FOR ALL USING (auth.role() = 'authenticated');
