import type { Metadata } from "next";
import { getCurrentArtist, getMyOrders, getMyListings, getMyEnquiries } from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Analytics" };

export default async function DashboardAnalyticsPage() {
  const artist = await getCurrentArtist();

  if (!artist) {
    return (
      <>
        <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
          / DASHBOARD / ANALYTICS
        </div>
        <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
          Analytics.
        </h1>
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <h3 className="font-display font-bold text-xl mb-2">No artist profile found</h3>
          <p className="text-midgrey text-sm">Log in with your artist account to view analytics.</p>
        </div>
      </>
    );
  }

  const supabase = await createClient();

  // Fetch real data in parallel
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [orders, listings, enquiries, enquiryEvents, clickEvents, dailyEnquiries, dailyClicks] =
    await Promise.all([
      getMyOrders(artist.id),
      getMyListings(artist.id),
      getMyEnquiries(artist.id),
      // This month's enquiry events
      supabase
        .from("usage_events")
        .select("id", { count: "exact", head: true })
        .eq("artist_id", artist.id)
        .eq("event_type", "enquiry")
        .gte("created_at", monthStart),
      // This month's click events
      supabase
        .from("usage_events")
        .select("id", { count: "exact", head: true })
        .eq("artist_id", artist.id)
        .eq("event_type", "music_click")
        .gte("created_at", monthStart),
      // Last 30 days enquiry events (for chart)
      supabase
        .from("usage_events")
        .select("created_at")
        .eq("artist_id", artist.id)
        .eq("event_type", "enquiry")
        .gte("created_at", thirtyDaysAgo)
        .order("created_at"),
      // Last 30 days click events (for chart)
      supabase
        .from("usage_events")
        .select("created_at")
        .eq("artist_id", artist.id)
        .eq("event_type", "music_click")
        .gte("created_at", thirtyDaysAgo)
        .order("created_at"),
    ]);

  const totalEarnings = orders.reduce(
    (s, o: any) => s + Number(o.artist_payout ?? 0),
    0
  );
  const liveListings = listings.filter((l: any) => l.status === "live").length;
  const thisMonthEnquiries = enquiryEvents.count ?? 0;
  const thisMonthClicks = clickEvents.count ?? 0;
  const totalOrders = orders.length;
  const newEnquiries = enquiries.filter(
    (e: any) => e.status === "new" || !e.status
  ).length;

  // Build daily activity for the last 30 days
  const dailyData = buildDailyData(
    dailyEnquiries.data ?? [],
    dailyClicks.data ?? []
  );

  // Estimated usage charges this month
  const enquiryCharges = thisMonthEnquiries * 5;
  const clickCharges = thisMonthClicks * 0.5;

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / ANALYTICS
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Analytics.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        How your page is performing this month.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Earnings", `$${totalEarnings.toFixed(2)}`],
          ["Orders", String(totalOrders).padStart(2, "0")],
          ["Live listings", String(liveListings).padStart(2, "0")],
          ["Open enquiries", String(newEnquiries).padStart(2, "0")],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-dark1 border border-dark2 rounded-2xl p-5"
          >
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">
              {label}
            </div>
            <div className="font-display font-[800] text-2xl leading-none tracking-[-0.02em]">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Usage this month */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">
          Usage this month
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-dark2">
            <div>
              <div className="text-sm font-medium">Enquiries received</div>
              <div className="text-xs text-midgrey">$5.00 each</div>
            </div>
            <div className="text-right">
              <div className="font-display font-bold text-lg">
                {thisMonthEnquiries}
              </div>
              <div className="font-mono text-xs text-midgrey">
                ${enquiryCharges.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-dark2">
            <div>
              <div className="text-sm font-medium">Streaming link clicks</div>
              <div className="text-xs text-midgrey">$0.50 each</div>
            </div>
            <div className="text-right">
              <div className="font-display font-bold text-lg">
                {thisMonthClicks}
              </div>
              <div className="font-mono text-xs text-midgrey">
                ${clickCharges.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-1">
            <div className="text-sm font-medium text-lightgrey">
              Estimated usage charges
            </div>
            <div className="font-display font-bold text-lg text-lime">
              ${(enquiryCharges + clickCharges).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Activity chart - last 30 days */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">
          Activity — last 30 days
        </h2>
        {dailyData.maxVal === 0 ? (
          <div className="text-center py-8">
            <p className="text-midgrey text-sm">
              No activity yet. Enquiries and streaming clicks will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-end gap-[3px] h-36">
              {dailyData.days.map((d, i) => {
                const enquiryH =
                  dailyData.maxVal > 0
                    ? (d.enquiries / dailyData.maxVal) * 100
                    : 0;
                const clickH =
                  dailyData.maxVal > 0
                    ? (d.clicks / dailyData.maxVal) * 100
                    : 0;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col justify-end gap-[1px]"
                    title={`${d.label}: ${d.enquiries} enquiries, ${d.clicks} clicks`}
                  >
                    {d.enquiries > 0 && (
                      <div
                        className="bg-lime rounded-t-sm"
                        style={{ height: `${Math.max(enquiryH, 4)}%` }}
                      />
                    )}
                    {d.clicks > 0 && (
                      <div
                        className="bg-blue rounded-t-sm"
                        style={{ height: `${Math.max(clickH, 4)}%` }}
                      />
                    )}
                    {d.enquiries === 0 && d.clicks === 0 && (
                      <div className="bg-dark2 rounded-t-sm" style={{ height: "2px" }} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between font-mono text-[10px] text-midgrey tracking-[0.1em] mt-2">
              <span>{dailyData.days[0]?.label}</span>
              <span>{dailyData.days[Math.floor(dailyData.days.length / 2)]?.label}</span>
              <span>{dailyData.days[dailyData.days.length - 1]?.label}</span>
            </div>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-lime rounded-sm" />
                <span className="font-mono text-[10px] text-midgrey">Enquiries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue rounded-sm" />
                <span className="font-mono text-[10px] text-midgrey">Streaming clicks</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent enquiries */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">
          Recent enquiries
        </h2>
        {enquiries.length === 0 ? (
          <p className="text-midgrey text-sm text-center py-4">
            No enquiries yet. They&rsquo;ll appear here when buyers reach out.
          </p>
        ) : (
          <div className="space-y-3">
            {enquiries.slice(0, 5).map((enq: any) => (
              <div
                key={enq.id}
                className="flex items-center gap-3 pb-3 border-b border-dark2 last:border-b-0"
              >
                <div className="w-8 h-8 rounded-full bg-dark2 flex items-center justify-center font-display font-bold text-xs text-midgrey flex-shrink-0">
                  {enq.name
                    ?.split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{enq.name}</div>
                  <div className="text-xs text-midgrey truncate">
                    {enq.brief?.slice(0, 60)}
                  </div>
                </div>
                <span
                  className={`font-mono text-[10px] font-bold tracking-[0.1em] px-2 py-0.5 rounded-full ${
                    enq.status === "new" || !enq.status
                      ? "bg-pink/15 text-pink"
                      : enq.status === "replied"
                        ? "bg-lime/15 text-lime"
                        : "bg-dark2 text-midgrey"
                  }`}
                >
                  {(enq.status ?? "new").toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// Helper to bucket events into daily counts for the last 30 days
function buildDailyData(
  enquiryEvents: { created_at: string }[],
  clickEvents: { created_at: string }[]
) {
  const days: { label: string; enquiries: number; clicks: number }[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().slice(0, 10);
    const label = date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
    });

    const enquiries = enquiryEvents.filter(
      (e) => e.created_at.slice(0, 10) === dateStr
    ).length;
    const clicks = clickEvents.filter(
      (e) => e.created_at.slice(0, 10) === dateStr
    ).length;

    days.push({ label, enquiries, clicks });
  }

  const maxVal = Math.max(...days.map((d) => d.enquiries + d.clicks), 1);

  return { days, maxVal };
}
