import { createClient } from "@/lib/supabase/server";

/**
 * Get the current logged-in user's artist record.
 * Returns null if not logged in or not an artist.
 */
export async function getCurrentArtist() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: artist } = await supabase
    .from("artists")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  return artist;
}

/**
 * Get listings for the current artist.
 */
export async function getMyListings(artistId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("artist_id", artistId)
    .order("sort_order");

  if (error) {
    console.error("Fetch listings error:", error);
    return [];
  }
  return data ?? [];
}

/**
 * Get orders for the current artist.
 */
export async function getMyOrders(artistId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, listings(title)")
    .eq("artist_id", artistId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch orders error:", error);
    return [];
  }
  return data ?? [];
}

/**
 * Get enquiries for the current artist.
 */
export async function getMyEnquiries(artistId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .eq("artist_id", artistId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch enquiries error:", error);
    return [];
  }
  return data ?? [];
}
