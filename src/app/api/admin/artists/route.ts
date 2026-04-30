import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ---- Helper: verify the caller is an admin ----
async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, isAdmin: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { supabase, user, isAdmin: profile?.role === "admin" };
}

// ---- PATCH: update artist fields ----
export async function PATCH(request: Request) {
  try {
    const { supabase, isAdmin } = await verifyAdmin();
    if (!isAdmin) {
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

// ---- DELETE: remove artist + optionally their auth user ----
export async function DELETE(request: Request) {
  try {
    const { supabase, isAdmin } = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { artistId, deleteUser } = await request.json();

    if (!artistId) {
      return NextResponse.json({ error: "Missing artistId" }, { status: 400 });
    }

    // Fetch artist to get profile_id before deleting
    const { data: artist } = await supabase
      .from("artists")
      .select("id, profile_id, slug")
      .eq("id", artistId)
      .single();

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    // Delete listings first (foreign key constraint)
    await supabase
      .from("listings")
      .delete()
      .eq("artist_id", artistId);

    // Delete the artist record
    const { error: deleteErr } = await supabase
      .from("artists")
      .delete()
      .eq("id", artistId);

    if (deleteErr) {
      console.error("Delete artist error:", deleteErr);
      return NextResponse.json({ error: "Failed to delete artist" }, { status: 500 });
    }

    // Optionally delete the auth user too
    if (deleteUser && artist.profile_id) {
      try {
        const admin = createAdminClient();

        // Delete profile record
        await admin
          .from("profiles")
          .delete()
          .eq("id", artist.profile_id);

        // Delete auth user
        await admin.auth.admin.deleteUser(artist.profile_id);
      } catch (authErr) {
        console.error("Delete auth user error:", authErr);
        // Non-fatal — artist record already deleted
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin artist delete error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
