import ArtistCard from "@/components/ArtistCard";
import { getAllArtists } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage() {
  const artists = await getAllArtists();

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / SEARCH
        </div>
        <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-8">
          Find something.
        </h1>

        <input
          className="w-full max-w-2xl bg-dark1 border border-dark2 rounded-full px-6 py-4 text-white placeholder:text-midgrey focus:border-lime focus:outline-none text-lg mb-10"
          placeholder="Search artists, works, categories..."
        />

        <p className="text-midgrey mb-6">
          Showing all {artists.length} artists. Try searching above to filter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {artists.slice(0, 12).map((a) => (
            <ArtistCard key={a.slug} artist={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
