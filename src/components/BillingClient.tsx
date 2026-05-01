"use client";

import { useState } from "react";

interface BillingClientProps {
  artist: {
    id: string;
    name: string;
    foundingArtist: boolean;
    feeRate: number;
    stripeCustomerId: string | null;
    subscriptionStatus: string;
    stripeOnboarded: boolean;
  };
  subStatus: { label: string; color: string };
  trialEndsAt: string | null;
  enquiryCount: number;
  clickCount: number;
  invoices: {
    id: string;
    date: string;
    amount: string;
    status: string;
    url: string | null;
  }[];
}

export default function BillingClient({
  artist,
  subStatus,
  trialEndsAt,
  enquiryCount,
  clickCount,
  invoices,
}: BillingClientProps) {
  const [portalLoading, setPortalLoading] = useState(false);

  async function openBillingPortal() {
    if (!artist.stripeCustomerId) return;
    setPortalLoading(true);
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: artist.stripeCustomerId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal error:", err);
    } finally {
      setPortalLoading(false);
    }
  }

  const estimatedCharges =
    enquiryCount * 5 + clickCount * 0.5;

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / BILLING
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Billing.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Your plan, usage charges, and invoice history.
      </p>

      {/* Plan Card */}
      <div className="bg-dark1 border-2 border-lime rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-display font-bold text-xl">
            {artist.foundingArtist ? "Founding Artist Plan" : "Makeshift Artist Plan"}
          </h2>
          <span
            className={`font-mono text-xs tracking-[0.1em] px-3 py-1 rounded-full ${subStatus.color}`}
          >
            {subStatus.label}
          </span>
        </div>
        <p className="text-lightgrey text-sm mb-4">
          {artist.foundingArtist ? (
            <>
              No monthly subscription fee during your founding period.
              {trialEndsAt && (
                <> Trial ends <strong className="text-white">{trialEndsAt}</strong>, then $15/month.</>
              )}
            </>
          ) : (
            <>$15/month platform subscription. {artist.feeRate}% commission on sales.</>
          )}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-1">
              COMMISSION RATE
            </div>
            <div className="font-display font-bold text-2xl text-lime">
              {artist.feeRate}%
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-1">
              SUBSCRIPTION
            </div>
            <div className="font-display font-bold text-2xl">
              {artist.foundingArtist &&
              (artist.subscriptionStatus === "trialing" ||
                artist.subscriptionStatus === "none")
                ? "$0"
                : "$15"}
              <span className="text-sm text-midgrey font-normal">/mo</span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-1">
              PAYOUT ACCOUNT
            </div>
            <div className="text-sm">
              {artist.stripeOnboarded ? (
                <span className="text-lime">Connected</span>
              ) : (
                <span className="text-yellow-400">Not connected</span>
              )}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-1">
              PAYMENT METHOD
            </div>
            <div className="text-sm">
              {artist.stripeCustomerId ? (
                <button
                  onClick={openBillingPortal}
                  disabled={portalLoading}
                  className="text-lime hover:underline disabled:opacity-50"
                >
                  {portalLoading ? "Loading…" : "Manage →"}
                </button>
              ) : (
                <span className="text-midgrey">Not set up</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Current Month Usage */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">
          Current month usage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-dark2 rounded-xl p-4">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-2">
              ENQUIRIES
            </div>
            <div className="font-display font-[800] text-3xl mb-1">
              {enquiryCount}
            </div>
            <div className="text-sm text-midgrey">
              @ $5.00 each = <span className="text-white">${(enquiryCount * 5).toFixed(2)}</span>
            </div>
          </div>
          <div className="border border-dark2 rounded-xl p-4">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-2">
              STREAMING CLICKS
            </div>
            <div className="font-display font-[800] text-3xl mb-1">
              {clickCount}
            </div>
            <div className="text-sm text-midgrey">
              @ $0.50 each = <span className="text-white">${(clickCount * 0.5).toFixed(2)}</span>
            </div>
          </div>
          <div className="border border-dark2 rounded-xl p-4">
            <div className="font-mono text-[10px] text-midgrey tracking-[0.1em] mb-2">
              ESTIMATED CHARGES
            </div>
            <div className="font-display font-[800] text-3xl text-lime mb-1">
              ${estimatedCharges.toFixed(2)}
            </div>
            <div className="text-sm text-midgrey">
              Billed on the 1st of next month
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">Invoice history</h2>
        {invoices.length > 0 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-xs font-mono text-midgrey tracking-[0.1em] pb-2 border-b border-dark2">
              <span>DATE</span>
              <span>AMOUNT</span>
              <span>STATUS</span>
              <span className="text-right">INVOICE</span>
            </div>
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="grid grid-cols-4 items-center border-b border-dark2 pb-3 last:border-b-0 text-sm"
              >
                <span className="font-mono text-xs text-midgrey">{inv.date}</span>
                <span className="font-display font-bold">{inv.amount}</span>
                <span>
                  <span
                    className={`font-mono text-[10px] tracking-[0.1em] px-2 py-0.5 rounded-full ${
                      inv.status === "paid"
                        ? "text-lime bg-lime/15"
                        : inv.status === "open"
                          ? "text-yellow-400 bg-yellow-400/15"
                          : "text-midgrey bg-midgrey/15"
                    }`}
                  >
                    {inv.status.toUpperCase()}
                  </span>
                </span>
                <span className="text-right">
                  {inv.url ? (
                    <a
                      href={inv.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime hover:underline text-sm"
                    >
                      View →
                    </a>
                  ) : (
                    <span className="text-midgrey">—</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-midgrey text-sm">
            No invoices yet. Usage charges will appear here after your first billing cycle.
          </p>
        )}
      </div>
    </>
  );
}
