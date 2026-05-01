import { getCurrentArtist } from "@/lib/dashboard";
import ListingEditor from "@/components/ListingEditor";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Listing" };

export default async function NewListingPage() {
  const artist = await getCurrentArtist();

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / LISTINGS / NEW
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        New Listing.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Add a new piece of work to your store.
      </p>

      {artist ? (
        <>
          <Link
            href="/dashboard/listings"
            className="inline-block font-mono text-xs text-midgrey hover:text-lime tracking-[0.1em] mb-6 transition-colors"
          >
            &larr; Back to listings
          </Link>
          <ListingEditor artistId={artist.id} />
        </>
      ) : (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <h3 className="font-display font-bold text-xl mb-2">No artist profile found</h3>
          <p className="text-midgrey text-sm">
            Please log in with your artist account to create listings.
          </p>
        </div>
      )}
    </>
  );
}
