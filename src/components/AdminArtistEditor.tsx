"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Artist = {
  id: string;
  slug: string;
  name: string;
  discipline: string;
  location: string;
  tagline: string;
  bio: string;
  instagram: string;
  website: string;
  commissions: boolean;
  price_range: string;
  status: string;
  featured: boolean;
  fee_rate: number;
  founding_artist: boolean;
  avatar_url?: string;
  hero_url?: string;
  banner_url?: string;
  created_at: string;
  stripe_account_id?: string;
  stripe_onboarded?: boolean;
};

const STATUSES = ["onboarding", "live", "paused", "closed"] as const;
const DISCIPLINES = [
  "painting",
  "illustration",
  "ceramics",
  "sculpture",
  "photography",
  "fashion",
  "printmaking",
  "textile",
  "jewellery",
  "digital-art",
  "mixed-media",
  "visual-art",
] as const;

export default function AdminArtistEditor({ artist }: { artist: Artist }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: artist.name ?? "",
    discipline: artist.discipline ?? "",
    location: artist.location ?? "",
    tagline: artist.tagline ?? "",
    bio: artist.bio ?? "",
    instagram: artist.instagram ?? "",
    website: artist.website ?? "",
    commissions: artist.commissions ?? false,
    price_range: artist.price_range ?? "",
    status: artist.status ?? "onboarding",
    featured: artist.featured ?? false,
    fee_rate: artist.fee_rate ?? 10,
    founding_artist: artist.founding_artist ?? false,
  });

  function update(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/artists", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: artist.id, ...form }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
      } else {
        setSaved(true);
        router.refresh();
      }
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/artists", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId: artist.id, status: newStatus }),
      });

      if (res.ok) {
        setForm((prev) => ({ ...prev, status: newStatus }));
        setSaved(true);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update status");
      }
    } catch {
      setError("Failed to update status");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Status banner */}
      <div className={`rounded-2xl p-5 flex items-center justify-between ${
        form.status === "live"
          ? "bg-lime/10 border border-lime/30"
          : form.status === "onboarding"
            ? "bg-orange/10 border border-orange/30"
            : form.status === "paused"
              ? "bg-dark1 border border-dark2"
              : "bg-pink/10 border border-pink/30"
      }`}>
        <div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-midgrey mb-1">
            Current Status
          </div>
          <div className={`font-display font-bold text-xl ${
            form.status === "live" ? "text-lime" :
            form.status === "onboarding" ? "text-orange" :
            form.status === "paused" ? "text-midgrey" :
            "text-pink"
          }`}>
            {form.status.toUpperCase()}
          </div>
        </div>
        <div className="flex gap-2">
          {form.status !== "live" && (
            <button
              onClick={() => handleStatusChange("live")}
              disabled={saving}
              className="bg-lime text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-lime/80 transition-colors disabled:opacity-50"
            >
              Publish
            </button>
          )}
          {form.status === "live" && (
            <button
              onClick={() => handleStatusChange("paused")}
              disabled={saving}
              className="border border-orange text-orange px-5 py-2.5 rounded-full text-sm font-bold hover:bg-orange hover:text-black transition-colors disabled:opacity-50"
            >
              Pause
            </button>
          )}
          {form.status === "paused" && (
            <button
              onClick={() => handleStatusChange("live")}
              disabled={saving}
              className="bg-lime text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-lime/80 transition-colors disabled:opacity-50"
            >
              Unpause
            </button>
          )}
        </div>
      </div>

      {/* Images preview */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">Images</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-2">Avatar</div>
            {artist.avatar_url ? (
              <div className="w-20 h-20 relative rounded-xl overflow-hidden">
                <Image src={artist.avatar_url} alt="Avatar" fill className="object-cover" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-dark2 rounded-xl flex items-center justify-center text-midgrey text-xs">None</div>
            )}
          </div>
          <div>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-2">Hero</div>
            {artist.hero_url ? (
              <div className="h-20 relative rounded-xl overflow-hidden">
                <Image src={artist.hero_url} alt="Hero" fill className="object-cover" />
              </div>
            ) : (
              <div className="h-20 bg-dark2 rounded-xl flex items-center justify-center text-midgrey text-xs">None</div>
            )}
          </div>
          <div>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-2">Banner</div>
            {artist.banner_url ? (
              <div className="h-20 relative rounded-xl overflow-hidden">
                <Image src={artist.banner_url} alt="Banner" fill className="object-cover" />
              </div>
            ) : (
              <div className="h-20 bg-dark2 rounded-xl flex items-center justify-center text-midgrey text-xs">None</div>
            )}
          </div>
        </div>
        <p className="text-xs text-midgrey mt-3">
          Images are managed by the artist in their Creator Studio.
        </p>
      </div>

      {/* Core details */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Discipline</label>
            <select
              value={form.discipline}
              onChange={(e) => update("discipline", e.target.value)}
              className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
            >
              {DISCIPLINES.map((d) => (
                <option key={d} value={d}>{d.replace("-", " ")}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Location</label>
            <input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Slug</label>
            <div className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm text-midgrey">
              /artist/{artist.slug}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Tagline</label>
          <input
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
            placeholder="Short one-liner..."
          />
        </div>

        <div className="mt-4">
          <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
            rows={4}
            className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Instagram</label>
            <input
              value={form.instagram}
              onChange={(e) => update("instagram", e.target.value)}
              className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
              placeholder="@handle"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Website</label>
            <input
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Business settings */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">Business</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Price Range</label>
            <input
              value={form.price_range}
              onChange={(e) => update("price_range", e.target.value)}
              className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
              placeholder="$50 – $200"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-1.5">Fee Rate (%)</label>
            <input
              type="number"
              value={form.fee_rate}
              onChange={(e) => update("fee_rate", parseFloat(e.target.value) || 0)}
              className="w-full bg-black border border-dark2 rounded-lg px-3 py-2.5 text-sm focus:border-lime focus:outline-none"
              min={0}
              max={50}
              step={0.5}
            />
          </div>
        </div>

        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.commissions}
              onChange={(e) => update("commissions", e.target.checked)}
              className="accent-lime w-4 h-4"
            />
            Open to commissions
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="accent-lime w-4 h-4"
            />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.founding_artist}
              onChange={(e) => update("founding_artist", e.target.checked)}
              className="accent-lime w-4 h-4"
            />
            Founding artist
          </label>
        </div>

        <div className="mt-4 pt-4 border-t border-dark2">
          <div className="font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase mb-2">Stripe</div>
          <div className="text-sm">
            {artist.stripe_onboarded ? (
              <span className="text-lime">Connected</span>
            ) : artist.stripe_account_id ? (
              <span className="text-orange">Incomplete setup</span>
            ) : (
              <span className="text-midgrey">Not connected</span>
            )}
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-dark1 border border-pink rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl text-pink mb-4">Danger zone</h2>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-sm">Delete this artist</div>
            <div className="text-xs text-midgrey mt-1">
              Permanently removes the artist, their listings, and optionally their login account. This cannot be undone.
            </div>
          </div>
          <button
            onClick={async () => {
              const confirmText = window.prompt(
                `Type "${artist.slug}" to confirm deletion:`
              );
              if (confirmText !== artist.slug) return;

              const deleteUser = window.confirm(
                "Also delete their login account? (Cancel = keep the account, just remove the artist profile)"
              );

              setSaving(true);
              try {
                const res = await fetch("/api/admin/artists", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ artistId: artist.id, deleteUser }),
                });
                if (res.ok) {
                  router.push("/admin/artists");
                } else {
                  const data = await res.json();
                  setError(data.error || "Failed to delete");
                }
              } catch {
                setError("Failed to delete");
              } finally {
                setSaving(false);
              }
            }}
            disabled={saving}
            className="border border-pink text-pink px-5 py-2.5 rounded-full text-sm font-bold hover:bg-pink hover:text-white transition-colors disabled:opacity-50 flex-shrink-0"
          >
            Delete artist
          </button>
        </div>
      </div>

      {/* Save bar */}
      <div className="flex items-center gap-4 sticky bottom-0 bg-black/80 backdrop-blur-sm border-t border-dark2 -mx-10 px-10 py-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-lime text-black px-8 py-3 rounded-full text-sm font-bold hover:bg-lime/80 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-lime text-sm font-mono">Saved</span>}
        {error && <span className="text-pink text-sm font-mono">{error}</span>}

        <div className="ml-auto flex gap-3">
          <Link
            href={`/artist/${artist.slug}`}
            className="border border-dark2 text-white px-5 py-2.5 rounded-full text-sm hover:border-lime hover:text-lime transition-colors"
          >
            View page
          </Link>
          <Link
            href="/admin/artists"
            className="border border-dark2 text-midgrey px-5 py-2.5 rounded-full text-sm hover:border-white hover:text-white transition-colors"
          >
            Back to roster
          </Link>
        </div>
      </div>
    </div>
  );
}
