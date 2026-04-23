"use client";

import { useState } from "react";

const inputCls =
  "w-full bg-black border border-dark2 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none";

type ArtistData = {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  location: string;
  instagram: string;
  website: string;
  commissions: boolean;
  price_range: string;
};

export default function ProfileEditor({ artist }: { artist: ArtistData }) {
  const [form, setForm] = useState({
    name: artist.name ?? "",
    tagline: artist.tagline ?? "",
    bio: artist.bio ?? "",
    location: artist.location ?? "",
    instagram: artist.instagram ?? "",
    website: artist.website ?? "",
    commissions: artist.commissions ?? false,
    price_range: artist.price_range ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/artist/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: artist.id, ...form }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save");
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Basics</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Display name
            </label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Tagline
            </label>
            <input
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              className={inputCls}
              placeholder="One line about what you do"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Bio
            </label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Location
            </label>
            <input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Links</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Instagram
            </label>
            <input
              value={form.instagram}
              onChange={(e) => set("instagram", e.target.value)}
              className={inputCls}
              placeholder="@yourhandle"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Website
            </label>
            <input
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              className={inputCls}
              placeholder="https://"
            />
          </div>
        </div>
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Commissions</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="accent-lime w-5 h-5"
              checked={form.commissions}
              onChange={(e) => set("commissions", e.target.checked)}
            />
            <span>Open for commissions</span>
          </label>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Price range
            </label>
            <input
              value={form.price_range}
              onChange={(e) => set("price_range", e.target.value)}
              className={inputCls}
              placeholder="e.g. $150 – $500"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-pink text-sm mb-4">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-lime text-black px-8 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        {saved && (
          <span className="font-mono text-sm text-lime tracking-[0.05em]">
            ✓ Saved
          </span>
        )}
      </div>
    </>
  );
}
