import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analytics" };

export default function DashboardAnalyticsPage() {
  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / ANALYTICS
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Analytics.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        How your page is performing — views, sources, top works.
      </p>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-dark2 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-midgrey">
            <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 16l4-8 4 4 6-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-xl mb-2">Coming soon</h3>
        <p className="text-midgrey text-sm max-w-sm mx-auto">
          Page views, visitor stats, and conversion tracking are on the way.
          We&rsquo;ll notify you when analytics go live.
        </p>
      </div>
    </>
  );
}
