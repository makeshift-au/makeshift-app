import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin" };

export default function AdminOverview() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">/ ADMIN / OVERVIEW</div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">Control room.</h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">Everything that matters this week, on one screen.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Active Artists", "47 / 50", "+3 this week"],
          ["Pending Apps", "14", "+6 since Mon"],
          ["GMV (Apr)", "$48.2K", "+22% MoM"],
          ["Site Visitors", "12,480", "+38% MoM"],
        ].map(([label, value, change]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-3xl leading-none tracking-[-0.02em] mb-1">{value}</div>
            <div className="font-mono text-[11px] text-green">{change}</div>
          </div>
        ))}
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="font-display font-bold text-xl">Needs your attention</h2>
          <Link href="/admin/applications" className="font-mono text-xs text-midgrey tracking-[0.1em] hover:text-lime">VIEW ALL →</Link>
        </div>
        <div className="space-y-3">
          {[
            { name: "Serra Ng", type: "NEW APP", sub: "Ceramics · Coburg", age: "2h ago", bg: "bg-rust" },
            { name: "Ivy Reaper", type: "NEW APP", sub: "Tattoo · Fitzroy", age: "5h ago", bg: "bg-acid" },
            { name: "Order #0412", type: "DISPUTE", sub: "$680 · Maccs Customs", age: "1d ago", bg: "bg-navy" },
            { name: "Nora Veldt", type: "NEW APP", sub: "Jewellery · Collingwood", age: "1d ago", bg: "bg-gold" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-black transition-colors">
              <div className={`w-10 h-10 rounded-lg flex-shrink-0 ${item.bg}`} />
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm">{item.name}</div>
                <div className="font-mono text-[10px] text-midgrey">{item.sub}</div>
              </div>
              <span className={`font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                item.type === "DISPUTE" ? "bg-pink/15 text-pink" : "bg-orange/15 text-orange"
              }`}>{item.type}</span>
              <span className="font-mono text-[10px] text-midgrey">{item.age}</span>
              <button className="bg-lime text-black font-mono text-[11px] font-bold px-3 py-1.5 rounded-full tracking-[0.05em]">REVIEW</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}