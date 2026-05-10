-- ============================================================
-- MIGRATION 003: Fix usage_events table
-- Run in Supabase SQL Editor: dashboard.supabase.com → SQL Editor
-- ============================================================

-- 1. Add invoice_id column (used by monthly billing to track which invoice covered each event)
ALTER TABLE public.usage_events
  ADD COLUMN IF NOT EXISTS invoice_id text;

-- 2. Fix event_type CHECK constraint: code uses 'music_click' not 'streaming_click'
ALTER TABLE public.usage_events
  DROP CONSTRAINT IF EXISTS usage_events_event_type_check;

ALTER TABLE public.usage_events
  ADD CONSTRAINT usage_events_event_type_check
  CHECK (event_type IN ('enquiry', 'music_click', 'streaming_click', 'subscription', 'other'));

-- 3. Index for billing queries on invoice_id
CREATE INDEX IF NOT EXISTS idx_usage_events_invoice ON usage_events(invoice_id) WHERE invoice_id IS NOT NULL;
