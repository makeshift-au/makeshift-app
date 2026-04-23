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

  async function handlePause() {
    if (!artistId) return;
    const newStatus = status === "paused" ? "live" : "paused";
    const confirm = window.confirm(
      newStatus === "paused"
        ? "Pause your page? You'll be hidden from browse, but open orders still ship."
        : "Unpause your page? You'll be visible again on browse.",
    );
    if (!confirm) return;

    setPausing(true);
    try {
      const res = await fetch("/api/artist/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistId,
          status: newStatus,
        }),
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
            <div className="text-midgrey">Magic link login</div>
          </div>
        </div>
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Page status</h2>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-sm">
              Your page is{" "}
              <span className={status === "live" ? "text-lime" : "text-orange"}>
                {status}
              </span>
            </div>
            <div className="text-xs text-midgrey mt-1">
              {status === "live"
                ? "Visible on browse and search"
                : "Hidden from browse. Open orders still ship."}
            </div>
          </div>
        </div>
      </div>

      {artistId && (
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
              onClick={handlePause}
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
