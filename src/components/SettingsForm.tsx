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

  // Payment method state
  const [billingChecking, setBillingChecking] = useState(true);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [cardInfo, setCardInfo] = useState<{ brand: string; last4: string } | null>(null);

  // Payout account (Stripe Connect) state
  const [connectChecking, setConnectChecking] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Check payment method on mount
  useEffect(() => {
    if (!artistId) {
      setBillingChecking(false);
      setConnectChecking(false);
      return;
    }

    // Check payment method
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

    // Check Stripe Connect status
    fetch("/api/stripe/connect")
      .then((res) => res.json())
      .then((data) => {
        setIsConnected(data.connected ?? false);
        setIsOnboarded(data.onboarded ?? false);
      })
      .catch(() => {})
      .finally(() => setConnectChecking(false));
  }, [artistId]);

  // Check URL params for billing/connect success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("billing") === "success") {
      fetch("/api/billing/setup")
        .then((res) => res.json())
        .then((data) => {
          setHasPaymentMethod(data.hasPaymentMethod);
          if (data.cardBrand && data.cardLast4) {
            setCardInfo({ brand: data.cardBrand, last4: data.cardLast4 });
          }
        });
      window.history.replaceState({}, "", "/dashboard/settings");
    }

    if (params.get("connect") === "complete") {
      fetch("/api/stripe/connect")
        .then((res) => res.json())
        .then((data) => {
          setIsConnected(data.connected ?? false);
          setIsOnboarded(data.onboarded ?? false);
        });
      window.history.replaceState({}, "", "/dashboard/settings");
    }
  }, []);

  async function handleStatusChange(newStatus: string) {
    if (!artistId) return;

    // Block Go Live if requirements not met
    if (newStatus === "live" && !canGoLive) {
      alert("Please complete all setup steps before going live.");
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
  const isChecking = billingChecking || connectChecking;
  const canGoLive = hasPaymentMethod && isOnboarded;

  // Build missing steps list for the Go Live button area
  const missingSteps: string[] = [];
  if (!hasPaymentMethod) missingSteps.push("payment method");
  if (!isOnboarded) missingSteps.push("payout account");

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

      {/* Onboarding checklist header — only during onboarding */}
      {isOnboarding && artistId && (
        <div className="mb-4">
          <div className="font-mono text-xs text-lime tracking-[0.1em] mb-1">
            / SETUP CHECKLIST
          </div>
          <p className="text-sm text-lightgrey">
            Complete these steps to go live on Makeshift.
          </p>
        </div>
      )}

      {/* Step 1: Payment Method (for charges) */}
      {artistId && (isOnboarding || !hasPaymentMethod) && (
        <OnboardingCard
          step={1}
          complete={hasPaymentMethod}
          title={hasPaymentMethod ? "Payment method saved" : "Add payment method"}
          description={
            hasPaymentMethod
              ? cardInfo
                ? `${cardInfo.brand.charAt(0).toUpperCase() + cardInfo.brand.slice(1)} ending in ${cardInfo.last4}`
                : "Card on file"
              : "Required for enquiry fees ($5 each), streaming click fees ($0.50 each), and your future subscription."
          }
          buttonLabel={hasPaymentMethod ? "Update card" : "Add payment method"}
          buttonChecking={billingChecking}
          href="/api/billing/setup/redirect"
          buttonVariant={hasPaymentMethod ? "secondary" : "primary"}
        />
      )}

      {/* Step 2: Payout Account (for receiving money) */}
      {artistId && (isOnboarding || !isOnboarded) && (
        <OnboardingCard
          step={2}
          complete={isOnboarded}
          title={
            isOnboarded
              ? "Payout account connected"
              : isConnected
                ? "Finish payout setup"
                : "Connect payout account"
          }
          description={
            isOnboarded
              ? "Your bank account is connected. You'll receive payouts when customers purchase your work."
              : isConnected
                ? "You started setting up your payout account but haven't finished. Complete the process to receive payments."
                : "Connect your bank account via Stripe so you can receive payments when someone buys your work."
          }
          buttonLabel={
            isOnboarded
              ? "Manage payouts"
              : isConnected
                ? "Continue setup"
                : "Connect bank account"
          }
          buttonChecking={connectChecking}
          href="/api/stripe/connect/redirect"
          buttonVariant={isOnboarded ? "secondary" : "primary"}
        />
      )}

      {/* Page Status */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Page status</h2>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-sm">
              Your page is{" "}
              <span
                className={
                  status === "live"
                    ? "text-lime"
                    : status === "onboarding"
                      ? "text-orange"
                      : "text-midgrey"
                }
              >
                {status}
              </span>
            </div>
            <div className="text-xs text-midgrey mt-1">
              {status === "live"
                ? "Visible on browse and search"
                : status === "onboarding"
                  ? "Set up your images, listings, and billing — then go live when ready."
                  : "Hidden from browse. Open orders still ship."}
            </div>
          </div>
          {isOnboarding && artistId && (
            <div className="flex items-center gap-3">
              {!isChecking && !canGoLive && (
                <span className="text-xs text-orange text-right max-w-[180px]">
                  Need {missingSteps.join(" + ")}
                </span>
              )}
              <button
                onClick={() => handleStatusChange("live")}
                disabled={pausing || !canGoLive || isChecking}
                className="bg-lime text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-lime/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {pausing ? "..." : "Go Live"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone — only for live/paused artists */}
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
              onClick={() =>
                handleStatusChange(status === "paused" ? "live" : "paused")
              }
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

// ---- Reusable Onboarding Step Card ----
function OnboardingCard({
  step,
  complete,
  title,
  description,
  buttonLabel,
  buttonChecking,
  href,
  buttonVariant = "primary",
}: {
  step: number;
  complete: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  buttonChecking?: boolean;
  href: string;
  buttonVariant?: "primary" | "secondary";
}) {
  const isDisabled = buttonChecking;

  return (
    <div
      className={`bg-dark1 border-2 ${
        complete ? "border-lime" : "border-orange"
      } rounded-2xl p-6 mb-6`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            complete ? "bg-lime text-black" : "bg-orange text-black"
          }`}
        >
          {complete ? "✓" : step}
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">{title}</h2>
          <p className="text-sm text-lightgrey mt-1">{description}</p>
        </div>
      </div>
      {isDisabled ? (
        <span
          className={`ml-11 inline-block px-6 py-2.5 rounded-full text-sm font-bold opacity-50 cursor-not-allowed ${
            buttonVariant === "primary"
              ? "bg-lime text-black"
              : "border border-dark2 text-midgrey text-xs px-4 py-2"
          }`}
        >
          Checking...
        </span>
      ) : (
        <a
          href={href}
          className={`ml-11 inline-block px-6 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer no-underline ${
            buttonVariant === "primary"
              ? "bg-lime text-black hover:bg-lime/80"
              : "border border-dark2 text-midgrey hover:border-lime hover:text-lime text-xs px-4 py-2"
          }`}
        >
          {buttonLabel}
        </a>
      )}
    </div>
  );
}
