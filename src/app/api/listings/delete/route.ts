import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { id, artistId } = body;

    if (!id || !artistId) {
      return NextResponse.json({ error: "Missing id or artistId" }, { status: 400 });
    }

    // Verify artist ownership
    const { data: artist } = await supabase
      .from("artists")
      .select("id, profile_id")
      .eq("id", artistId)
      .single();

    if (!artist || artist.profile_id !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Verify listing belongs to the artist
    const { data: listing } = await supabase
      .from("listings")
      .select("id, artist_id")
      .eq("id", id)
      .single();

    if (!listing || listing.artist_id !== artistId) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Delete the listing
    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete listing error:", error);
      return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Listing delete error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
