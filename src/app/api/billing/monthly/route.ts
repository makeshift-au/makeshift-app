import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { addUsageCharges } from "@/lib/billing";

/**
 * POST /api/billing/monthly
 *
 * Runs the monthly billing cycle:
 * 1. Finds all artists with a stripe_customer_id
 * 2. Tallies unbilled usage_events (enquiries + music clicks)
 * 3. Adds charges to their next Stripe invoice (or creates standalone)
 * 4. Marks events as billed
 *
 * Secured with a CRON_SECRET header — call from Vercel Cron or manually.
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

// Vercel Cron sends GET requests
export async function GET(request: Request) {
  return runMonthlyBilling(request);
}

// Also support POST for manual triggers
export async function POST(request: Request) {
  return runMonthlyBilling(request);
}

async function runMonthlyBilling(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Calculate the billing period (previous month)
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodLabel = periodStart.toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });

  try {
    // Get all artists with Stripe customers
    const { data: artists, error: artistErr } = await supabase
      .from("artists")
      .select("id, name, stripe_customer_id")
      .not("stripe_customer_id", "is", null);

    if (artistErr) {
      console.error("Fetch artists error:", artistErr);
      return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
    }

    if (!artists || artists.length === 0) {
      return NextResponse.json({ message: "No billable artists found", processed: 0 });
    }

    const results: {
      artistId: string;
      name: string;
      enquiries: number;
      musicClicks: number;
      invoiceId?: string;
      error?: string;
    }[] = [];

    for (const artist of artists) {
      try {
        // Count unbilled enquiries for this artist in the billing period
        const { data: enquiryEvents } = await supabase
          .from("usage_events")
          .select("id")
          .eq("artist_id", artist.id)
          .eq("event_type", "enquiry")
          .eq("billed", false)
          .gte("created_at", periodStart.toISOString())
          .lt("created_at", periodEnd.toISOString());

        // Count unbilled music clicks for this artist in the billing period
        const { data: clickEvents } = await supabase
          .from("usage_events")
          .select("id")
          .eq("artist_id", artist.id)
          .eq("event_type", "music_click")
          .eq("billed", false)
          .gte("created_at", periodStart.toISOString())
          .lt("created_at", periodEnd.toISOString());

        const enquiryCount = enquiryEvents?.length ?? 0;
        const musicClickCount = clickEvents?.length ?? 0;

        if (enquiryCount === 0 && musicClickCount === 0) {
          results.push({
            artistId: artist.id,
            name: artist.name,
            enquiries: 0,
            musicClicks: 0,
          });
          continue;
        }

        // Add charges to Stripe
        const { invoiceId } = await addUsageCharges({
          customerId: artist.stripe_customer_id!,
          enquiryCount,
          musicClickCount,
          periodLabel,
        });

        // Mark events as billed
        const allEventIds = [
          ...(enquiryEvents?.map((e) => e.id) ?? []),
          ...(clickEvents?.map((e) => e.id) ?? []),
        ];

        if (allEventIds.length > 0) {
          await supabase
            .from("usage_events")
            .update({
              billed: true,
              invoice_id: invoiceId ?? null,
            })
            .in("id", allEventIds);
        }

        results.push({
          artistId: artist.id,
          name: artist.name,
          enquiries: enquiryCount,
          musicClicks: musicClickCount,
          invoiceId,
        });
      } catch (err) {
        console.error(`Billing error for artist ${artist.id}:`, err);
        results.push({
          artistId: artist.id,
          name: artist.name,
          enquiries: 0,
          musicClicks: 0,
          error: String(err),
        });
      }
    }

    const totalCharged = results.filter(
      (r) => !r.error && (r.enquiries > 0 || r.musicClicks > 0)
    ).length;

    return NextResponse.json({
      message: `Monthly billing complete for ${periodLabel}`,
      processed: artists.length,
      charged: totalCharged,
      results,
    });
  } catch (err) {
    console.error("Monthly billing error:", err);
    return NextResponse.json({ error: "Billing run failed" }, { status: 500 });
  }
}
