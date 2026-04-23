"use client";

import { useState } from "react";

export default function BuyNowButton({
  listingId,
  artistId,
  label = "Buy now",
}: {
  listingId: string;
  artistId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleBuy() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, artistId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Redirect to Stripe hosted checkout
      window.location.href = data.url;
    } catch {
      setError("Failed to start checkout");
      setLoading(false);
    }
  }

  return (
    <div className="flex-1">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-lime text-black py-4 rounded-full font-semibold text-center hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? "Redirecting…" : `${label} →`}
      </button>
      {error && (
        <p className="text-pink text-sm text-center mt-2">{error}</p>
      )}
    </div>
  );
}
