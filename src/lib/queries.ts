/**
 * Data access layer — tries Supabase first, falls back to mock data.
 * Once Jordan runs the schema + seed SQL, this seamlessly uses real data.
 */
import { createClient } from "@/lib/supabase/server";
import {
  artists as mockArtists,
  categories as mockCategories,
  type Artist,
} from "@/data/artists";

// ---- Type that maps DB rows to what components expect ----
export type { Artist };

export type DBCategory = {
  slug: string;
  label: string;
  bg: string;
  sort_order: number;
  count?: number;
};

// ---- Artists ----

export async function getAllArtists(): Promise<Artist[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("status", "live")
      .order("name");

    if (error || !data || data.length === 0) throw new Error("fallback");

    return realArtistsFirst(data.map(mapDBArtist));
  } catch {
    return realArtistsFirst(mockArtists);
  }
}

export async function getArtist(slug: string): Promise<Artist | undefined> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) throw new Error("fallback");

    return mapDBArtist(data);
  } catch {
    return mockArtists.find((a) => a.slug === slug);
  }
}

export async function getFeaturedArtists(): Promise<Artist[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("featured", true)
      .eq("status", "live")
      .order("name")
      .limit(6);

    if (error || !data || data.length === 0) throw new Error("fallback");

    return realArtistsFirst(data.map(mapDBArtist)).slice(0, 6);
  } catch {
    return realArtistsFirst(mockArtists.filter((a) => a.featured)).slice(0, 6);
  }
}

export async function getArtistsByCategory(
  categorySlug: string,
): Promise<Artist[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("discipline", categorySlug)
      .eq("status", "live")
      .order("name");

    if (error || !data || data.length === 0) throw new Error("fallback");

    return realArtistsFirst(data.map(mapDBArtist));
  } catch {
    return realArtistsFirst(mockArtists.filter((a) => a.discipline === categorySlug));
  }
}

// ---- Categories ----

export async function getCategories() {
  try {
    const supabase = await createClient();
    const { data: cats, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");

    if (error || !cats || cats.length === 0) throw new Error("fallback");

    // Get artist counts per category
    const { data: artists } = await supabase
      .from("artists")
      .select("discipline")
      .eq("status", "live");

    const counts: Record<string, number> = {};
    (artists ?? []).forEach((a: { discipline: string }) => {
      counts[a.discipline] = (counts[a.discipline] || 0) + 1;
    });

    // Map category images from mock data for now
    const imageMap: Record<string, string> = {};
    mockCategories.forEach((mc) => {
      if (mc.image) imageMap[mc.slug] = mc.image;
    });

    return cats.map((c: DBCategory) => ({
      slug: c.slug,
      label: c.label,
      bg: c.bg,
      count: counts[c.slug] || 0,
      image: imageMap[c.slug] || "",
    }));
  } catch {
    return [...mockCategories];
  }
}

export async function getCategoryBySlug(slug: string) {
  const cats = await getCategories();
  return cats.find((c: { slug: string }) => c.slug === slug);
}

// ---- Listings ----

export async function getListingsByArtist(artistId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("artist_id", artistId)
      .eq("status", "live")
      .order("sort_order");

    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getListing(idOrSlug: string) {
  try {
    const supabase = await createClient();

    // Try by UUID first, then by slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    const { data, error } = await supabase
      .from("listings")
      .select("*, artists(*)")
      .eq(isUUID ? "id" : "slug", idOrSlug)
      .single();

    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

// ---- Helper: real artists (with content) float to top ----

function realArtistsFirst(artists: Artist[]): Artist[] {
  return artists.sort((a, b) => {
    const aReal = a.heroUrl ? 1 : 0;
    const bReal = b.heroUrl ? 1 : 0;
    if (aReal !== bReal) return bReal - aReal; // artists with images first
    return a.name.localeCompare(b.name);
  });
}

// ---- Helper: map DB row to Artist type ----

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDBArtist(row: any): Artist {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    discipline: row.discipline,
    location: row.location,
    tagline: row.tagline ?? "",
    bio: row.bio ?? "",
    instagram: row.instagram ?? "",
    bg: row.bg ?? "bg-acid",
    featured: row.featured ?? false,
    commissions: row.commissions ?? false,
    priceRange: row.price_range ?? "",
    listings: 0,
    orders30d: 0,
    gmv30d: 0,
    avatarUrl: row.avatar_url ?? undefined,
    heroUrl: row.hero_url ?? undefined,
  };
}
