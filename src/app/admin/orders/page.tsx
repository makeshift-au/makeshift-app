import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Orders" };

export default function AdminOrdersPage() {
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
          ["Apr GMV", "$48,240", "+22%"],
          ["Apr Orders", "168", "+18%"],
          ["Platform Fee", "$4,824", "+22%"],
          ["Disputes", "3", "+2"],
        ].map(([label, value, change]) => (
          <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase mb-2">{label}</div>
            <div className="font-display font-[800] text-2xl mb-1">{value}</div>
            <div className={`font-mono text-[11px] ${label === "Disputes" ? "text-pink" : "text-green"}`}>{change}</div>
          </div>
        ))}
      </div>
      <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-dark2">
            <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Order</th>
            <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Artist</th>
            <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Total</th>
            <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Fee</th>
            <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
          </tr></thead>
          <tbody>
            {[
              ["#0417", "Maccs Customs", "$320", "$32", "PAID"],
              ["#0416", "Rory Fern", "$180", "$18", "SHIPPED"],
              ["#0415", "Serra Ng", "$240", "$24", "PAID"],
              ["#0412", "Maccs Customs", "$680", "$68", "DISPUTED"],
              ["#0409", "Rory Fern", "$85", "$8.50", "REFUNDED"],
            ].map(([id, artist, total, fee, status]) => (
              <tr key={id} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                <td className="p-4 font-mono text-xs text-midgrey">{id}</td>
                <td className="p-4 font-display font-bold">{artist}</td>
                <td className="p-4 font-display font-bold">{total}</td>
                <td className="p-4 text-midgrey">{fee}</td>
                <td className="p-4"><span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                  status === "DISPUTED" ? "bg-pink/15 text-pink" :
                  status === "REFUNDED" ? "bg-pink/15 text-pink" :
                  "bg-lime/15 text-lime"
                }`}>{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  );
}