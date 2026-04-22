import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Featured" };

export default function AdminFeaturedPage() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / FEATURED
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        Featured.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Homepage featured slots — 12 per week, rotated weekly.
      </p>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-display font-bold text-xl">Homepage Hero — Week 16</h2>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">GOES LIVE MON 20 APR · 12 SLOTS</div>
          </div>
          <button className="bg-lime text-black px-5 py-2.5 rounded-full font-semibold text-sm">+ Add artist</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Maccs Customs", "Drool Studio", "Theo Park", "Kaz Nakamura", "Rory Fern", "Nora Veldt", "Juno Reese", "Ivy Reaper", "Rue Hallows", "Serra Ng", "Darya Kowal", "Aleks Porter"].map((name, i) => {
            const bgs = ["bg-acid", "bg-rust", "bg-navy", "bg-gold", "bg-terra", "bg-mint", "bg-char", "bg-blush"];
            return (
              <div key={name} className={`${bgs[i % bgs.length]} rounded-xl p-3 min-h-[130px] flex flex-col justify-end relative`}>
                <button className="absolute top-2 right-2 bg-black text-pink w-6 h-6 rounded-full flex items-center justify-center font-mono text-sm">&times;</button>
                <div className="bg-black p-2.5 rounded-lg">
                  <div className="font-display font-bold text-xs">{name}</div>
                  <div className="font-mono text-[9px] text-pink tracking-[0.1em]">/{String(i + 1).padStart(2, "0")}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    
    </>
  );
}