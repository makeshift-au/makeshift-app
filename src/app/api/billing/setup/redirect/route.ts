import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { createCustomer } from "@/lib/billing";

/**
 * GET /api/billing/setup/redirect
 *
 * Creates a Stripe Checkout Session in "setup" mode and redirects
 * the user directly (no client-side JS needed).
 */
export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(`${appUrl}/login`);
    }

    const { data: artist } = await supabase
      .from("artists")
      .select("id, name, stripe_customer_id")
      .eq("profile_id", user.id)
      .single();

    if (!artist) {
      return NextResponse.redirect(`${appUrl}/dashboard/settings?error=no-artist`);
    }

    let customerId = artist.stripe_customer_id;

    // Create Stripe Customer if one doesn't exist yet
    if (!customerId) {
      customerId = await createCustomer({
        email: user.email!,
        name: artist.name,
        artistId: artist.id,
      });

      await supabase
        .from("artists")
        .update({ stripe_customer_id: customerId })
        .eq("id", artist.id);
    }

    // Create a Checkout Session in "setup" mode
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "setup",
      payment_method_types: ["card"],
      success_url: `${appUrl}/dashboard/settings?billing=success`,
      cancel_url: `${appUrl}/dashboard/settings?billing=cancelled`,
      metadata: {
        artist_id: artist.id,
      },
    });

    if (session.url) {
      return NextResponse.redirect(session.url);
    }

    return NextResponse.redirect(`${appUrl}/dashboard/settings?error=no-session`);
  } catch (err) {
    console.error("Billing redirect error:", err);
    return NextResponse.redirect(`${appUrl}/dashboard/settings?error=billing-failed`);
  }
}
