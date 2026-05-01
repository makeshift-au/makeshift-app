-- ============================================================
-- MIGRATION 002: Add monetisation + musician columns
-- Run in Supabase SQL Editor: dashboard.supabase.com → SQL Editor
-- ============================================================

-- 1. Applications table: add musician streaming URLs
ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS spotify_url text,
  ADD COLUMN IF NOT EXISTS apple_music_url text;

-- 2. Artists table: add musician streaming URLs
ALTER TABLE public.artists
  ADD COLUMN IF NOT EXISTS spotify_url text,
  ADD COLUMN IF NOT EXISTS apple_music_url text;

-- 3. Artists table: add billing/subscription columns
ALTER TABLE public.artists
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS subscription_status text,
  ADD COLUMN IF NOT EXISTS subscription_started_at timestamptz;

-- 4. Usage events table (for metered billing: enquiries, streaming clicks)
CREATE TABLE IF NOT EXISTS public.usage_events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  artist_id uuid REFERENCES public.artists(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('enquiry', 'streaming_click', 'subscription', 'other')),
  metadata jsonb DEFAULT '{}',
  billed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.usage_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists can view own usage events"
  ON usage_events FOR SELECT USING (
    artist_id IN (
      SELECT id FROM artists WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create usage events"
  ON usage_events FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_usage_events_artist ON usage_events(artist_id);
CREATE INDEX IF NOT EXISTS idx_usage_events_type ON usage_events(event_type);
CREATE INDEX IF NOT EXISTS idx_usage_events_billed ON usage_events(billed) WHERE billed = false;
