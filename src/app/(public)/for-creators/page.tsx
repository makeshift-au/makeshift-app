import Link from "next/link";
import Marquee from "@/components/Marquee";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "For Creators" };

export default function ForCreatorsPage() {
  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16 border-b border-dark2">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
            / FOR CREATORS
          </div>
          <h1 className="font-display font-[800] text-[clamp(48px,8vw,88px)] leading-[0.92] tracking-[-0.03em] mb-6">
            Sell your
            <br />
            work here.
          </h1>
          <p className="text-xl text-lightgrey max-w-2xl mb-8">
            Makeshift is a curated marketplace for independent Australian
            artists. No algorithms, no race to the bottom. Just your work, your
            prices, your audience.
          </p>
          <Link
            href="/join"
            className="inline-block bg-lime text-black px-8 py-4 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Apply now &rarr;
          </Link>
          <div className="font-mono text-xs text-midgrey tracking-[0.1em] mt-3">
            FOUNDING ARTIST OFFER &middot; FREE FOR 6 MONTHS &middot; 10% COMMISSION
          </div>
        </div>
      </section>

      <Marquee />

      <section className="px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">/01</div>
          <h2 className="font-display font-bold text-3xl mb-8">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              ["Apply in 15 min", "Fill out 4 short steps — your story, your work, your page. We review within a week."],
              ["List and sell", "Upload your work, set your prices, accept commissions. We handle checkout and payments."],
              ["Get paid weekly", "10% per sale, no listing fees. Payouts every Friday via Stripe. Founding artists get a free subscription for 6 months."],
            ].map(([t, d], i) => (
              <div key={t} className="bg-dark1 border border-dark2 rounded-2xl p-6">
                <div className="font-mono text-xs text-lime tracking-[0.1em] mb-3">
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{t}</h3>
                <p className="text-sm text-lightgrey leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">/02</div>
          <h2 className="font-display font-bold text-3xl mb-8">What you get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Your own page", "makeshift-au.com/artist/your-name — a beautiful storefront designed to sell your work."],
              ["Commission engine", "Enquiry forms, deposit collection, milestone approvals, all built in."],
              ["Real analytics", "See who's viewing your page, where they come from, and what they click on."],
              ["Community", "Private Slack, quarterly meetups in Melbourne, and a team that picks up the phone."],
              ["Fair terms", "You keep your copyright. You set your prices. You can leave anytime."],
              ["Featured placement", "We rotate 12 artists on the homepage every week. No pay-to-play."],
            ].map(([t, d]) => (
              <div key={t} className="bg-dark1 border border-dark2 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-2">{t}</h3>
                <p className="text-sm text-lightgrey leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-dark2 text-center">
        <h2 className="font-display font-[800] text-4xl mb-4">Ready?</h2>
        <p className="text-lightgrey mb-6">It takes about 15 minutes. We review within a week.</p>
        <Link
          href="/join"
          className="inline-block bg-lime text-black px-8 py-4 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
        >
          Start your application &rarr;
        </Link>
      </section>
    </>
  );
}