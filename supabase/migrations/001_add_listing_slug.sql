-- Add slug column to listings (for SEO-friendly URLs)
-- Run this in the Supabase SQL editor

ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create an index for slug lookups
CREATE INDEX IF NOT EXISTS idx_listings_slug ON listings(slug);

-- Add an update policy for applications (needed for admin approve/reject)
CREATE POLICY IF NOT EXISTS "Admins can update applications"
  ON applications FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add insert policy for artists (needed when admin approves application)
CREATE POLICY IF NOT EXISTS "Admins can insert artists"
  ON artists FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add update policy for artists featured toggle
CREATE POLICY IF NOT EXISTS "Admins can update artists"
  ON artists FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
