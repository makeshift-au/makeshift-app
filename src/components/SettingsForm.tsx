"use client";

import { useState } from "react";

export default function SettingsForm({
  email,
  artistId,
  artistStatus,
}: {
  email: string;
  artistId?: string;
  artistStatus: string;
}) {
  const [pausing, setPausing] = useState(false);
  const [status, setStatus] = useState(artistStatus);

  async function handleStatusChange(newStatus: string) {
    if (!artistId) return;

    const messages: Record<string, string> = {
      live: status === "onboarding"
        ? "Go live? Your page will be visible on browse and search."
        : "Unpause your page? You'll be visible again on browse.",
      paused: "Pause your page? You'll be hidden from browse, but open orders still ship.",
    };

    if (!window.confirm(messages[newStatus] ?? "Change status?")) return;

    setPausing(true);
    try {
      const res = await fetch("/api/artist/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId, status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
      }
    } catch {
      alert("Failed to update");
    } finally {
      setPausing(false);
    }
  }

  return (
    <>
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Login</h2>
        <div className="flex justify-between items-center text-sm">
          <div>
            <div className="font-medium">{email}</div>
            <div className="text-midgrey">Email + password login</div>
          </div>
        </div>
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Page status</h2>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-sm">
              Your page is{" "}
              <span className={
                status === "live" ? "text-lime" :
                status === "onboarding" ? "text-orange" :
                "text-midgrey"
              }>
                {status}
              </span>
            </div>
            <div className="text-xs text-midgrey mt-1">
              {status === "live"
                ? "Visible on browse and search"
                : status === "onboarding"
                  ? "Set up your images and listings, then go live when ready."
                  : "Hidden from browse. Open orders still ship."}
            </div>
          </div>
          {status === "onboarding" && artistId && (
            <button
              onClick={() => handleStatusChange("live")}
              disabled={pausing}
              className="bg-lime text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-lime/80 transition-colors disabled:opacity-50"
            >
              {pausing ? "..." : "Go Live"}
            </button>
          )}
        </div>
      </div>

      {artistId && status !== "onboarding" && (
        <div className="bg-dark1 border border-pink rounded-2xl p-6">
          <h2 className="font-display font-bold text-xl text-pink mb-4">
            Danger zone
          </h2>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-sm">
                {status === "paused" ? "Unpause my page" : "Pause my page"}
              </div>
              <div className="text-xs text-midgrey">
                {status === "paused"
                  ? "Make your page visible again on browse."
                  : "Temporarily hide from browse. Open orders still ship."}
              </div>
            </div>
            <button
              onClick={() => handleStatusChange(status === "paused" ? "live" : "paused")}
              disabled={pausing}
              className={`border px-4 py-2 rounded-full text-xs transition-colors ${
                status === "paused"
                  ? "border-lime text-lime hover:bg-lime hover:text-black"
                  : "border-pink text-pink hover:bg-pink hover:text-white"
              }`}
            >
              {pausing
                ? "..."
                : status === "paused"
                  ? "Unpause"
                  : "Pause"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
