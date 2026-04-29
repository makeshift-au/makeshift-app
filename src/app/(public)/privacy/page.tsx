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
          LAST UPDATED: 10 APRIL 2026 · VERSION 1.2
        </div>
        <p className="text-lg text-lightgrey leading-relaxed mb-10">
          We collect the minimum we need and never sell your data. Ever.
        </p>
        <div className="space-y-10 text-lightgrey leading-relaxed">
          {[
            {t: "Overview", d: "Makeshift is operated by Makeshift Collective Pty Ltd, a Victorian company. These terms apply to everyone who uses makeshift-au.com."},
            {t: "Accounts", d: "Use a real name and email. One person, one account. You must be at least 16 to buy and 18 to sell."},
            {t: "Transactions", d: "When you place an order, you're contracting with the artist, not Makeshift. We facilitate, we don't sell."},
            {t: "Fees", d: "Makeshift takes 10% of each sale plus Stripe processing. No listing fees, no subscription, no hidden charges."},
            {t: "Intellectual property", d: "Artists retain all copyright. Buying a piece gives you the item, not the rights to reproduce it."},
            {t: "Liability", d: "We vet sellers carefully but don't guarantee every item. Our liability is limited to the transaction amount."},
            {t: "Changes", d: "We may update these terms as we grow. Substantive changes are emailed before they take effect."},
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
          <strong className="text-lime">Questions?</strong> Email makeshift.melb@gmail.com
        </div>
      </div>
    </div>
  );
}