import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { artistId, ...updates } = await request.json();

    if (!artistId) {
      return NextResponse.json({ error: "Missing artistId" }, { status: 400 });
    }

    // Admin can update these fields
    const allowedFields = [
      "name", "tagline", "bio", "location", "discipline",
      "instagram", "website", "commissions", "price_range",
      "status", "featured", "fee_rate", "founding_artist",
    ];

    const safeUpdates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    for (const key of allowedFields) {
      if (key in updates && updates[key] !== undefined) {
        safeUpdates[key] = updates[key];
      }
    }

    const { error } = await supabase
      .from("artists")
      .update(safeUpdates)
      .eq("id", artistId);

    if (error) {
      console.error("Admin artist update error:", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin artist update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
