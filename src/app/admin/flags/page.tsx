import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Flags" };

export default function AdminFlagsPage() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / FLAGS
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        Flags.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Content or artists reported by buyers, other artists, or our content guidelines.
      </p>

      <div className="space-y-4">
        <div className="bg-dark1 border border-pink rounded-2xl p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-bold text-lg">Listing: &ldquo;Skull &amp; Crescent Study&rdquo;</h3>
            <span className="font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full bg-pink/15 text-pink">3 REPORTS</span>
          </div>
          <div className="font-mono text-xs text-midgrey mb-3">Artist: Kaz Nakamura · flagged 8 hours ago</div>
          <div className="bg-pink/10 border-l-[3px] border-pink rounded p-3 text-sm text-lightgrey mb-4">
            <strong className="text-pink">Reason:</strong> Reported as similar to copyrighted work. Content bot matched 82%.
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="bg-lime text-black font-mono text-[11px] font-bold px-4 py-2 rounded-full tracking-[0.05em]">OPEN LISTING</button>
            <button className="border border-pink text-pink font-mono text-[11px] px-4 py-1.5 rounded-full tracking-[0.05em]">HIDE LISTING</button>
            <button className="border border-dark2 text-white px-4 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">MESSAGE ARTIST</button>
          </div>
        </div>
        <div className="bg-dark1 border border-pink rounded-2xl p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-bold text-lg">Order #0412 — payment dispute</h3>
            <span className="font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full bg-pink/15 text-pink">DISPUTED</span>
          </div>
          <div className="font-mono text-xs text-midgrey mb-3">Artist: Maccs Customs · Buyer: R. Halsey · 1 day ago</div>
          <div className="bg-pink/10 border-l-[3px] border-pink rounded p-3 text-sm text-lightgrey mb-4">
            <strong className="text-pink">Reason:</strong> Buyer claims double charge ($340). Stripe confirms two charges 4 min apart.
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="bg-lime text-black font-mono text-[11px] font-bold px-4 py-2 rounded-full tracking-[0.05em]">ISSUE REFUND</button>
            <button className="border border-dark2 text-white px-4 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">OPEN IN STRIPE</button>
            <button className="border border-dark2 text-white px-4 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">MESSAGE BUYER</button>
          </div>
        </div>
      </div>
    
    </>
  );
}