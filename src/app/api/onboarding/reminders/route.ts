import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { sendOnboardingReminder } from "@/lib/email";

/**
 * GET /api/onboarding/reminders
 *
 * Runs daily via Vercel Cron. Checks all artists with status "onboarding"
 * and sends reminder emails at Day 1, Day 3, and Day 7 based on what's
 * still missing from their profile.
 *
 * Secured with CRON_SECRET header.
 */

function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    },
  );
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  try {
    // Get all onboarding artists
    const { data: artists, error: artistErr } = await supabase
      .from("artists")
      .select("id, profile_id, name, slug, bio, avatar_url, hero_url, stripe_onboarded, created_at, onboarding_reminder_sent")
      .eq("status", "onboarding");

    if (artistErr) {
      console.error("Fetch onboarding artists error:", artistErr);
      return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
    }

    if (!artists || artists.length === 0) {
      return NextResponse.json({ message: "No onboarding artists", sent: 0 });
    }

    const now = new Date();
    const results: { artistId: string; name: string; day: number | null; sent: boolean; reason?: string }[] = [];

    for (const artist of artists) {
      const createdAt = new Date(artist.created_at);
      const daysSinceApproval = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      const remindersSent = artist.onboarding_reminder_sent ?? 0;

      // Determine which reminder to send
      let dayNumber: 1 | 3 | 7 | null = null;

      if (daysSinceApproval >= 1 && daysSinceApproval < 3 && remindersSent < 1) {
        dayNumber = 1;
      } else if (daysSinceApproval >= 3 && daysSinceApproval < 7 && remindersSent < 2) {
        dayNumber = 3;
      } else if (daysSinceApproval >= 7 && remindersSent < 3) {
        dayNumber = 7;
      }

      if (!dayNumber) {
        results.push({ artistId: artist.id, name: artist.name, day: null, sent: false, reason: "Not due" });
        continue;
      }

      // Get the artist's email from profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", artist.profile_id)
        .single();

      if (!profile?.email) {
        results.push({ artistId: artist.id, name: artist.name, day: dayNumber, sent: false, reason: "No email" });
        continue;
      }

      // Check how many listings the artist has
      const { count: listingCount } = await supabase
        .from("listings")
        .select("id", { count: "exact", head: true })
        .eq("artist_id", artist.id);

      // Determine what's missing
      const missing = {
        profilePhoto: !artist.avatar_url,
        heroImage: !artist.hero_url,
        bio: !artist.bio || artist.bio.trim().length < 10,
        listings: (listingCount ?? 0) === 0,
        stripe: !artist.stripe_onboarded,
      };

      // If everything is done, skip the reminder
      const anythingMissing = Object.values(missing).some(Boolean);
      if (!anythingMissing) {
        results.push({ artistId: artist.id, name: artist.name, day: dayNumber, sent: false, reason: "Profile complete" });
        continue;
      }

      // Send the reminder
      try {
        await sendOnboardingReminder({
          artistEmail: profile.email,
          artistName: artist.name,
          dayNumber,
          missing,
        });

        // Update the reminder count
        await supabase
          .from("artists")
          .update({ onboarding_reminder_sent: remindersSent + 1 })
          .eq("id", artist.id);

        results.push({ artistId: artist.id, name: artist.name, day: dayNumber, sent: true });
      } catch (emailErr) {
        console.error(`Email error for ${artist.name}:`, emailErr);
        results.push({ artistId: artist.id, name: artist.name, day: dayNumber, sent: false, reason: String(emailErr) });
      }
    }

    const totalSent = results.filter((r) => r.sent).length;

    return NextResponse.json({
      message: `Onboarding reminders complete`,
      checked: artists.length,
      sent: totalSent,
      results,
    });
  } catch (err) {
    console.error("Onboarding reminders error:", err);
    return NextResponse.json({ error: "Reminder run failed" }, { status: 500 });
  }
}
