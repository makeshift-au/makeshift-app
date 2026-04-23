"use client";

import { useState } from "react";

type ArtistSlot = {
  id: string;
  name: string;
  slug: string;
  discipline: string;
  bg: string;
  featured: boolean;
};

export default function FeaturedManager({
  featured: initialFeatured,
  available: initialAvailable,
}: {
  featured: ArtistSlot[];
  available: ArtistSlot[];
}) {
  const [featured, setFeatured] = useState(initialFeatured);
  const [available, setAvailable] = useState(initialAvailable);
  const [saving, setSaving] = useState(false);

  async function toggleFeatured(artist: ArtistSlot, add: boolean) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: artist.id, featured: add }),
      });
      if (res.ok) {
        if (add) {
          setFeatured((f) => [...f, { ...artist, featured: true }]);
          setAvailable((a) => a.filter((x) => x.id !== artist.id));
        } else {
          setFeatured((f) => f.filter((x) => x.id !== artist.id));
          setAvailable((a) => [...a, { ...artist, featured: false }].sort((x, y) => x.name.localeCompare(y.name)));
        }
      }
    } catch {
      alert("Failed to update");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-display font-bold text-xl">
              Currently Featured ({featured.length})
            </h2>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
              SHOWS ON HOMEPAGE HERO GRID
            </div>
          </div>
        </div>

        {featured.length === 0 ? (
          <p className="text-midgrey text-sm">No featured artists. Add some from the list below.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featured.map((artist) => (
              <div
                key={artist.id}
                className={`${artist.bg ?? "bg-acid"} rounded-xl p-3 min-h-[130px] flex flex-col justify-end relative`}
              >
                <button
                  onClick={() => toggleFeatured(artist, false)}
                  disabled={saving}
                  className="absolute top-2 right-2 bg-black text-pink w-6 h-6 rounded-full flex items-center justify-center font-mono text-sm hover:bg-pink hover:text-white transition-colors"
                  title="Remove from featured"
                >
                  &times;
                </button>
                <div className="bg-black p-2.5 rounded-lg">
                  <div className="font-display font-bold text-xs">{artist.name}</div>
                  <div className="font-mono text-[9px] text-midgrey capitalize">
                    {artist.discipline?.replace("-", " ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {available.length > 0 && (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
          <h2 className="font-display font-bold text-xl mb-4">
            Add to Featured
          </h2>
          <div className="space-y-2">
            {available.map((artist) => (
              <div
                key={artist.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-black transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex-shrink-0 ${artist.bg ?? "bg-acid"}`} />
                <div className="flex-1">
                  <div className="font-display font-bold text-sm">{artist.name}</div>
                  <div className="font-mono text-[10px] text-midgrey capitalize">
                    {artist.discipline?.replace("-", " ")}
                  </div>
                </div>
                <button
                  onClick={() => toggleFeatured(artist, true)}
                  disabled={saving}
                  className="bg-lime text-black font-mono text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.05em] disabled:opacity-50"
                >
                  + FEATURE
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
