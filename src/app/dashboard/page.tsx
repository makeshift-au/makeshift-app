import { getCurrentArtist, getMyOrders, getMyListings, getMyEnquiries } from "@/lib/dashboard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function DashboardHome() {
  const artist = await getCurrentArtist();
  const artistName = artist?.name?.split(" ")[0] ?? "Creator";

  const [orders, listings, enquiries] = artist
    ? await Promise.all([
        getMyOrders(artist.id),
        getMyListings(artist.id),
        getMyEnquiries(artist.id),
      ])
    : [[], [], []];

  const totalEarnings = orders.reduce((s, o: any) => s + Number(o.artist_payout ?? 0), 0);
  const liveListings = listings.filter((l: any) => l.status === "live").length;
  const newEnquiries = enquiries.filter((e: any) => e.status === "new" || !e.status).length;

  // Build activity feed from recent orders + enquiries
  const activity = [
    ...orders.slice(0, 5).map((o: any) => ({
      title: `Order #${o.order_number}`,
      sub: `${o.listings?.title ?? "Item"} · $${Number(o.amount).toFixed(2)} · ${o.status}`,
      time: o.created_at,
      color: "lime",
    })),
    ...enquiries.slice(0, 5).map((e: any) => ({
      title: `Enquiry from ${e.name}`,
      sub: e.brief?.slice(0, 60) + (e.brief?.length > 60 ? "..." : ""),
      time: e.created_at,
      color: "blue",
    })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 6);

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / HOME
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        G&rsquo;day, {artistName}.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Here&rsquo;s what&rsquo;s happening with your page.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Earnings", `$${totalEarnings.toFixed(2)}`],
          ["Orders", String(orders.length).padStart(2, "0")],
          ["Live Listings", String(liveListings).padStart(2, "0")],
          ["Open Enquiries", String(newEnquiries).padStart(2, "0")],
        ].map(([label, value]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">
              {label}
            </div>
            <div className="font-display font-[800] text-3xl leading-none tracking-[-0.02em]">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Recent activity</h2>
        {activity.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-midgrey text-sm">No activity yet. Orders and enquiries will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="flex gap-3 items-start pb-4 border-b border-dark2 last:border-b-0">
                <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.color === "lime" ? "bg-lime" : "bg-blue"}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-midgrey">{item.sub}</div>
                </div>
                <span className="font-mono text-[11px] text-midgrey">{timeAgo(item.time)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/dashboard/listings" className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
          <div className="font-display font-bold text-lg mb-1">Listings</div>
          <div className="font-mono text-xs text-midgrey">Manage your work</div>
        </Link>
        <Link href="/dashboard/enquiries" className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
          <div className="font-display font-bold text-lg mb-1">Enquiries</div>
          <div className="font-mono text-xs text-midgrey">{newEnquiries > 0 ? `${newEnquiries} new` : "View all"}</div>
        </Link>
      </div>
    </>
  );
}
