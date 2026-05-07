import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / LEGAL / PRIVACY
        </div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,72px)] leading-[0.92] tracking-[-0.02em] mb-4">
          Privacy Policy.
        </h1>
        <div className="font-mono text-xs text-midgrey tracking-[0.05em] mb-8 pb-5 border-b border-dark2">
          LAST UPDATED: 7 MAY 2026 · VERSION 1.0
        </div>
        <p className="text-lg text-lightgrey leading-relaxed mb-10">
          We collect the minimum we need and never sell your data. Ever.
          Plain English, as much as the law allows.
        </p>
        <div className="space-y-10 text-lightgrey leading-relaxed">
          {[
            {
              t: "Who we are",
              d: "Makeshift is operated by Makeshift Collective Pty Ltd (ABN pending), a Victorian company. This policy applies to everyone who uses makeshift-au.com, whether you're browsing, buying, or selling.",
            },
            {
              t: "What we collect",
              d: "We collect your name, email address, and phone number when you create an account or submit a form. If you're an artist, we also collect your business details, bank account info (via Stripe), and portfolio content you upload. When you make a purchase, Stripe collects your payment details directly — we never see or store your full card number. We also collect basic usage data (pages visited, device type) through server logs.",
            },
            {
              t: "How we use it",
              d: "We use your information to operate the marketplace: processing transactions, connecting buyers with artists, sending order confirmations, and communicating important account updates. Artist profiles are displayed publicly on the site. We may use aggregated, anonymised data to understand how the platform is used and improve it.",
            },
            {
              t: "Payment processing",
              d: "All payments are processed by Stripe. When you add a payment method or receive payouts, your financial data is handled directly by Stripe under their privacy policy. Makeshift stores only a reference ID and the last four digits of your card for display purposes. We never have access to your full card number, bank login, or Stripe password.",
            },
            {
              t: "Who we share with",
              d: "We share data only where necessary to operate: Stripe for payments, Resend for transactional emails (order confirmations, welcome emails), and Supabase for data storage. We do not sell, rent, or trade your personal information with third parties for marketing. When you place an order, the artist receives your name, email, and shipping address to fulfil it.",
            },
            {
              t: "Cookies",
              d: "We use essential cookies to keep you logged in and remember your session. Stripe sets its own cookies during checkout for fraud prevention. We do not use advertising cookies or third-party tracking pixels. No data is shared with ad networks.",
            },
            {
              t: "Your rights",
              d: "Under the Australian Privacy Act 1988, you can request access to, correction of, or deletion of your personal information at any time. Artists can export their data from the dashboard. To make a privacy request, email us at the address below. We'll respond within 30 days.",
            },
            {
              t: "Data retention",
              d: "We keep your account data for as long as your account is active. If you close your account, we delete your personal data within 90 days, except where we're legally required to retain records (e.g., tax invoices, transaction history for 7 years under Australian tax law). Anonymised analytics data may be retained indefinitely.",
            },
            {
              t: "Security",
              d: "All data is transmitted over HTTPS. Payment data is handled by Stripe (PCI DSS Level 1 certified). Database access is restricted by role-based policies. We use Supabase Row Level Security to ensure users can only access their own data.",
            },
            {
              t: "Changes",
              d: "We may update this policy as Makeshift grows. If we make material changes, we'll email you before they take effect. The date at the top of this page always reflects the latest version.",
            },
          ].map((s, i) => (
            <div key={s.t}>
              <h2 className="flex items-baseline gap-3 font-display font-bold text-2xl text-white mb-3">
                <span className="font-mono text-xs text-lime tracking-[0.1em]">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                {s.t}
              </h2>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-dark1 border-l-[3px] border-lime rounded p-5 text-lightgrey">
          <strong className="text-lime">Privacy questions?</strong> Email makeshift.melb@gmail.com
        </div>
      </div>
    </div>
  );
}
