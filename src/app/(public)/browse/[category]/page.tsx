import ArtistCard from "@/components/ArtistCard";
import {
  getAllArtists,
  getCategories,
  getArtistsByCategory,
  getCategoryBySlug,
} from "@/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  return { title: cat ? `Browse ${cat.label}` : "Browse" };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const [catArtists, allArtists, categories] = await Promise.all([
    getArtistsByCategory(category),
    getAllArtists(),
    getCategories(),
  ]);

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / BROWSE / {cat.label.toUpperCase()}
        </div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,88px)] leading-[0.92] tracking-[-0.03em] mb-4">
          {cat.label}.
        </h1>
        <p className="text-xl text-lightgrey max-w-xl mb-10">
          {catArtists.length} artists in {cat.label} — browse their
          work, commission something custom, or just look.
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/browse"
            className="bg-dark1 border border-dark2 text-lightgrey font-mono text-xs tracking-[0.05em] px-4 py-2 rounded-full hover:border-lime hover:text-lime transition-colors"
          >
            ALL &middot; {allArtists.length}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/browse/${c.slug}`}
              className={`font-mono text-xs tracking-[0.05em] px-4 py-2 rounded-full transition-colors ${
                c.slug === category
                  ? "bg-lime text-black font-bold"
                  : "bg-dark1 border border-dark2 text-lightgrey hover:border-lime hover:text-lime"
              }`}
            >
              {c.label} &middot; {c.count}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {catArtists.map((a) => (
            <ArtistCard key={a.slug} artist={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
