import type { Metadata } from "next";

export const metadata: Metadata = { title: "Listings" };

export default function DashboardListingsPage() {
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
        <p className="text-midgrey">12 listings · 2 sold · 1 draft</p>
        <button className="bg-lime text-black px-5 py-2.5 rounded-full font-semibold text-sm">+ New listing</button>
      </div>
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
            {[
              ["Lime Viper", "$320", "LIVE"],
              ["Orange Heat", "$340", "LIVE"],
              ["Black Ops", "$380", "SOLD"],
              ["Custom Tier 1", "from $280", "LIVE"],
              ["Custom Tier 2", "from $420", "LIVE"],
              ["Draft #6", "—", "DRAFT"],
            ].map(([name, price, status]) => (
              <tr key={name} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-acid rounded-lg flex-shrink-0" />
                  <span className="font-display font-bold">{name}</span>
                </td>
                <td className="p-4">{price}</td>
                <td className="p-4">
                  <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase ${
                    status === "LIVE" ? "bg-lime/15 text-lime" :
                    status === "SOLD" ? "bg-pink/15 text-pink" :
                    "bg-dark2 text-midgrey"
                  }`}>{status}</span>
                </td>
                <td className="p-4 text-right">
                  <button className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  );
}