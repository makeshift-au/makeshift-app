import Link from "next/link";
import Marquee from "@/components/Marquee";
import ArtistCard from "@/components/ArtistCard";
import { getFeaturedArtists, getCategories, getAllArtists } from "@/lib/queries";

export default async function HomePage() {
  const [featured, categories, artists] = await Promise.all([
    getFeaturedArtists(),
    getCategories(),
    getAllArtists(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-20 pb-24 border-b border-dark2">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(200,255,0,0.03)_0_2px,transparent_2px_40px)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-4">
            / CURATED MARKETPLACE
          </div>
          <h1 className="font-display font-[800] text-[clamp(56px,10vw,120px)] leading-[0.9] tracking-[-0.03em] mb-6">
            Discover
            <br />
            independent
            <br />
            <span className="bg-lime text-black px-3">Australian</span>
            <br />
            artists.
          </h1>
          <p className="text-xl text-lightgrey max-w-xl mb-8">
            A curated online marketplace for independent Australian artists and
            creators. Hand-selected, Melbourne-based, community-led.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/browse"
              className="bg-lime text-black px-7 py-3.5 rounded-full font-semibold text-sm hover:-translate-y-0.5 transition-transform"
            >
              Browse artists &rarr;
            </Link>
            <Link
              href="/for-creators"
              className="border border-dark2 text-white px-7 py-3.5 rounded-full text-sm hover:border-lime hover:text-lime transition-colors"
            >
              I&rsquo;m an artist
            </Link>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Featured Artists */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            /01
          </div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display font-bold text-3xl">
              Featured artists
            </h2>
            <div className="flex-1 h-px bg-dark2" />
            <Link
              href="/browse"
              className="font-mono text-xs text-midgrey tracking-[0.1em] hover:text-lime transition-colors"
            >
              VIEW ALL &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((a) => (
              <ArtistCard key={a.slug} artist={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 md:px-12 py-16 border-t border-dark2">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            /02
          </div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display font-bold text-3xl">
              Browse by discipline
            </h2>
            <div className="flex-1 h-px bg-dark2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/browse/${cat.slug}`}
                className={`${cat.bg} rounded-2xl p-6 h-40 flex flex-col justify-end hover:-translate-y-1 transition-transform group relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="font-display font-bold text-xl group-hover:text-lime transition-colors">
                    {cat.label}
                  </div>
                  <div className="font-mono text-xs text-white/70 tracking-[0.1em]">
                    {cat.count} ARTISTS
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-dark2 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            [String(artists.length), "Approved artists"],
            ["383", "Original works"],
            ["$48K+", "GMV this month"],
            ["10%", "Only fee. Ever."],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-display font-[800] text-4xl text-lime mb-1">
                {num}
              </div>
              <div className="font-mono text-xs text-midgrey tracking-[0.1em] uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-4">
            / JOIN THE COMMUNITY
          </div>
          <h2 className="font-display font-[800] text-[clamp(36px,6vw,64px)] leading-[0.92] tracking-[-0.02em] mb-5">
            Make something.
            <br />
            Sell something.
          </h2>
          <p className="text-lg text-lightgrey mb-8 max-w-xl mx-auto">
            Founding Artist Plan: 5% fee for the first 12 months. 3 spots left
            out of 50.
          </p>
          <Link
            href="/join"
            className="inline-block bg-lime text-black px-8 py-4 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Apply to sell &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
