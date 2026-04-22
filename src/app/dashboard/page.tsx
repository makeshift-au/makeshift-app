import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardHome() {
  return (
    <>
      <div className="font-mono text-xs text-midgrey tracking-[0.1em] mb-2">
        MAKESHIFT · DASHBOARD
      </div>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / HOME
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        G&rsquo;day, Maccs. 👋
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Here&rsquo;s what&rsquo;s happening with your page this month.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Page Views", "4,280", "+18%"],
          ["Open Enquiries", "06", "+2 new"],
          ["Orders MTD", "09", "+$3,200"],
          ["Page Score", "92/100", "Great"],
        ].map(([label, value, change]) => (
          <div
            key={label}
            className="bg-dark1 border border-dark2 rounded-2xl p-5"
          >
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">
              {label}
            </div>
            <div className="font-display font-[800] text-3xl leading-none tracking-[-0.02em] mb-1">
              {value}
            </div>
            <div className="font-mono text-[11px] text-green tracking-[0.05em]">
              {change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Recent activity</h2>
        <div className="space-y-4">
          {[
            ["New enquiry from Priya L.", "Tiger motif commission — $400 budget", "2h ago", "lime"],
            ["Order #0417 confirmed", "Lime Viper · $320 · Paid via Stripe", "5h ago", "lime"],
            ["New enquiry from Marcus D.", "Birthday gift — $200 budget", "1d ago", "blue"],
            ["Listing updated", "Orange Heat — price changed to $340", "2d ago", "midgrey"],
          ].map(([title, sub, time, color]) => (
            <div key={title} className="flex gap-3 items-start pb-4 border-b border-dark2 last:border-b-0">
              <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-${color}`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xs text-midgrey">{sub}</div>
              </div>
              <span className="font-mono text-[11px] text-midgrey">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}