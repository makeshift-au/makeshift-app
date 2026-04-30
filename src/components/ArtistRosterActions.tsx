"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ArtistRosterActions({
  artistId,
  slug,
  status,
}: {
  artistId: string;
  slug: string;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  async function handleStatusChange(newStatus: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/artists", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId, status: newStatus }),
      });
      if (res.ok) {
        setCurrentStatus(newStatus);
        router.refresh();
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      {currentStatus === "onboarding" && (
        <button
          onClick={() => handleStatusChange("live")}
          disabled={loading}
          className="bg-lime text-black px-3 py-1.5 rounded-full text-xs font-bold hover:bg-lime/80 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Publish"}
        </button>
      )}
      {currentStatus === "live" && (
        <button
          onClick={() => handleStatusChange("paused")}
          disabled={loading}
          className="border border-orange text-orange px-3 py-1.5 rounded-full text-xs hover:bg-orange hover:text-black transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Pause"}
        </button>
      )}
      {currentStatus === "paused" && (
        <button
          onClick={() => handleStatusChange("live")}
          disabled={loading}
          className="border border-lime text-lime px-3 py-1.5 rounded-full text-xs hover:bg-lime hover:text-black transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Unpause"}
        </button>
      )}
      <Link
        href={`/admin/artists/${artistId}`}
        className="border border-dark2 text-white px-3 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors"
      >
        Edit
      </Link>
      <Link
        href={`/artist/${slug}`}
        className="border border-dark2 text-midgrey px-3 py-1.5 rounded-full text-xs hover:border-white hover:text-white transition-colors"
      >
        View
      </Link>
    </div>
  );
}
