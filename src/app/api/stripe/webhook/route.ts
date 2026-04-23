import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@supabase/ssr";
import Stripe from "stripe";
import {
  sendOrderConfirmation,
  sendOrderNotificationToArtist,
} from "@/lib/email";

// Use the service role key for webhook handlers (bypasses RLS)
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

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // If webhook secret is set, verify signature; otherwise parse directly
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const listingId = session.metadata?.listing_id;
        const artistId = session.metadata?.artist_id;

        if (listingId && artistId) {
          const amount = (session.amount_total ?? 0) / 100;

          // Get artist details
          const { data: artist } = await supabase
            .from("artists")
            .select("fee_rate, name, profile_id")
            .eq("id", artistId)
            .single();

          const feeRate = (artist?.fee_rate ?? 10) / 100;
          const platformFee = Math.round(amount * feeRate * 100) / 100;
          const artistPayout = Math.round((amount - platformFee) * 100) / 100;

          // Get listing title
          const { data: listing } = await supabase
            .from("listings")
            .select("title")
            .eq("id", listingId)
            .single();

          // Create order record
          const orderNumber = `MKS-${Date.now().toString(36).toUpperCase()}`;
          await supabase.from("orders").insert({
            order_number: orderNumber,
            listing_id: listingId,
            artist_id: artistId,
            buyer_email: session.customer_details?.email ?? "",
            buyer_name: session.customer_details?.name ?? "",
            amount,
            platform_fee: platformFee,
            artist_payout: artistPayout,
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id ?? null,
            status: "paid",
          });

          // Send emails (fire-and-forget — don't block the webhook)
          const itemTitle = listing?.title ?? "Your order";
          const buyerEmail = session.customer_details?.email;
          const buyerName = session.customer_details?.name ?? undefined;
          const artistName = artist?.name ?? "the artist";

          if (buyerEmail) {
            sendOrderConfirmation({
              buyerEmail,
              buyerName,
              itemTitle,
              artistName,
              amount,
              orderNumber,
            }).catch((e) => console.error("Order email failed:", e));
          }

          // Get artist email from their profile
          if (artist?.profile_id) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("email")
              .eq("id", artist.profile_id)
              .single();

            if (profile?.email) {
              sendOrderNotificationToArtist({
                artistEmail: profile.email,
                artistName,
                itemTitle,
                buyerName,
                amount,
                platformFee,
                orderNumber,
              }).catch((e) => console.error("Artist email failed:", e));
            }
          }
        }
        break;
      }

      case "account.updated": {
        const account = event.data.object as Stripe.Account;
        if (account.charges_enabled && account.payouts_enabled) {
          await supabase
            .from("artists")
            .update({ stripe_onboarded: true })
            .eq("stripe_account_id", account.id);
        }
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
