"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ImageUpload({
  artistId,
  type,
  currentUrl,
  label,
  onUploaded,
}: {
  artistId: string;
  type: "hero" | "avatar" | "listing";
  currentUrl?: string;
  label: string;
  onUploaded?: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl ?? "");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB");
      return;
    }

    setUploading(true);
    setError("");

    // Show preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      formData.append("artistId", artistId);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        setPreviewUrl(currentUrl ?? "");
      } else {
        setPreviewUrl(data.url);
        onUploaded?.(data.url);
      }
    } catch {
      setError("Upload failed");
      setPreviewUrl(currentUrl ?? "");
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localPreview);
    }
  }

  const isHero = type === "hero";

  return (
    <div>
      <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
        {label}
      </label>

      {previewUrl ? (
        <div
          className={`relative ${isHero ? "h-40" : "w-24 h-24"} rounded-xl overflow-hidden mb-3`}
        >
          <Image
            src={previewUrl}
            alt={label}
            fill
            className="object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="font-mono text-xs text-lime">Uploading...</div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`${isHero ? "h-40" : "w-24 h-24"} bg-dark2 rounded-xl mb-3 flex items-center justify-center`}
        >
          <span className="text-midgrey text-sm">No image</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="border border-dark2 text-white px-5 py-2.5 rounded-full text-sm hover:border-lime hover:text-lime transition-colors disabled:opacity-50"
      >
        {uploading ? "Uploading..." : previewUrl ? "Change image" : "Upload image"}
      </button>

      {error && <p className="text-pink text-xs mt-2">{error}</p>}
    </div>
  );
}
