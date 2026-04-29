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

      {/* Brand Ethos — Dual Meaning */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-dark2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,255,0,0.04)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left — Makeshift */}
            <div>
              <div className="font-mono text-xs text-lime tracking-[0.15em] mb-4">
                / MAKESHIFT
              </div>
              <h2 className="font-display font-[800] text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em] mb-4">
                Makeshift.
              </h2>
              <p className="text-lg text-lightgrey leading-relaxed">
                Handmade. Resourceful. Built from scratch. Not mass-produced.
                Not algorithmic. Real things made by real people.
              </p>
            </div>
            {/* Right — Make Shift */}
            <div>
              <div className="font-mono text-xs text-lime tracking-[0.15em] mb-4">
                / MAKE SHIFT
              </div>
              <h2 className="font-display font-[800] text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em] mb-4">
                Make Shift.
              </h2>
              <p className="text-lg text-lightgrey leading-relaxed">
                Make a difference. Shift the culture. Go against big business,
                fast fashion, and algorithm-driven platforms.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-dark2">
            <p className="font-display font-bold text-xl md:text-2xl text-white/90 text-center">
              It&rsquo;s not just a name. It&rsquo;s a statement about what we
              believe in.
            </p>
          </div>
        </div>
      </section>

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
            {/* Maccs Customs — the only real artist card */}
            {featured.filter((a) => a.slug === "maccs-customs").map((a) => (
              <ArtistCard key={a.slug} artist={a} />
            ))}
            {/* Fill remaining spots with "Your Art Here" placeholders */}
            {Array.from({ length: 7 }).map((_, i) => (
              <Link
                key={`coming-${i}`}
                href="/for-creators"
                className={`bg-dark1 border border-dark2 rounded-2xl overflow-hidden flex flex-col hover:border-lime/40 hover:-translate-y-0.5 transition-all group${i >= 5 ? " hidden lg:flex" : ""}`}
              >
                <div className="aspect-[4/3] bg-dark2 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="font-mono text-xs text-lime tracking-[0.1em] mb-1">
                      SPOT OPEN
                    </div>
                    <div className="font-display font-bold text-lg text-white/60 group-hover:text-lime transition-colors">
                      Your art here
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-1">
                    APPLY NOW
                  </div>
                  <div className="font-display font-bold text-sm text-white/40">
                    Founding Artist
                  </div>
                  <div className="text-xs text-midgrey mt-1 line-clamp-2">
                    Free subscription for 6 months
                  </div>
                </div>
              </Link>
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
