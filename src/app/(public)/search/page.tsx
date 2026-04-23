import SearchView from "@/components/SearchView";
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
        <SearchView artists={artists} />
      </div>
    </div>
  );
}
