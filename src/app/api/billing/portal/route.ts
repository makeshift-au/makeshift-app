import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createBillingPortalSession } from "@/lib/billing";

/**
 * POST /api/billing/portal
 * Opens a Stripe Billing Portal session for the authenticated artist.
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

    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
    }

    // Verify this customer belongs to the authenticated user's artist
    const { data: artist } = await supabase
      .from("artists")
      .select("stripe_customer_id")
      .eq("profile_id", user.id)
      .single();

    if (!artist || artist.stripe_customer_id !== customerId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";
    const url = await createBillingPortalSession({
      customerId,
      returnUrl: `${appUrl}/dashboard/billing`,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Billing portal error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
