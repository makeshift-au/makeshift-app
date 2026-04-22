import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analytics" };

export default function DashboardAnalyticsPage() {
  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / ANALYTICS
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Analytics.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        How your page is performing — views, sources, top works.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Page Views", "4,280", "+18%"],
          ["Unique Visitors", "2,940", "+22%"],
          ["Conversion", "2.10%", "+0.3pp"],
          ["Avg. Order", "$356", "+$40"],
        ].map(([label, value, change]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-2xl mb-1">{value}</div>
            <div className="font-mono text-[11px] text-green">{change}</div>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Page views — last 30 days</h2>
        <div className="flex items-end gap-[3px] h-44">
          {[45,52,48,58,65,72,68,78,85,82,92,88,95,110,105,120,115,130,128,142,148,155,162,170,185,192,210,240,320,380].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-lime/80 to-lime rounded-t-sm hover:from-white hover:to-white transition-colors" style={{ height: `${(h / 380) * 100}%` }} />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[10px] text-midgrey tracking-[0.1em] mt-2">
          <span>18 MAR</span><span>25 MAR</span><span>01 APR</span><span>08 APR</span><span>16 APR</span>
        </div>
      </div>
    
    </>
  );
}