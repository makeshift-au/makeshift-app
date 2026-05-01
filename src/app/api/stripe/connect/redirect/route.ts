import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/stripe/connect/redirect
 *
 * Creates a Stripe Connect account (if needed) and redirects
 * the user directly to the onboarding flow (no client-side JS needed).
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(`${baseUrl}/login`);
    }

    const { data: artist, error: artistErr } = await supabase
      .from("artists")
      .select("id, stripe_account_id, name")
      .eq("profile_id", user.id)
      .single();

    if (artistErr || !artist) {
      return NextResponse.redirect(`${baseUrl}/dashboard/settings?error=no-artist`);
    }

    let accountId = artist.stripe_account_id;

    // Create Connect account if not yet created
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "AU",
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          name: artist.name,
          product_description: "Independent artist marketplace",
        },
      });

      accountId = account.id;

      await supabase
        .from("artists")
        .update({ stripe_account_id: accountId })
        .eq("id", artist.id);
    }

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/dashboard/settings?connect=refresh`,
      return_url: `${baseUrl}/dashboard/settings?connect=complete`,
      type: "account_onboarding",
    });

    return NextResponse.redirect(accountLink.url);
  } catch (err) {
    console.error("Connect redirect error:", err);
    return NextResponse.redirect(`${baseUrl}/dashboard/settings?error=connect-failed`);
  }
}
