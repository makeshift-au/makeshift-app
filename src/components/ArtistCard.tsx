import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/data/artists";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artist/${artist.slug}`}
      className="group block bg-dark1 border border-dark2 rounded-2xl overflow-hidden hover:border-lime/40 transition-all hover:-translate-y-1"
    >
      {/* Image / placeholder */}
      <div className={`${artist.bg} h-52 relative overflow-hidden`}>
        {artist.heroUrl && (
          <Image
            src={artist.heroUrl}
            alt={artist.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        {artist.featured && (
          <span className="absolute top-3 left-3 bg-lime text-black font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase z-10">
            Featured
          </span>
        )}
        {artist.commissions && (
          <span className="absolute top-3 right-3 bg-blue/80 text-white font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase z-10">
            Commissions
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">
          {artist.discipline.replace("-", " ")} &middot; {artist.location}
        </div>
        <h3 className="font-display font-bold text-lg tracking-tight group-hover:text-lime transition-colors">
          {artist.name}
        </h3>
        <p className="text-sm text-lightgrey mt-1 line-clamp-2">
          {artist.tagline}
        </p>
        <div className="mt-3 font-mono text-xs text-midgrey tracking-[0.05em]">
          {artist.priceRange}
        </div>
      </div>
    </Link>
  );
}
