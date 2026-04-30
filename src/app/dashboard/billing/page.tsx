import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getInvoices, createBillingPortalSession } from "@/lib/billing";
import BillingClient from "@/components/BillingClient";

export const metadata: Metadata = { title: "Billing" };

export default async function DashboardBillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get artist record for the logged-in user
  const { data: artist } = await supabase
    .from("artists")
    .select(
      "id, name, founding_artist, fee_rate, stripe_customer_id, subscription_status, subscription_started_at, stripe_account_id, stripe_onboarded"
    )
    .eq("profile_id", user.id)
    .single();

  if (!artist) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display font-[800] text-3xl mb-4">No artist profile found</h1>
        <p className="text-lightgrey">
          Your billing will appear here once your artist profile is set up.
        </p>
      </div>
    );
  }

  // Fetch usage counts for current month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count: enquiryCount } = await supabase
    .from("usage_events")
    .select("id", { count: "exact", head: true })
    .eq("artist_id", artist.id)
    .eq("event_type", "enquiry")
    .gte("created_at", monthStart);

  const { count: clickCount } = await supabase
    .from("usage_events")
    .select("id", { count: "exact", head: true })
    .eq("artist_id", artist.id)
    .eq("event_type", "music_click")
    .gte("created_at", monthStart);

  // Fetch invoice history from Stripe (if customer exists)
  let invoices: {
    id: string;
    date: string;
    amount: string;
    status: string;
    url: string | null;
  }[] = [];

  if (artist.stripe_customer_id) {
    try {
      const stripeInvoices = await getInvoices(artist.stripe_customer_id, 12);
      invoices = stripeInvoices.map((inv) => ({
        id: inv.id,
        date: new Date((inv.created ?? 0) * 1000).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        amount: `$${((inv.amount_due ?? 0) / 100).toFixed(2)}`,
        status: inv.status ?? "unknown",
        url: inv.hosted_invoice_url ?? null,
      }));
    } catch (err) {
      console.error("Fetch invoices error:", err);
    }
  }

  // Calculate trial end date for founding artists
  let trialEndsAt: string | null = null;
  if (artist.founding_artist && artist.subscription_started_at) {
    const trialEnd = new Date(artist.subscription_started_at);
    trialEnd.setDate(trialEnd.getDate() + 180);
    trialEndsAt = trialEnd.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Subscription status display
  const subStatusMap: Record<string, { label: string; color: string }> = {
    active: { label: "ACTIVE", color: "text-lime bg-lime/15" },
    trialing: { label: "TRIAL", color: "text-lime bg-lime/15" },
    past_due: { label: "PAST DUE", color: "text-red-400 bg-red-400/15" },
    canceled: { label: "CANCELLED", color: "text-midgrey bg-midgrey/15" },
    paused: { label: "PAUSED", color: "text-yellow-400 bg-yellow-400/15" },
    incomplete: { label: "SETUP NEEDED", color: "text-yellow-400 bg-yellow-400/15" },
    none: { label: "NO SUBSCRIPTION", color: "text-midgrey bg-midgrey/15" },
  };

  const subStatus =
    subStatusMap[artist.subscription_status ?? "none"] ?? subStatusMap.none;

  return (
    <BillingClient
      artist={{
        id: artist.id,
        name: artist.name,
        foundingArtist: artist.founding_artist ?? false,
        feeRate: artist.fee_rate ?? 10,
        stripeCustomerId: artist.stripe_customer_id,
        subscriptionStatus: artist.subscription_status ?? "none",
        stripeOnboarded: artist.stripe_onboarded ?? false,
      }}
      subStatus={subStatus}
      trialEndsAt={trialEndsAt}
      enquiryCount={enquiryCount ?? 0}
      clickCount={clickCount ?? 0}
      invoices={invoices}
    />
  );
}
