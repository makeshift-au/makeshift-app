import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { listingId, artistId } = await request.json();

    const supabase = await createClient();

    // Get listing details
    const { data: listing, error: listingErr } = await supabase
      .from("listings")
      .select("*, artists(id, name, stripe_account_id, fee_rate)")
      .eq("id", listingId)
      .single();

    if (listingErr || !listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const artist = listing.artists;
    if (!artist?.stripe_account_id) {
      return NextResponse.json(
        { error: "Artist has not completed Stripe setup" },
        { status: 400 },
      );
    }

    const feeRate = artist.fee_rate / 100; // e.g. 10.00 -> 0.10
    const amount = Math.round(listing.price * 100); // cents
    const platformFee = Math.round(amount * feeRate);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: listing.title,
              description: `by ${artist.name}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: artist.stripe_account_id,
        },
      },
      metadata: {
        listing_id: listingId,
        artist_id: artistId || artist.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
