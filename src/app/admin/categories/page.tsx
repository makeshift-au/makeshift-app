import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Categories" };

export default function AdminCategoriesPage() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / CATEGORIES
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        Categories.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        The 8 disciplines. Rename, reorder, or manage sub-tags.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          ["Fashion", "6 artists · 42 listings"],
          ["Music", "4 artists · 18 listings"],
          ["Visual Art", "9 artists · 67 listings"],
          ["Ceramics", "8 artists · 94 listings"],
          ["Tattoo", "6 artists · 38 listings"],
          ["Jewellery", "5 artists · 48 listings"],
          ["Graphic", "7 artists · 54 listings"],
          ["Photography", "2 artists · 22 listings"],
        ].map(([name, count]) => (
          <div key={name} className="bg-dark2 border border-dark2 rounded-xl p-5">
            <div className="font-display font-bold text-lg mb-1">{name}</div>
            <div className="font-mono text-[11px] text-lime tracking-[0.1em] mb-3">{count.toUpperCase()}</div>
            <div className="flex gap-2">
              <button className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">Edit</button>
              <button className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">Reorder</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {["one-of-a-kind", "commission", "vintage", "hand-poured", "wheel-thrown", "risograph", "screenprint", "silver", "resin", "limited run", "digital", "vinyl", "35mm"].map((tag) => (
            <span key={tag} className="bg-dark1 border border-dark2 text-lightgrey font-mono text-xs tracking-[0.05em] px-3 py-1.5 rounded-full">{tag}</span>
          ))}
          <button className="border border-lime text-lime font-mono text-xs tracking-[0.05em] px-3 py-1.5 rounded-full">+ new tag</button>
        </div>
      </div>
    
    </>
  );
}