-- Track how many onboarding reminder emails have been sent
ALTER TABLE artists ADD COLUMN IF NOT EXISTS onboarding_reminder_sent integer DEFAULT 0;
