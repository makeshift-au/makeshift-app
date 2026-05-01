import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { createCustomer } from "@/lib/billing";

/**
 * POST /api/billing/setup
 *
 * Creates a Stripe Checkout Session in "setup" mode to collect
 * the artist's payment method without charging them.
 * If the artist doesn't have a Stripe Customer yet, creates one first.
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get artist record
    const { data: artist } = await supabase
      .from("artists")
      .select("id, name, stripe_customer_id")
      .eq("profile_id", user.id)
      .single();

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    let customerId = artist.stripe_customer_id;

    // Create Stripe Customer if one doesn't exist yet
    if (!customerId) {
      customerId = await createCustomer({
        email: user.email!,
        name: artist.name,
        artistId: artist.id,
      });

      // Save to DB
      await supabase
        .from("artists")
        .update({ stripe_customer_id: customerId })
        .eq("id", artist.id);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";

    // Create a Checkout Session in "setup" mode — collects card without charging
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

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Billing setup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * GET /api/billing/setup?artistId=<id>
 *
 * Checks if the artist has a payment method on file.
 */
export async function GET(request: Request) {
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
      .select("id, stripe_customer_id")
      .eq("profile_id", user.id)
      .single();

    if (!artist || !artist.stripe_customer_id) {
      return NextResponse.json({ hasPaymentMethod: false });
    }

    // Check if the Stripe Customer has any payment methods
    const paymentMethods = await stripe.paymentMethods.list({
      customer: artist.stripe_customer_id,
      type: "card",
      limit: 1,
    });

    return NextResponse.json({
      hasPaymentMethod: paymentMethods.data.length > 0,
      cardBrand: paymentMethods.data[0]?.card?.brand ?? null,
      cardLast4: paymentMethods.data[0]?.card?.last4 ?? null,
    });
  } catch (err) {
    console.error("Billing check error:", err);
    return NextResponse.json({ hasPaymentMethod: false });
  }
}
