import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const faqs = {
  "For buyers": [
    ["How do I know the work is legit?", "Every artist is hand-approved by a real human. We review portfolios, check authenticity, and talk to each artist before they go live. About 70% of applications don't make it."],
    ["What if my order never arrives?", "Email makeshift.melb@gmail.com. If it's genuinely lost, we refund you in full."],
    ["Can I return something?", "One-of-a-kind work isn't returnable unless damaged. Ready-made items may be returnable within 14 days at the artist's discretion."],
    ["How do commissions work?", "Find an artist, click Enquire, agree a price. 30% deposit up front, balance on completion."],
  ],
  "For artists": [
    ["What's it cost?", "Nothing up front. 10% per sale plus Stripe processing. Founding artists pay 5% for the first year."],
    ["How do I apply?", "Click Join Makeshift, fill 4 short steps (~15 min). We review within 5-7 business days."],
    ["Who owns my work?", "You do. Makeshift never claims copyright. We ask for a non-exclusive licence to display it on the site."],
    ["When do I get paid?", "Weekly, every Friday, via Stripe Connect direct to your bank."],
  ],
  "About Makeshift": [
    ["Who's behind this?", "Jordan McCorkell — one person, one laptop, one mission."],
    ["Why only Australia?", "We want to get this right for one community first. NZ in late 2026 if the model works."],
    ["Are you VC-backed?", "No. Bootstrapped. Our only investors are the artists and buyers."],
  ],
};

export default function FAQPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
            / HELP / FAQ
          </div>
          <h1 className="font-display font-[800] text-[clamp(56px,10vw,88px)] leading-[0.92] tracking-[-0.03em] mb-4">
            Good questions.
          </h1>
          <p className="text-xl text-lightgrey max-w-xl mx-auto">
            Answers to the stuff people ask most.{" "}
            <Link href="/contact" className="text-lime hover:underline">
              Ask us direct
            </Link>{" "}
            if you can&rsquo;t find what you need.
          </p>
        </div>

        {Object.entries(faqs).map(([group, items], gi) => (
          <div key={group} className="mb-14">
            <h2 className="font-display font-bold text-2xl text-lime mb-5 pb-3 border-b border-dark2 flex items-center gap-3">
              <span className="font-mono text-sm text-midgrey tracking-[0.1em]">
                /{String(gi + 1).padStart(2, "0")}
              </span>
              {group}
            </h2>
            <div className="space-y-3">
              {items.map(([q, a]) => (
                <details
                  key={q}
                  className="bg-dark1 border border-dark2 rounded-xl group"
                >
                  <summary className="px-6 py-5 cursor-pointer font-display font-semibold text-[17px] flex justify-between items-center list-none">
                    {q}
                    <span className="text-lime text-xl font-bold group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-lightgrey text-[15px] leading-relaxed border-t border-dark2 pt-4">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-dark1 border border-lime rounded-2xl p-10 text-center mt-10">
          <h3 className="font-display font-bold text-2xl mb-3">
            Still stuck?
          </h3>
          <p className="text-lightgrey mb-5">
            Email us anything — we actually read every message.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-lime text-black px-7 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Get in touch &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}