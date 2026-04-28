import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import ArtistCard from "@/components/ArtistCard";
import { getFeaturedArtists, getCategories } from "@/lib/queries";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedArtists(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-28 pb-24 border-b border-dark2">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(200,255,0,0.03)_0_2px,transparent_2px_40px)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-4">
            / CURATED MARKETPLACE
          </div>
          <h1 className="font-display font-[800] text-[clamp(28px,7.5vw,120px)] leading-[1.0] tracking-[-0.03em] mb-6">
            Discover
            <br />
            independent
            <br />
            <span className="bg-lime text-black px-2 sm:px-3 inline-block max-w-full">Australian</span>
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
                className="rounded-2xl h-40 flex flex-col justify-end hover:-translate-y-1 transition-transform group relative overflow-hidden"
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className={`absolute inset-0 ${cat.bg}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 p-6">
                  <div className="font-display font-bold text-xl text-white group-hover:text-lime transition-colors">
                    {cat.label}
                  </div>
                  <div className="font-mono text-xs text-white/70 tracking-[0.1em]">
                    {cat.count} {cat.count === 1 ? "ARTIST" : "ARTISTS"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
            Founding Artist Plan: free subscription for 6 months. 10%
            commission on sales. No lock-in.
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
