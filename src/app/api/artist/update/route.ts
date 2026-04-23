import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Verify the user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { artistId, name, tagline, bio, location, instagram, website, commissions, price_range } = body;

    // Verify this artist belongs to the current user
    const { data: artist } = await supabase
      .from("artists")
      .select("id, profile_id")
      .eq("id", artistId)
      .single();

    if (!artist || artist.profile_id !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Update the artist record
    const { error } = await supabase
      .from("artists")
      .update({
        name,
        tagline,
        bio,
        location,
        instagram,
        website,
        commissions,
        price_range,
        updated_at: new Date().toISOString(),
      })
      .eq("id", artistId);

    if (error) {
      console.error("Update artist error:", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Artist update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
