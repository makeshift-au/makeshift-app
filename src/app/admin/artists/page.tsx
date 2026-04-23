import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — The Roster" };

export default async function AdminArtistsPage() {
  const supabase = await createClient();

  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("name");

  const allArtists = artists ?? [];
  const liveCount = allArtists.filter((a: any) => a.status === "live").length;
  const featuredCount = allArtists.filter((a: any) => a.featured).length;

  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / THE ROSTER
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        The Roster.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        {allArtists.length > 0
          ? `${allArtists.length} artists total · ${liveCount} live · ${featuredCount} featured`
          : "Manage all approved artists. Boost, pause, or edit."}
      </p>

      {allArtists.length === 0 ? (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <h3 className="font-display font-bold text-xl mb-2">No artists yet</h3>
          <p className="text-midgrey text-sm">
            Approve applications to add artists to the roster.
          </p>
        </div>
      ) : (
        <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark2">
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Artist</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Discipline</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Location</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Fee</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
                <th className="text-right font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {allArtists.map((a: any) => (
                <tr key={a.id} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex-shrink-0 ${a.bg ?? "bg-acid"}`} />
                      <div>
                        <div className="font-display font-bold">{a.name}</div>
                        <div className="font-mono text-[10px] text-midgrey">
                          {a.instagram || `/artist/${a.slug}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize">{a.discipline?.replace("-", " ")}</td>
                  <td className="p-4">{a.location}</td>
                  <td className="p-4 font-mono text-xs">{a.fee_rate}%</td>
                  <td className="p-4">
                    <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase ${
                      a.status === "live" && a.featured ? "bg-blue/15 text-blue" :
                      a.status === "live" ? "bg-lime/15 text-lime" :
                      a.status === "onboarding" ? "bg-orange/15 text-orange" :
                      a.status === "paused" ? "bg-dark2 text-midgrey" :
                      "bg-pink/15 text-pink"
                    }`}>
                      {a.featured ? "FEATURED" : a.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/artist/${a.slug}`}
                      className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors"
                    >
                      VIEW
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
