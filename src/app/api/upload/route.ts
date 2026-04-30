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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string; // "hero", "avatar", "listing"
    const artistId = formData.get("artistId") as string;

    if (!file || !artistId) {
      return NextResponse.json({ error: "Missing file or artistId" }, { status: 400 });
    }

    // Verify artist ownership
    const { data: artist } = await supabase
      .from("artists")
      .select("id, profile_id, slug")
      .eq("id", artistId)
      .single();

    if (!artist || artist.profile_id !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Generate a unique filename
    const ext = file.name.split(".").pop() ?? "jpg";
    const timestamp = Date.now();
    const path = `${artist.slug}/${type}-${timestamp}.${ext}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from("images")
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadErr) {
      console.error("Upload error:", uploadErr);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);

    const publicUrl = urlData.publicUrl;

    // Update the artist record with the new image URL
    const columnMap: Record<string, string> = {
      hero: "hero_url",
      avatar: "avatar_url",
      banner: "banner_url",
    };

    const column = columnMap[type];
    if (column) {
      const { error: dbErr } = await supabase
        .from("artists")
        .update({ [column]: publicUrl, updated_at: new Date().toISOString() })
        .eq("id", artistId);

      if (dbErr) {
        console.error(`DB update error (${column}):`, dbErr);
        // Image uploaded OK but DB didn't save — tell the client
        return NextResponse.json(
          { url: publicUrl, path: uploadData.path, warning: "Image uploaded but profile not updated" },
          { status: 200 }
        );
      }
    }

    return NextResponse.json({ url: publicUrl, path: uploadData.path });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
