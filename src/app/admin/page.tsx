import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin" };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function AdminOverview() {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [artistsRes, appsRes, ordersRes] = await Promise.all([
    supabase.from("artists").select("id, status, featured", { count: "exact" }),
    supabase.from("applications").select("id, status", { count: "exact" }).eq("status", "new"),
    supabase.from("orders").select("id, amount, platform_fee, status", { count: "exact" }),
  ]);

  const artistCount = artistsRes.count ?? 0;
  const liveArtists = (artistsRes.data ?? []).filter((a: any) => a.status === "live").length;
  const pendingApps = appsRes.count ?? 0;
  const orders = ordersRes.data ?? [];
  const totalGMV = orders.reduce((s, o: any) => s + Number(o.amount), 0);
  const totalFees = orders.reduce((s, o: any) => s + Number(o.platform_fee), 0);
  const disputeCount = orders.filter((o: any) => o.status === "disputed").length;

  // Recent items needing attention
  const { data: recentApps } = await supabase
    .from("applications")
    .select("id, full_name, disciplines, city, state, created_at")
    .eq("status", "new")
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: recentDisputes } = await supabase
    .from("orders")
    .select("id, order_number, amount, artists(name), created_at")
    .eq("status", "disputed")
    .order("created_at", { ascending: false })
    .limit(2);

  const attentionItems = [
    ...(recentApps ?? []).map((a: any) => ({
      id: a.id,
      name: a.full_name,
      type: "NEW APP",
      sub: `${a.disciplines?.[0] ?? "—"} · ${a.city ?? ""}`,
      age: timeAgo(a.created_at),
      link: "/admin/applications",
    })),
    ...(recentDisputes ?? []).map((o: any) => ({
      id: o.id,
      name: `Order #${o.order_number}`,
      type: "DISPUTE",
      sub: `$${Number(o.amount).toFixed(2)} · ${o.artists?.name ?? "—"}`,
      age: timeAgo(o.created_at),
      link: "/admin/orders",
    })),
  ].slice(0, 6);

  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">/ ADMIN / OVERVIEW</div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,46px)] leading-[0.95] tracking-[-0.02em] mb-3">Control room.</h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">Everything that matters, on one screen.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Artists", `${liveArtists} live / ${artistCount} total`],
          ["Pending Apps", String(pendingApps)],
          ["GMV", `$${totalGMV.toFixed(2)}`],
          ["Platform Fees", `$${totalFees.toFixed(2)}`],
        ].map(([label, value]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-2xl leading-none tracking-[-0.02em]">{value}</div>
          </div>
        ))}
      </div>

      {disputeCount > 0 && (
        <div className="bg-pink/10 border border-pink/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="font-mono text-xs text-pink font-bold tracking-[0.1em]">⚠ {disputeCount} DISPUTE{disputeCount > 1 ? "S" : ""}</span>
          <Link href="/admin/orders" className="text-pink text-sm underline ml-auto">View orders →</Link>
        </div>
      )}

      {attentionItems.length > 0 && (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="font-display font-bold text-xl">Needs your attention</h2>
            <Link href="/admin/applications" className="font-mono text-xs text-midgrey tracking-[0.1em] hover:text-lime">VIEW ALL →</Link>
          </div>
          <div className="space-y-3">
            {attentionItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-black transition-colors"
              >
                <div className="w-10 h-10 rounded-lg flex-shrink-0 bg-dark2 flex items-center justify-center font-display font-bold text-xs text-midgrey">
                  {item.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-sm">{item.name}</div>
                  <div className="font-mono text-[10px] text-midgrey">{item.sub}</div>
                </div>
                <span className={`font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                  item.type === "DISPUTE" ? "bg-pink/15 text-pink" : "bg-orange/15 text-orange"
                }`}>{item.type}</span>
                <span className="font-mono text-[10px] text-midgrey">{item.age}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {attentionItems.length === 0 && (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center mb-6">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="font-display font-bold text-xl mb-2">All clear</h3>
          <p className="text-midgrey text-sm">No pending items. Check back later.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/applications" className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
          <div className="font-display font-bold text-lg mb-1">Applications</div>
          <div className="font-mono text-xs text-midgrey">Review new artist applications</div>
        </Link>
        <Link href="/admin/artists" className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
          <div className="font-display font-bold text-lg mb-1">The Roster</div>
          <div className="font-mono text-xs text-midgrey">Manage active artists</div>
        </Link>
        <Link href="/admin/orders" className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
          <div className="font-display font-bold text-lg mb-1">Orders</div>
          <div className="font-mono text-xs text-midgrey">View all transactions</div>
        </Link>
        <Link href="/admin/featured" className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
          <div className="font-display font-bold text-lg mb-1">Featured</div>
          <div className="font-mono text-xs text-midgrey">Manage homepage slots</div>
        </Link>
      </div>
    </>
  );
}
