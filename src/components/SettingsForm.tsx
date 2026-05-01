"use client";

import { useState, useEffect } from "react";

export default function SettingsForm({
  email,
  artistId,
  artistStatus,
  stripeCustomerId,
}: {
  email: string;
  artistId?: string;
  artistStatus: string;
  stripeCustomerId?: string | null;
}) {
  const [pausing, setPausing] = useState(false);
  const [status, setStatus] = useState(artistStatus);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingChecking, setBillingChecking] = useState(true);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [cardInfo, setCardInfo] = useState<{ brand: string; last4: string } | null>(null);

  // Check if payment method exists on mount
  useEffect(() => {
    if (!artistId) {
      setBillingChecking(false);
      return;
    }

    fetch("/api/billing/setup")
      .then((res) => res.json())
      .then((data) => {
        setHasPaymentMethod(data.hasPaymentMethod);
        if (data.cardBrand && data.cardLast4) {
          setCardInfo({ brand: data.cardBrand, last4: data.cardLast4 });
        }
      })
      .catch(() => {})
      .finally(() => setBillingChecking(false));
  }, [artistId]);

  // Check URL params for billing success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("billing") === "success") {
      // Re-check payment method after successful setup
      fetch("/api/billing/setup")
        .then((res) => res.json())
        .then((data) => {
          setHasPaymentMethod(data.hasPaymentMethod);
          if (data.cardBrand && data.cardLast4) {
            setCardInfo({ brand: data.cardBrand, last4: data.cardLast4 });
          }
        });
      // Clean the URL
      window.history.replaceState({}, "", "/dashboard/settings");
    }
  }, []);

  async function handleBillingSetup() {
    setBillingLoading(true);
    try {
      const res = await fetch("/api/billing/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Failed to start billing setup");
    } finally {
      setBillingLoading(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    if (!artistId) return;

    // Block Go Live if no payment method
    if (newStatus === "live" && !hasPaymentMethod) {
      alert("Please set up your payment method before going live.");
      return;
    }

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

  const isOnboarding = status === "onboarding";

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

      {/* Billing Setup — shows during onboarding or if no payment method */}
      {artistId && (isOnboarding || !hasPaymentMethod) && (
        <div className={`bg-dark1 border-2 ${hasPaymentMethod ? "border-lime" : "border-orange"} rounded-2xl p-6 mb-6`}>
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              hasPaymentMethod ? "bg-lime text-black" : "bg-orange text-black"
            }`}>
              {hasPaymentMethod ? "✓" : "!"}
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">
                {hasPaymentMethod ? "Payment method saved" : "Set up billing"}
              </h2>
              <p className="text-sm text-lightgrey mt-1">
                {hasPaymentMethod
                  ? cardInfo
                    ? `${cardInfo.brand.charAt(0).toUpperCase() + cardInfo.brand.slice(1)} ending in ${cardInfo.last4}`
                    : "Card on file"
                  : "Add a payment method to cover enquiry fees, streaming clicks, and your future subscription. You won't be charged until usage occurs."}
              </p>
            </div>
          </div>
          {!hasPaymentMethod && (
            <button
              onClick={handleBillingSetup}
              disabled={billingLoading || billingChecking}
              className="bg-lime text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-lime/80 transition-colors disabled:opacity-50 ml-11"
            >
              {billingLoading ? "Redirecting to Stripe..." : billingChecking ? "Checking..." : "Add payment method"}
            </button>
          )}
          {hasPaymentMethod && (
            <button
              onClick={handleBillingSetup}
              disabled={billingLoading}
              className="border border-dark2 text-midgrey px-4 py-2 rounded-full text-xs hover:border-lime hover:text-lime transition-colors disabled:opacity-50 ml-11"
            >
              {billingLoading ? "..." : "Update card"}
            </button>
          )}
        </div>
      )}

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
          {isOnboarding && artistId && (
            <div className="flex items-center gap-3">
              {!hasPaymentMethod && !billingChecking && (
                <span className="text-xs text-orange">Payment method required</span>
              )}
              <button
                onClick={() => handleStatusChange("live")}
                disabled={pausing || !hasPaymentMethod || billingChecking}
                className="bg-lime text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-lime/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pausing ? "..." : "Go Live"}
              </button>
            </div>
          )}
        </div>
      </div>

      {artistId && !isOnboarding && (
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
