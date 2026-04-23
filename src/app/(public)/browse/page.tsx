import CategoryCarousel from "@/components/CategoryCarousel";
import { getCategories, getArtistsByCategory } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Artists",
};

export default async function BrowsePage() {
  const categories = await getCategories();

  // Fetch artists for each category in parallel
  const categoryArtists = await Promise.all(
    categories.map(async (cat) => ({
      ...cat,
      artists: await getArtistsByCategory(cat.slug),
    })),
  );

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / BROWSE
        </div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,88px)] leading-[0.92] tracking-[-0.03em] mb-4">
          The roster.
        </h1>
        <p className="text-xl text-lightgrey max-w-xl mb-14">
          Every artist on Makeshift, sorted by discipline.
          Hand-approved, making original work, shipping from Australia.
        </p>

        {/* Category carousels */}
        <div className="flex flex-col gap-14">
          {categoryArtists.map((cat) => (
            <CategoryCarousel
              key={cat.slug}
              slug={cat.slug}
              label={cat.label}
              bg={cat.bg}
              artists={cat.artists}
              count={cat.count}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
