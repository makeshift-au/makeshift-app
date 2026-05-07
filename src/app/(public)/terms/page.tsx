import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / LEGAL / TERMS
        </div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,72px)] leading-[0.92] tracking-[-0.02em] mb-4">
          Terms of Service.
        </h1>
        <div className="font-mono text-xs text-midgrey tracking-[0.05em] mb-8 pb-5 border-b border-dark2">
          LAST UPDATED: 7 MAY 2026 · VERSION 2.0
        </div>
        <p className="text-lg text-lightgrey leading-relaxed mb-10">
          The rules for using Makeshift. Plain English, as much as the law allows.
        </p>
        <div className="space-y-10 text-lightgrey leading-relaxed">
          {[
            {
              t: "Overview",
              d: "Makeshift is operated by Makeshift Collective Pty Ltd (ABN pending), a Victorian company. These terms apply to everyone who uses makeshift-au.com — buyers, artists, and browsers alike. By using the site, you agree to these terms.",
            },
            {
              t: "Accounts",
              d: "Use a real name and email. One person, one account. You must be at least 16 to buy and 18 to sell. You're responsible for keeping your login secure. If you suspect unauthorised access, email us immediately.",
            },
            {
              t: "How it works",
              d: "Makeshift is a marketplace that connects buyers with independent artists. When you place an order, you're contracting directly with the artist, not with Makeshift. We facilitate the transaction, handle payment processing, and provide the platform — but the artist is responsible for creating and delivering your order.",
            },
            {
              t: "Fees and pricing",
              d: "Makeshift charges artists a 10% commission on each sale, plus Stripe payment processing fees. Founding Artists receive a free subscription for their first 6 months. After the founding period, artists pay a monthly subscription to maintain their page on Makeshift. There are no listing fees. Per-use charges may apply for features like enquiry forwarding ($5 per enquiry) and streaming link clicks ($0.50 per click). All prices are in Australian dollars and include GST where applicable.",
            },
            {
              t: "Returns and refunds",
              d: "Under Australian Consumer Law, you have the right to a refund if goods are faulty, not as described, or don't arrive. Since items on Makeshift are handmade and often made to order, change-of-mind returns are at the artist's discretion. To request a refund, contact the artist directly or email us if you can't resolve it. Makeshift will mediate disputes in good faith. Refunds are processed back to your original payment method via Stripe.",
            },
            {
              t: "Artist obligations",
              d: "Artists must accurately describe their work, fulfil orders in a reasonable timeframe, respond to buyer enquiries, and comply with all applicable Australian laws including consumer guarantees. Artists are responsible for their own tax obligations including GST registration if required.",
            },
            {
              t: "Intellectual property",
              d: "Artists retain all copyright to their work. Buying a piece gives you ownership of the physical item, not the rights to reproduce, copy, or commercially use the design. Content you upload to Makeshift (images, descriptions) grants us a licence to display it on the platform.",
            },
            {
              t: "Acceptable use",
              d: "Don't use Makeshift to sell counterfeit goods, resell others' work as your own, harass other users, or do anything illegal. We reserve the right to remove content and close accounts that violate these terms.",
            },
            {
              t: "Liability",
              d: "We curate sellers carefully but can't guarantee every item or transaction. Makeshift's liability to you is limited to the amount of the relevant transaction. To the extent permitted by Australian law, we exclude liability for indirect or consequential losses. Nothing in these terms limits your rights under Australian Consumer Law.",
            },
            {
              t: "Changes",
              d: "We may update these terms as Makeshift grows. If we make material changes, we'll email you at least 14 days before they take effect. The date at the top always reflects the latest version.",
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
          <strong className="text-lime">Questions?</strong> Email makeshift.melb@gmail.com
        </div>
      </div>
    </div>
  );
}
