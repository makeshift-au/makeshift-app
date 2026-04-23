"use client";

import { useState, useMemo } from "react";
import ArtistCard from "./ArtistCard";
import type { Artist } from "@/data/artists";

const CATEGORIES = [
  "All",
  "Fashion",
  "Music",
  "Visual Art",
  "Ceramics",
  "Tattoo",
  "Jewellery",
  "Graphic",
  "Photography",
];

export default function SearchView({ artists }: { artists: Artist[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    let result = artists;

    if (category !== "All") {
      const slug = category.toLowerCase().replace(" ", "-");
      result = result.filter((a) => a.discipline === slug);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.discipline.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q),
      );
    }

    return result;
  }, [artists, query, category]);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-2xl bg-dark1 border border-dark2 rounded-full px-6 py-4 text-white placeholder:text-midgrey focus:border-lime focus:outline-none text-lg mb-6"
        placeholder="Search artists, works, categories..."
      />

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`font-mono text-xs tracking-[0.05em] px-4 py-2 rounded-full transition-colors ${
              category === cat
                ? "bg-lime text-black font-bold"
                : "bg-dark1 border border-dark2 text-lightgrey hover:border-lime hover:text-lime"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-midgrey mb-6">
        {filtered.length === artists.length
          ? `Showing all ${artists.length} artists`
          : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
        {query && ` for "${query}"`}
        {category !== "All" && ` in ${category}`}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="font-display font-bold text-xl mb-2">No artists found</h3>
          <p className="text-midgrey text-sm">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((a) => (
            <ArtistCard key={a.slug} artist={a} />
          ))}
        </div>
      )}
    </>
  );
}
