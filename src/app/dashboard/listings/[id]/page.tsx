import { getCurrentArtist } from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";
import ListingEditor from "@/components/ListingEditor";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Listing" };

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = await getCurrentArtist();

  if (!artist) {
    return (
      <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
        <h3 className="font-display font-bold text-xl mb-2">No artist profile found</h3>
        <p className="text-midgrey text-sm">
          Please log in with your artist account to edit listings.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (!listing || listing.artist_id !== artist.id) {
    notFound();
  }

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / LISTINGS / EDIT
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Edit Listing.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Update your listing details, images, and status.
      </p>

      <Link
        href="/dashboard/listings"
        className="inline-block font-mono text-xs text-midgrey hover:text-lime tracking-[0.1em] mb-6 transition-colors"
      >
        &larr; Back to listings
      </Link>

      <ListingEditor
        listing={{
          id: listing.id,
          title: listing.title ?? "",
          description: listing.description ?? "",
          price: listing.price ?? 0,
          price_type: listing.price_type ?? "fixed",
          status: listing.status ?? "draft",
          image_urls: listing.image_urls ?? [],
          slug: listing.slug ?? "",
        }}
        artistId={artist.id}
      />
    </>
  );
}
