import type { Metadata } from "next";

export const metadata: Metadata = { title: "Billing" };

export default function DashboardBillingPage() {
  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / BILLING
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Billing.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Your plan, Stripe payouts, and transaction history.
      </p>

      <div className="bg-dark1 border-2 border-lime rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-display font-bold text-xl">Founding Artist Plan</h2>
          <span className="font-mono text-xs text-lime tracking-[0.1em] bg-lime/15 px-3 py-1 rounded-full">ACTIVE</span>
        </div>
        <p className="text-lightgrey text-sm mb-4">5% per sale until April 2027. Then 10% standard rate.</p>
        <div className="font-mono text-xs text-midgrey tracking-[0.1em]">
          STRIPE PAYOUT ACCOUNT &middot; COMMONWEALTH BANK ****4721
        </div>
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl mb-4">Payout history</h2>
        <div className="space-y-3">
          {[
            ["10 Apr 2026", "$840.00", "$42.00", "$798.00"],
            ["03 Apr 2026", "$620.00", "$31.00", "$589.00"],
            ["27 Mar 2026", "$480.00", "$24.00", "$456.00"],
            ["20 Mar 2026", "$320.00", "$16.00", "$304.00"],
          ].map(([date, gross, fee, net]) => (
            <div key={date} className="flex justify-between items-center border-b border-dark2 pb-3 last:border-b-0 text-sm">
              <span className="font-mono text-xs text-midgrey">{date}</span>
              <span>{gross}</span>
              <span className="text-midgrey">{fee}</span>
              <span className="font-display font-bold text-lime">{net}</span>
            </div>
          ))}
        </div>
      </div>
    
    </>
  );
}