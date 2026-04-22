import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — The Roster" };

export default function AdminArtistsPage() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / THE ROSTER
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        The Roster.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        All 47 approved artists. Manage, boost, or pause.
      </p>

      <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark2">
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Artist</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Discipline</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">GMV (30d)</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
              <th className="text-right font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Maccs Customs", handle: "@maccscustoms", disc: "Tattoo", gmv: "$3,200", status: "FEATURED", bg: "bg-acid" },
              { name: "Drool Studio", handle: "@droolstudio", disc: "Graphic", gmv: "$2,840", status: "FEATURED", bg: "bg-acid" },
              { name: "Rory Fern", handle: "@roryfernceramics", disc: "Ceramics", gmv: "$2,120", status: "LIVE", bg: "bg-terra" },
              { name: "Nora Veldt", handle: "@noraveldt", disc: "Jewellery", gmv: "$1,890", status: "LIVE", bg: "bg-gold" },
              { name: "Theo Park", handle: "@theopark.studio", disc: "Graphic", gmv: "$1,420", status: "LIVE", bg: "bg-navy" },
              { name: "Kaz Nakamura", handle: "@kaznmk", disc: "Visual Art", gmv: "$1,380", status: "LIVE", bg: "bg-rust" },
            ].map((a) => (
              <tr key={a.name} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                <td className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex-shrink-0 ${a.bg}`} />
                  <div>
                    <div className="font-display font-bold">{a.name}</div>
                    <div className="font-mono text-[10px] text-midgrey">{a.handle}</div>
                  </div>
                </td>
                <td className="p-4">{a.disc}</td>
                <td className="p-4 font-display font-bold">{a.gmv}</td>
                <td className="p-4">
                  <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                    a.status === "FEATURED" ? "bg-blue/15 text-blue" : "bg-lime/15 text-lime"
                  }`}>{a.status}</span>
                </td>
                <td className="p-4 text-right">
                  <button className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">MANAGE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-5 font-mono text-xs text-midgrey tracking-[0.1em]">
        Showing 6 of 47 · Page 1 of 8 · <a href="#" className="text-lime">NEXT →</a>
      </div>
    
    </>
  );
}