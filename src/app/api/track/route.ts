import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/track?artist=<id>&type=spotify|apple_music&url=<encoded_url>
 *
 * Logs a music_click usage event for billing, then redirects to the actual URL.
 * This way every outbound click to Spotify/Apple Music is tracked.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get("artist");
  const type = searchParams.get("type"); // "spotify" or "apple_music"
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Log the click event (fire-and-forget — don't block the redirect)
  if (artistId && type) {
    try {
      const supabase = await createClient();
      await supabase.from("usage_events").insert({
        artist_id: artistId,
        event_type: "music_click",
        metadata: { platform: type },
      });
    } catch (err) {
      console.error("Track click error:", err);
      // Non-fatal — still redirect
    }
  }

  return NextResponse.redirect(url);
}
