import type { Metadata } from "next";

export const metadata: Metadata = { title: "Orders" };

export default function DashboardOrdersPage() {
  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / ORDERS
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Orders.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Your order history, payouts, and shipping status.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Gross MTD", "$3,200"],
          ["Makeshift Fee", "$160"],
          ["Net Payout", "$2,880"],
          ["Orders", "09"],
        ].map(([label, value]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-2xl">{value}</div>
          </div>
        ))}
      </div>
      <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark2">
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Order</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Item</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Buyer</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Total</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["#0417", "Lime Viper", "P. Lian", "$320", "PAID"],
              ["#0414", "Commission (dep.)", "M. Daws", "$400", "DEPOSIT"],
              ["#0412", "Full Sleeve Book", "R. Halsey", "$680", "DISPUTED"],
              ["#0408", "Orange Heat", "T. Ayres", "$340", "SHIPPED"],
            ].map(([id, item, buyer, total, status]) => (
              <tr key={id} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                <td className="p-4 font-mono text-xs text-midgrey">{id}</td>
                <td className="p-4 font-display font-bold">{item}</td>
                <td className="p-4">{buyer}</td>
                <td className="p-4 font-display font-bold">{total}</td>
                <td className="p-4">
                  <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                    status === "PAID" || status === "SHIPPED" ? "bg-lime/15 text-lime" :
                    status === "DISPUTED" ? "bg-pink/15 text-pink" :
                    "bg-orange/15 text-orange"
                  }`}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  );
}