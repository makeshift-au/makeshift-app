import Link from "next/link";
import Image from "next/image";
import { getListing, artists } from "@/data/artists";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  return { title: listing?.title ?? "Work" };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListing(slug);

  if (!listing) notFound();

  const artist = artists.find((a) => a.slug === listing.artistSlug);

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className={`${artist?.bg ?? "bg-acid"} rounded-2xl h-[500px] relative overflow-hidden`}>
          {listing.imageUrl && (
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Details */}
        <div>
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
            / WORK
          </div>
          <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-2">
            {listing.title}
          </h1>
          <p className="font-mono text-sm text-midgrey tracking-[0.05em] mb-6">
            BY {artist?.name.toUpperCase() ?? "UNKNOWN"} &middot; HAND-PAINTED SHIRT
          </p>

          <div className="font-display font-[800] text-4xl text-lime mb-6">
            ${listing.price}
          </div>

          <p className="text-lightgrey leading-relaxed mb-8">
            {listing.description}
          </p>

          <div className="space-y-3 mb-8 text-sm">
            {[
              ["Material", listing.material],
              ["Size", listing.dimensions],
              ["Condition", "New — handmade to order"],
              ["Lead time", listing.leadTime],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-dark2 pb-3">
                <span className="text-midgrey">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              href="/checkout"
              className="flex-1 bg-lime text-black py-4 rounded-full font-semibold text-center hover:-translate-y-0.5 transition-transform"
            >
              Buy now &rarr;
            </Link>
            <Link
              href={`/enquire?artist=${listing.artistSlug}`}
              className="flex-1 border border-dark2 text-white py-4 rounded-full text-center hover:border-lime hover:text-lime transition-colors"
            >
              Enquire
            </Link>
          </div>

          <p className="font-mono text-xs text-midgrey tracking-[0.05em] mt-4 text-center">
            FREE SHIPPING AUS-WIDE &middot; 10% TO MAKESHIFT
          </p>
        </div>
      </div>
    </div>
  );
}
