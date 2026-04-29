"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

const inputCls =
  "w-full bg-black border border-dark2 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none";

type ListingData = {
  id: string;
  title: string;
  description: string;
  price: number;
  price_type: string;
  status: string;
  image_urls: string[];
  slug: string;
};

export default function ListingEditor({
  listing,
  artistId,
}: {
  listing?: ListingData;
  artistId: string;
}) {
  const router = useRouter();
  const isEditing = !!listing;

  const [form, setForm] = useState({
    title: listing?.title ?? "",
    description: listing?.description ?? "",
    price: listing?.price ?? 0,
    status: listing?.status ?? "draft",
  });
  const [imageUrls, setImageUrls] = useState<string[]>(
    listing?.image_urls ?? []
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const set = (key: string, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  function handleImageUploaded(url: string) {
    setImageUrls((prev) => [...prev, url]);
  }

  function removeImage(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/listings/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: listing?.id,
          artistId,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          status: form.status,
          image_urls: imageUrls,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save");
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        // If creating new, redirect to the edit page
        if (!isEditing && data.listing?.id) {
          router.push(`/dashboard/listings/${data.listing.id}`);
        }
      }
    } catch {
      setError("Failed to save listing");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!listing?.id) return;
    if (!confirm("Are you sure you want to delete this listing?")) return;

    setDeleting(true);
    setError("");

    try {
      const res = await fetch("/api/listings/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: listing.id, artistId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete");
      } else {
        router.push("/dashboard/listings");
      }
    } catch {
      setError("Failed to delete listing");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
              placeholder="Name of the work"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Describe the work, materials, dimensions..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={inputCls}
              >
                <option value="draft">Draft</option>
                <option value="live">Live</option>
                <option value="paused">Paused</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Images</h2>

        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative group">
                <div className="w-full aspect-square rounded-xl overflow-hidden">
                  <img
                    src={url}
                    alt={`Listing image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/80 text-pink rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}

        <ImageUpload
          artistId={artistId}
          type="listing"
          label="Add listing image"
          onUploaded={handleImageUploaded}
        />
      </div>

      {error && <p className="text-pink text-sm mb-4">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-lime text-black px-8 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save changes" : "Create listing"}
        </button>
        {saved && (
          <span className="font-mono text-sm text-lime tracking-[0.05em]">
            ✓ Saved
          </span>
        )}
        {isEditing && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="border border-dark2 text-pink px-6 py-3.5 rounded-full text-sm hover:border-pink transition-colors disabled:opacity-50 ml-auto"
          >
            {deleting ? "Deleting..." : "Delete listing"}
          </button>
        )}
      </div>
    </>
  );
}
