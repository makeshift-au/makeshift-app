import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Makeshift — Sell Your Art Online",
  description:
    "Apply to become a founding artist on Makeshift. Your own storefront, weekly payouts, real community. Free for 6 months.",
};

/* ── tiny reusable bits ── */
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-lime flex-shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const NUM_STYLE =
  "inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-lime text-lime font-mono text-sm font-bold flex-shrink-0";

export default function JoinPage() {
  return (
    <>
      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="relative px-6 md:px-12 pt-28 pb-20 overflow-hidden">
        {/* subtle texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(200,255,0,0.03)_0_2px,transparent_2px_48px)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-4">
            / FOUNDING ARTISTS — LIMITED TO 25
          </div>
          <h1 className="font-display font-[800] text-[clamp(36px,7vw,88px)] leading-[0.95] tracking-[-0.03em] mb-6">
            Your art
            <br />
            deserves more
            <br />
            than a{" "}
            <span className="bg-lime text-black px-2 sm:px-3 inline-block">
              folding table.
            </span>
          </h1>
          <p className="text-xl text-lightgrey max-w-2xl mb-10 leading-relaxed">
            You&rsquo;ve done the markets. You&rsquo;ve posted on Instagram hoping
            the algorithm cares. You&rsquo;ve wondered if you could actually make a
            living from the thing you love most. You can.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/join/about-you"
              className="bg-lime text-black px-8 py-4 rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-transform"
            >
              Apply to sell &rarr;
            </Link>
            <span className="font-mono text-xs text-midgrey tracking-[0.1em]">
              15 MIN APPLICATION &middot; FREE FOR 6 MONTHS
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          THE PROBLEM — PAIN POINTS
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            / SOUND FAMILIAR?
          </div>
          <h2 className="font-display font-[800] text-[clamp(28px,5vw,48px)] leading-[1.0] tracking-[-0.02em] mb-10">
            You make incredible things.
            <br />
            <span className="text-midgrey">Selling them shouldn&rsquo;t be this hard.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              [
                "The 5am market setup",
                "You wake up before sunrise, load up the car, set up a stall in the cold, and hope enough people walk past. Some weekends you barely cover the table fee.",
              ],
              [
                "The Instagram void",
                "You post your best work and get 47 likes from other artists. The algorithm buries you. Followers don’t convert to buyers. It feels like shouting into the void.",
              ],
              [
                "The “get a real job” voice",
                "You’re talented enough that people compliment your work constantly — but not enough of them actually buy. The gap between “this is amazing” and a sale feels enormous.",
              ],
              [
                "The platform trap",
                "Etsy takes a cut, charges listing fees, and drowns you in a sea of mass-produced imports. You’re competing with factories, not other artists.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-dark1 border border-dark2 rounded-2xl p-6 hover:border-dark2/80 transition-colors"
              >
                <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-midgrey leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          THE SHIFT — WHAT IF
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-[800] text-[clamp(28px,5vw,52px)] leading-[1.0] tracking-[-0.02em] mb-6">
            What if your stall
            <br />
            <span className="text-lime">never closed?</span>
          </h2>
          <p className="text-lg text-lightgrey max-w-2xl mx-auto leading-relaxed mb-4">
            Imagine having your own storefront on a street full of other
            independent Australian artists. Open 24/7, no table fees, no
            algorithms deciding who sees your work.
          </p>
          <p className="text-lg text-lightgrey max-w-2xl mx-auto leading-relaxed">
            That&rsquo;s Makeshift. Think of it like the Rose St. Artists&rsquo;
            Market or Finders Keepers — but online, and always open. A curated
            marketplace where people come specifically to discover and buy from
            independent creators like you.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            / HOW IT WORKS
          </div>
          <h2 className="font-display font-bold text-3xl mb-10">
            From application to your first sale.
          </h2>
          <div className="space-y-8">
            {[
              [
                "Apply",
                "Fill out a quick application — who you are, what you make, and where people can see your work. Takes about 15 minutes. We review within a week.",
              ],
              [
                "Set up your store",
                "Get your own page at makeshift-au.com/artist/your-name. Upload your work, set your prices, write your story. We help you make it look incredible.",
              ],
              [
                "Start selling",
                "Customers discover you through the marketplace, browse your work, and buy directly. We handle checkout, payments, and customer comms. You get paid weekly via Stripe.",
              ],
            ].map(([title, desc], i) => (
              <div key={title} className="flex gap-5 items-start">
                <div className={NUM_STYLE}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">{title}</h3>
                  <p className="text-lightgrey leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHAT'S INCLUDED
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,255,0,0.04)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            / WHAT YOU GET
          </div>
          <h2 className="font-display font-bold text-3xl mb-10">
            Everything you need. Nothing you don&rsquo;t.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              "Your own artist page & storefront",
              "Product listings with images & pricing",
              "Built-in checkout & payment processing",
              "Weekly payouts straight to your bank",
              "Real-time analytics & visitor insights",
              "Commission & custom order engine",
              "Featured placement on the homepage",
              "No listing fees, ever",
              "Fair 10% commission on sales only",
              "Your copyright, your prices, your terms",
              "A real community, not a feed",
              "Leave anytime — no lock-in contracts",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <CheckIcon />
                <span className="text-lightgrey">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHO IT'S FOR
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            / WHO IT&rsquo;S FOR
          </div>
          <h2 className="font-display font-bold text-3xl mb-3">
            If you make it by hand, you belong here.
          </h2>
          <p className="text-lightgrey mb-8 max-w-2xl">
            We&rsquo;re building a marketplace that represents the full spectrum of
            independent Australian creativity.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Visual Artists",
              "Fashion Designers",
              "Ceramicists",
              "Jewellery Makers",
              "Musicians",
              "Tattoo Artists",
              "Graphic Designers",
              "Photographers",
              "Sculptors",
              "Printmakers",
              "Textile Artists",
              "Illustrators",
            ].map((d) => (
              <span
                key={d}
                className="bg-dark1 border border-dark2 rounded-full px-5 py-2.5 text-sm text-lightgrey hover:border-lime hover:text-lime transition-colors"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOUNDING ARTIST OFFER
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark1 border-2 border-lime rounded-2xl p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div>
                <div className="font-mono text-xs text-lime tracking-[0.15em] mb-2">
                  LIMITED OFFER
                </div>
                <h2 className="font-display font-[800] text-3xl md:text-4xl">
                  Founding Artist Plan
                </h2>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-[800] text-4xl md:text-5xl text-lime">
                  $0
                </span>
                <span className="text-midgrey text-sm">/mo for 6 months</span>
              </div>
            </div>

            <p className="text-lightgrey leading-relaxed mb-6">
              We&rsquo;re looking for 25 founding artists to help shape Makeshift
              from the ground floor. In exchange for being early, you get a
              completely free subscription for your first 6 months. After that,
              it&rsquo;s just $15/mo — and you can leave anytime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                ["$0/mo", "First 6 months free"],
                ["10%", "Commission on sales"],
                ["Weekly", "Payouts via Stripe"],
              ].map(([big, small]) => (
                <div
                  key={big}
                  className="bg-black/40 rounded-xl px-5 py-4 text-center"
                >
                  <div className="font-display font-[800] text-2xl text-lime">
                    {big}
                  </div>
                  <div className="font-mono text-[11px] text-midgrey tracking-[0.1em] mt-1">
                    {small.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-midgrey">Founding artist spots</span>
                <span className="text-lime font-mono text-xs tracking-[0.1em]">
                  1/25 CLAIMED
                </span>
              </div>
              <div className="w-full bg-dark2 rounded-full h-2.5">
                <div
                  className="bg-lime rounded-full h-2.5 transition-all"
                  style={{ width: "4%" }}
                />
              </div>
            </div>

            <Link
              href="/join/about-you"
              className="block w-full bg-lime text-black py-4 rounded-full font-semibold text-lg text-center hover:-translate-y-0.5 transition-transform"
            >
              Claim your spot &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          LOCAL COMMUNITY SECTION
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            / BUILT IN MELBOURNE
          </div>
          <h2 className="font-display font-[800] text-[clamp(28px,5vw,48px)] leading-[1.0] tracking-[-0.02em] mb-6">
            From the laneways
            <br />
            to the internet.
          </h2>
          <div className="text-lightgrey leading-relaxed space-y-4 max-w-2xl">
            <p>
              Makeshift started from the same place you are — walking through the
              Rose St. Market, browsing stalls at Finders Keepers, discovering
              incredible artists tucked away in Fitzroy studios and Collingwood
              warehouses.
            </p>
            <p>
              We saw artists doing extraordinary work but struggling to reach
              anyone beyond the Sunday market crowd. The talent was there. The
              platform wasn&rsquo;t.
            </p>
            <p>
              So we built one. Australian-owned, community-first, designed
              specifically for independent creators who make real things. No
              dropshippers. No mass-produced imports. Just authentic work from
              people who care about their craft.
            </p>
            <p className="text-white font-semibold">
              You&rsquo;re not just joining a marketplace — you&rsquo;re helping
              build the future of independent art in Australia, right from the
              start.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20 border-t border-dark2">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            / QUESTIONS
          </div>
          <h2 className="font-display font-bold text-3xl mb-8">
            Before you ask.
          </h2>
          <div className="space-y-6">
            {[
              [
                "What does it cost?",
                "Nothing for your first 6 months as a founding artist. After that, it’s $15/month. We also take 10% commission on sales — only when you actually sell something. No listing fees, no hidden charges.",
              ],
              [
                "How long does approval take?",
                "We review applications within 5–7 business days. We’re looking for quality and authenticity, not follower counts. If your work is genuinely yours and you’re based in Australia, you’re probably a great fit.",
              ],
              [
                "Can I sell commissions or custom work?",
                "Yes. The platform has a built-in commission engine — enquiry forms, deposit collection, and milestone approvals are all included.",
              ],
              [
                "What about shipping?",
                "You handle shipping directly to buyers. You set your own shipping rates and lead times. For digital work and music, there’s no shipping required at all.",
              ],
              [
                "Can I leave if it’s not for me?",
                "Anytime. No lock-in, no exit fees. We’d rather you stay because it’s working, not because you’re stuck in a contract.",
              ],
              [
                "I’m a musician — does this work for me?",
                "Absolutely. Musicians get streaming links on their artist page, can sell merch and physical media, and earn from plays. It’s built for all kinds of creators.",
              ],
            ].map(([q, a]) => (
              <div key={q} className="border-b border-dark2 pb-6">
                <h3 className="font-display font-bold text-lg mb-2">{q}</h3>
                <p className="text-sm text-midgrey leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-24 border-t border-dark2 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,255,0,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="font-display font-[800] text-[clamp(32px,6vw,64px)] leading-[0.92] tracking-[-0.02em] mb-5">
            Stop waiting for
            <br />
            permission to
            <br />
            <span className="text-lime">do what you love.</span>
          </h2>
          <p className="text-lg text-lightgrey mb-10 max-w-xl mx-auto">
            24 founding artist spots remaining. Apply today and be part of
            something from the very beginning.
          </p>
          <Link
            href="/join/about-you"
            className="inline-block bg-lime text-black px-10 py-4 rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-transform"
          >
            Start your application &rarr;
          </Link>
          <div className="font-mono text-xs text-midgrey tracking-[0.1em] mt-4">
            15 MINUTES &middot; NO CREDIT CARD &middot; REVIEWED WITHIN A WEEK
          </div>
        </div>
      </section>
    </>
  );
}
