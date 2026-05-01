import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Analytics" };

export default function AdminAnalyticsPage() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / ANALYTICS
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,46px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Analytics.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Site-wide metrics — GMV, traffic, categories, top artists.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["30-day GMV", "$48,240", "+22% MoM"],
          ["Visitors", "12,480", "+38% MoM"],
          ["Conversion", "1.34%", "+0.18 pp"],
          ["Avg Order", "$287", "+$22"],
        ].map(([label, value, change]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-2xl mb-1">{value}</div>
            <div className="font-mono text-[11px] text-green">{change}</div>
          </div>
        ))}
      </div>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Daily GMV — last 30 days</h2>
        <div className="flex items-end gap-[3px] h-44">
          {[25,32,28,38,42,48,55,50,62,58,65,72,68,78,85,82,92,88,95,100,105,98,112,118,124,130,128,140,152,168].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-pink/80 to-pink rounded-t-sm hover:from-lime hover:to-lime transition-colors" style={{ height: `${(h / 168) * 100}%` }} />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[10px] text-midgrey tracking-[0.1em] mt-2">
          <span>18 MAR</span><span>25 MAR</span><span>01 APR</span><span>08 APR</span><span>16 APR</span>
        </div>
      </div>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">Top artists (30d)</h2>
        <div className="space-y-3">
          {[
            ["/01", "Maccs Customs", "Tattoo", "$3,200"],
            ["/02", "Drool Studio", "Graphic", "$2,840"],
            ["/03", "Rory Fern", "Ceramics", "$2,120"],
            ["/04", "Nora Veldt", "Jewellery", "$1,890"],
            ["/05", "Theo Park", "Graphic", "$1,420"],
          ].map(([rank, name, cat, gmv]) => (
            <div key={rank} className="flex items-center gap-4 pb-3 border-b border-dark2 last:border-b-0">
              <span className="font-mono text-xs text-midgrey w-8">{rank}</span>
              <span className="font-display font-bold flex-1">{name}</span>
              <span className="text-sm text-midgrey">{cat}</span>
              <span className="font-display font-bold text-lime">{gmv}</span>
            </div>
          ))}
        </div>
      </div>
    
    </>
  );
}