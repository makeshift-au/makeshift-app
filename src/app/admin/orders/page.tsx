import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Orders" };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, artists(name), listings(title)")
    .order("created_at", { ascending: false })
    .limit(50);

  const allOrders = orders ?? [];
  const totalGMV = allOrders.reduce((s, o: any) => s + Number(o.amount), 0);
  const totalFees = allOrders.reduce((s, o: any) => s + Number(o.platform_fee), 0);
  const disputes = allOrders.filter((o: any) => o.status === "disputed").length;

  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / ORDERS
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        Orders.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Every transaction across every artist.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Total GMV", `$${totalGMV.toFixed(2)}`],
          ["Orders", String(allOrders.length)],
          ["Platform Fees", `$${totalFees.toFixed(2)}`],
          ["Disputes", String(disputes)],
        ].map(([label, value]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-2xl">{value}</div>
          </div>
        ))}
      </div>

      {allOrders.length === 0 ? (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <h3 className="font-display font-bold text-xl mb-2">No orders yet</h3>
          <p className="text-midgrey text-sm">Orders will appear here once buyers start purchasing.</p>
        </div>
      ) : (
        <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark2">
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Order</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Artist</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Item</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Total</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Fee</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">When</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order: any) => (
                <tr key={order.id} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                  <td className="p-4 font-mono text-xs text-midgrey">#{order.order_number}</td>
                  <td className="p-4 font-display font-bold">{order.artists?.name ?? "—"}</td>
                  <td className="p-4">{order.listings?.title ?? "—"}</td>
                  <td className="p-4 font-display font-bold">${Number(order.amount).toFixed(2)}</td>
                  <td className="p-4 text-midgrey">${Number(order.platform_fee).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase ${
                      order.status === "disputed" || order.status === "refunded" ? "bg-pink/15 text-pink" : "bg-lime/15 text-lime"
                    }`}>{order.status}</span>
                  </td>
                  <td className="p-4 font-mono text-xs text-midgrey">{timeAgo(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
