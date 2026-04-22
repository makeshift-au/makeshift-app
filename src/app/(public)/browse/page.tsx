import ArtistCard from "@/components/ArtistCard";
import { getAllArtists, getCategories } from "@/lib/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Artists",
};

export default async function BrowsePage() {
  const [artists, categories] = await Promise.all([
    getAllArtists(),
    getCategories(),
  ]);

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / BROWSE / ALL ARTISTS
        </div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,88px)] leading-[0.92] tracking-[-0.03em] mb-4">
          The roster.
        </h1>
        <p className="text-xl text-lightgrey max-w-xl mb-10">
          Every artist on Makeshift, all {artists.length} of them.
          Hand-approved, making original work, shipping from Australia.
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="bg-lime text-black font-mono text-xs font-bold tracking-[0.1em] px-4 py-2 rounded-full">
            ALL &middot; {artists.length}
          </span>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/browse/${cat.slug}`}
              className="bg-dark1 border border-dark2 text-lightgrey font-mono text-xs tracking-[0.05em] px-4 py-2 rounded-full hover:border-lime hover:text-lime transition-colors"
            >
              {cat.label} &middot; {cat.count}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {artists.map((a) => (
            <ArtistCard key={a.slug} artist={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
