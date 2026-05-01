import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

// Create a Stripe Connect account and return the onboarding link
export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get the artist record
    const { data: artist, error: artistErr } = await supabase
      .from("artists")
      .select("id, stripe_account_id, name, slug")
      .eq("profile_id", user.id)
      .single();

    if (artistErr || !artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    let accountId = artist.stripe_account_id;

    // Create Connect account if not yet created
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "AU",
        email: user.email,
        business_type: "individual",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        individual: {
          first_name: artist.name.split(" ")[0],
          last_name: artist.name.split(" ").slice(1).join(" ") || undefined,
          email: user.email,
        },
        business_profile: {
          name: artist.name,
          product_description: "Selling original artwork and creative work through Makeshift marketplace",
          url: `https://makeshift-au.com/artist/${artist.slug}`,
        },
      });

      accountId = account.id;

      // Save to DB
      await supabase
        .from("artists")
        .update({ stripe_account_id: accountId })
        .eq("id", artist.id);
    }

    // Check if the request includes a returnTo param
    // (so we can redirect back to settings during onboarding)
    const returnTo = "settings";

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/dashboard/settings?connect=refresh`,
      return_url: `${baseUrl}/dashboard/settings?connect=complete`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    console.error("Connect error:", err);
    return NextResponse.json(
      { error: "Failed to create Stripe Connect account" },
      { status: 500 },
    );
  }
}

// Check onboarding status
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: artist } = await supabase
      .from("artists")
      .select("id, stripe_account_id, stripe_onboarded")
      .eq("profile_id", user.id)
      .single();

    if (!artist?.stripe_account_id) {
      return NextResponse.json({
        connected: false,
        onboarded: false,
      });
    }

    // Check account status with Stripe
    const account = await stripe.accounts.retrieve(artist.stripe_account_id);
    const isOnboarded = account.charges_enabled && account.payouts_enabled;

    // Update DB if newly onboarded
    if (isOnboarded && !artist.stripe_onboarded) {
      await supabase
        .from("artists")
        .update({ stripe_onboarded: true })
        .eq("id", artist.id);
    }

    return NextResponse.json({
      connected: true,
      onboarded: isOnboarded,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
    });
  } catch (err) {
    console.error("Connect status error:", err);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 },
    );
  }
}
