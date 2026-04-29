import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
    const { id, artistId, title, description, price, status, image_urls } = body;

    if (!artistId) {
      return NextResponse.json({ error: "Missing artistId" }, { status: 400 });
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

    const slug = slugify(title || "untitled");
    const now = new Date().toISOString();

    const listingData = {
      title: title || "Untitled",
      description: description || "",
      price: Number(price) || 0,
      price_type: body.price_type || "fixed",
      status: status || "draft",
      image_urls: image_urls || [],
      slug,
      updated_at: now,
    };

    let result;

    if (id) {
      // Update existing listing — verify it belongs to the artist
      const { data: existing } = await supabase
        .from("listings")
        .select("id, artist_id")
        .eq("id", id)
        .single();

      if (!existing || existing.artist_id !== artistId) {
        return NextResponse.json({ error: "Listing not found" }, { status: 404 });
      }

      const { data, error } = await supabase
        .from("listings")
        .update(listingData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Update listing error:", error);
        return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
      }

      result = data;
    } else {
      // Insert new listing
      const { data, error } = await supabase
        .from("listings")
        .insert({
          ...listingData,
          artist_id: artistId,
          created_at: now,
        })
        .select()
        .single();

      if (error) {
        console.error("Insert listing error:", error);
        return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
      }

      result = data;
    }

    return NextResponse.json({ listing: result });
  } catch (err) {
    console.error("Listing upsert error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
