import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Page" };

export default function DashboardPageeditorPage() {
  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / MY PAGE
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        My Page.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Edit your public artist page — basics, hero, links, commission settings.
      </p>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Basics</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Display name</label>
            <input defaultValue="Maccs Customs" className="w-full bg-black border border-dark2 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Tagline</label>
            <input defaultValue="Custom leather & denim. Worn-in, not worn-out." className="w-full bg-black border border-dark2 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Bio</label>
            <textarea rows={3} defaultValue="Hand-cut, hand-stitched custom pieces from reclaimed leather and selvedge denim." className="w-full bg-black border border-dark2 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none resize-none" />
          </div>
        </div>
      </div>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Hero image</h2>
        <div className="bg-acid h-40 rounded-xl mb-4" />
        <button className="border border-dark2 text-white px-5 py-2.5 rounded-full text-sm hover:border-lime hover:text-lime transition-colors">Change hero image</button>
      </div>
      <button className="bg-lime text-black px-8 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform">Save changes</button>
    
    </>
  );
}