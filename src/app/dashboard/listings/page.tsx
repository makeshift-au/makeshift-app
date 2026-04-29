import { getCurrentArtist, getMyListings } from "@/lib/dashboard";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Listings" };

export default async function DashboardListingsPage() {
  const artist = await getCurrentArtist();
  const listings = artist ? await getMyListings(artist.id) : [];

  const liveCount = listings.filter((l: any) => l.status === "live").length;
  const soldCount = listings.filter((l: any) => l.status === "sold").length;
  const draftCount = listings.filter((l: any) => l.status === "draft").length;

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / LISTINGS
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Listings.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        All your listed work. Edit, pause, or add new listings.
      </p>

      <div className="flex justify-between items-center mb-6">
        <p className="text-midgrey">
          {listings.length} listing{listings.length !== 1 ? "s" : ""}
          {soldCount > 0 && ` · ${soldCount} sold`}
          {draftCount > 0 && ` · ${draftCount} draft`}
        </p>
        <Link
          href="/dashboard/listings/new"
          className="bg-lime text-black px-5 py-2.5 rounded-full font-semibold text-sm"
        >
          + New listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="font-display font-bold text-xl mb-2">No listings yet</h3>
          <p className="text-midgrey text-sm max-w-sm mx-auto">
            Add your first listing to start selling on Makeshift.
            Each listing is a single piece or commission type.
          </p>
        </div>
      ) : (
        <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark2">
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Work</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Price</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
                <th className="text-right font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing: any) => (
                <tr key={listing.id} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                  <td className="p-4 flex items-center gap-3">
                    {listing.image_urls?.[0] ? (
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden relative">
                        <Image
                          src={listing.image_urls[0]}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-dark2 rounded-lg flex-shrink-0" />
                    )}
                    <span className="font-display font-bold">{listing.title}</span>
                  </td>
                  <td className="p-4">
                    {listing.price_type === "from" ? "from " : ""}${listing.price}
                  </td>
                  <td className="p-4">
                    <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase ${
                      listing.status === "live" ? "bg-lime/15 text-lime" :
                      listing.status === "sold" ? "bg-pink/15 text-pink" :
                      listing.status === "paused" ? "bg-orange/15 text-orange" :
                      "bg-dark2 text-midgrey"
                    }`}>{listing.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/dashboard/listings/${listing.id}`}
                      className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
