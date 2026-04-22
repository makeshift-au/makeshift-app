import type { Metadata } from "next";

export const metadata: Metadata = { title: "Enquiries" };

export default function DashboardEnquiriesPage() {
  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / ENQUIRIES
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Enquiries.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Commission enquiries from buyers. Reply, quote, or decline.
      </p>

      <div className="space-y-4">
        {[
          { name: "Priya L.", brief: "Tiger motif on denim — full back panel", budget: "$400", age: "2h ago", status: "NEW", color: "pink" },
          { name: "Marcus D.", brief: "Birthday gift — matching wallet set", budget: "$200", age: "1d ago", status: "NEW", color: "pink" },
          { name: "Kaz N.", brief: "Brand collab — 10 custom jackets", budget: "$3,500", age: "2d ago", status: "NEW", color: "pink" },
          { name: "Jess M.", brief: "Patch repair on vintage Levis", budget: "$120", age: "4d ago", status: "REPLIED", color: "lime" },
          { name: "Dean S.", brief: "Full sleeve tattoo consultation", budget: "$800", age: "1w ago", status: "DEPOSIT PAID", color: "lime" },
          { name: "Amy G.", brief: "Custom belt — specific buckle request", budget: "$180", age: "2w ago", status: "NO REPLY", color: "midgrey" },
        ].map((enq) => (
          <div key={enq.name} className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-display font-bold">{enq.name}</span>
                <span className="font-mono text-xs text-midgrey ml-2">{enq.age}</span>
              </div>
              <span className={`font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                enq.status === "NEW" ? "bg-pink/15 text-pink" :
                enq.status === "REPLIED" || enq.status === "DEPOSIT PAID" ? "bg-lime/15 text-lime" :
                "bg-dark2 text-midgrey"
              }`}>{enq.status}</span>
            </div>
            <p className="text-lightgrey text-sm mb-2">{enq.brief}</p>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-midgrey">Budget: {enq.budget}</span>
              <button className="border border-dark2 text-white px-4 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">Open</button>
            </div>
          </div>
        ))}
      </div>
    
    </>
  );
}