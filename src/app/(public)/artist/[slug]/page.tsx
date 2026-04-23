import Link from "next/link";
import Image from "next/image";
import { getArtist, getListingsByArtist } from "@/lib/queries";
import { getListingsByArtist as getMockListings } from "@/data/artists";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtist(slug);
  return { title: artist?.name ?? "Artist" };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtist(slug);
  if (!artist) notFound();

  // Try Supabase listings first, fall back to mock
  const dbListings = artist.id ? await getListingsByArtist(artist.id) : [];
  const mockListings = getMockListings(slug);

  // Normalize both into a common shape for rendering
  const listings = dbListings.length > 0
    ? dbListings.map((l: any) => ({
        id: l.slug ?? l.id,
        title: l.title,
        description: l.description ?? "",
        price: l.price,
        imageUrl: l.image_urls?.[0] ?? "",
      }))
    : mockListings.map((l) => ({
        id: l.id,
        title: l.title,
        description: l.description,
        price: l.price,
        imageUrl: l.imageUrl,
      }));

  return (
    <div>
      {/* Hero */}
      <div className={`${artist.bg} h-64 md:h-80 relative overflow-hidden`}>
        {artist.heroUrl && (
          <Image
            src={artist.heroUrl}
            alt={artist.name}
            fill
            className="object-cover object-top"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-xs text-lime tracking-[0.15em] mb-2 uppercase">
              {artist.discipline.replace("-", " ")} &middot; {artist.location}
            </div>
            <h1 className="font-display font-[800] text-[clamp(40px,7vw,72px)] leading-[0.92] tracking-[-0.02em]">
              {artist.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <p className="text-xl text-lightgrey leading-relaxed mb-8">
              {artist.bio}
            </p>

            {/* Works grid */}
            <div className="font-mono text-sm text-lime tracking-[0.1em] mb-3">
              /01 WORKS
            </div>
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                {listings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/work/${listing.id}`}
                    className="group block bg-dark1 border border-dark2 rounded-2xl overflow-hidden hover:border-lime/40 transition-all hover:-translate-y-1"
                  >
                    <div className={`${artist.bg} h-72 relative overflow-hidden`}>
                      {listing.imageUrl && (
                        <Image
                          src={listing.imageUrl}
                          alt={listing.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg group-hover:text-lime transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-lightgrey mt-1 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="mt-3 font-display font-[800] text-xl text-lime">
                        ${listing.price}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {Array.from({ length: Math.min(artist.listings || 6, 6) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`${artist.bg} h-48 rounded-xl`}
                    />
                  ),
                )}
              </div>
            )}

            {artist.commissions && (
              <>
                <div className="font-mono text-sm text-lime tracking-[0.1em] mb-3">
                  /02 COMMISSIONS
                </div>
                <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-8">
                  <h3 className="font-display font-bold text-xl mb-2">
                    Open for commissions
                  </h3>
                  <p className="text-lightgrey mb-4">
                    Price range: {artist.priceRange}. Send an enquiry
                    to discuss your idea.
                  </p>
                  <Link
                    href={`/enquire?artist=${artist.slug}`}
                    className="inline-block bg-lime text-black px-6 py-3 rounded-full font-semibold text-sm hover:-translate-y-0.5 transition-transform"
                  >
                    Start an enquiry &rarr;
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-dark1 border border-dark2 rounded-2xl p-6 sticky top-24">
              <div className={`${artist.bg} w-20 h-20 rounded-full mx-auto mb-4 relative overflow-hidden`}>
                {artist.avatarUrl && (
                  <Image
                    src={artist.avatarUrl}
                    alt={artist.name}
                    fill
                    className="object-cover object-top"
                  />
                )}
              </div>
              <h2 className="font-display font-bold text-xl text-center mb-1">
                {artist.name}
              </h2>
              <p className="text-sm text-midgrey text-center mb-4">
                {artist.tagline}
              </p>
              <div className="space-y-3 text-sm border-t border-dark2 pt-4">
                <div className="flex justify-between">
                  <span className="text-midgrey">Location</span>
                  <span>{artist.location}, VIC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midgrey">Instagram</span>
                  <span className="text-lime">{artist.instagram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midgrey">Listings</span>
                  <span>{artist.listings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midgrey">Price range</span>
                  <span>{artist.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midgrey">Commissions</span>
                  <span className={artist.commissions ? "text-lime" : "text-midgrey"}>
                    {artist.commissions ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
