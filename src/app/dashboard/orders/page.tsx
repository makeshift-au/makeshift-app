import { getCurrentArtist, getMyOrders } from "@/lib/dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Orders" };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function DashboardOrdersPage() {
  const artist = await getCurrentArtist();
  const orders = artist ? await getMyOrders(artist.id) : [];

  const totalGross = orders.reduce((s: number, o: any) => s + Number(o.amount), 0);
  const totalFees = orders.reduce((s: number, o: any) => s + Number(o.platform_fee), 0);
  const totalPayout = orders.reduce((s: number, o: any) => s + Number(o.artist_payout), 0);

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / ORDERS
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Orders.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Your order history, payouts, and shipping status.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Gross Total", `$${totalGross.toFixed(2)}`],
          ["Makeshift Fee", `$${totalFees.toFixed(2)}`],
          ["Net Payout", `$${totalPayout.toFixed(2)}`],
          ["Orders", String(orders.length).padStart(2, "0")],
        ].map(([label, value]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-2xl">{value}</div>
          </div>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="font-display font-bold text-xl mb-2">No orders yet</h3>
          <p className="text-midgrey text-sm max-w-sm mx-auto">
            When buyers purchase your work, orders will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark2">
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Order</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Item</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Buyer</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Total</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">When</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                  <td className="p-4 font-mono text-xs text-midgrey">#{order.order_number}</td>
                  <td className="p-4 font-display font-bold">{order.listings?.title ?? "—"}</td>
                  <td className="p-4">{order.buyer_name || order.buyer_email}</td>
                  <td className="p-4 font-display font-bold">${Number(order.amount).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase ${
                      order.status === "paid" || order.status === "shipped" || order.status === "delivered" ? "bg-lime/15 text-lime" :
                      order.status === "disputed" || order.status === "refunded" ? "bg-pink/15 text-pink" :
                      "bg-orange/15 text-orange"
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
