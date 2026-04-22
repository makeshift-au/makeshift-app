import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Applications" };

export default function AdminApplicationsPage() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / APPLICATIONS
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        Applications.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Every artist who wants in. Review, approve, or reject with a note.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {["All · 14", "New · 6", "In Review · 5", "Approved · 2", "Rejected · 1"].map((f, i) => (
          <button key={f} className={`font-mono text-xs tracking-[0.05em] px-4 py-2 rounded-full transition-colors ${
            i === 0 ? "bg-lime text-black font-bold" : "bg-dark1 border border-dark2 text-lightgrey hover:border-lime hover:text-lime"
          }`}>{f}</button>
        ))}
        <input className="flex-1 min-w-[200px] bg-dark1 border border-dark2 rounded-full px-4 py-2 text-sm text-white focus:border-lime focus:outline-none" placeholder="Search by name or city..." />
      </div>
      <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark2">
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Applicant</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Discipline</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Applied</th>
              <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Status</th>
              <th className="text-right font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Serra Ng", email: "serra.ng@gmail.com", disc: "Ceramics", age: "2h ago", status: "NEW", bg: "bg-rust" },
              { name: "Ivy Reaper", email: "ivy@inkandbone.au", disc: "Tattoo", age: "5h ago", status: "NEW", bg: "bg-acid" },
              { name: "Nora Veldt", email: "hello@noraveldt.co", disc: "Jewellery", age: "1d ago", status: "NEW", bg: "bg-gold" },
              { name: "Theo Park", email: "theo.p@gmail.com", disc: "Graphic", age: "1d ago", status: "NEW", bg: "bg-navy" },
              { name: "Darya Kowal", email: "d.kowal@outlook.com", disc: "Visual Art", age: "2d ago", status: "IN REVIEW", bg: "bg-terra" },
              { name: "Cam Whitlam", email: "cam.w@gmail.com", disc: "Tattoo", age: "5d ago", status: "APPROVED", bg: "bg-char" },
            ].map((a) => (
              <tr key={a.name} className="border-b border-dark2 last:border-b-0 hover:bg-black">
                <td className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex-shrink-0 ${a.bg}`} />
                  <div>
                    <div className="font-display font-bold">{a.name}</div>
                    <div className="font-mono text-[10px] text-midgrey">{a.email}</div>
                  </div>
                </td>
                <td className="p-4">{a.disc}</td>
                <td className="p-4 font-mono text-xs text-midgrey">{a.age}</td>
                <td className="p-4">
                  <span className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                    a.status === "NEW" ? "bg-orange/15 text-orange" :
                    a.status === "APPROVED" ? "bg-lime/15 text-lime" :
                    "bg-orange/15 text-orange"
                  }`}>{a.status}</span>
                </td>
                <td className="p-4 text-right">
                  {a.status !== "APPROVED" ? (
                    <><button className="bg-lime text-black font-mono text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.05em] mr-2">APPROVE</button>
                    <button className="border border-pink text-pink font-mono text-[10px] px-3 py-1 rounded-full tracking-[0.05em]">REJECT</button></>
                  ) : (
                    <button className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">OPEN</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  );
}