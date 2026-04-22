import Link from "next/link";
import Marquee from "@/components/Marquee";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16 border-b border-dark2">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
            / ABOUT
          </div>
          <h1 className="font-display font-[800] text-[clamp(48px,8vw,88px)] leading-[0.92] tracking-[-0.03em] mb-6">
            By artists,
            <br />
            for artists.
          </h1>
          <p className="text-xl text-lightgrey leading-relaxed max-w-2xl">
            Makeshift is a curated online marketplace for independent Australian
            artists and creators. We hand-approve every seller, take 10% per
            sale (no listing fees, no subscription), and pay out weekly. Based in
            Melbourne, open to all of Australia.
          </p>
        </div>
      </section>

      <Marquee />

      <section className="px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            /01
          </div>
          <h2 className="font-display font-bold text-3xl mb-6">
            What we believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              [
                "Curation over volume",
                "We say no to 70% of applications. Every artist here has been personally reviewed and approved.",
              ],
              [
                "Fair fees, always",
                "10% per sale. That's it. No listing fees, no featured-placement charges, no hidden take rates.",
              ],
              [
                "Artists own their work",
                "You keep 100% of your copyright. We never claim rights over your images, descriptions, or name.",
              ],
              [
                "Community first",
                "Private Slack, quarterly meetups in Melbourne, and a team that actually answers email.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-dark1 border border-dark2 rounded-2xl p-6"
              >
                <h3 className="font-display font-bold text-lg mb-2">
                  {title}
                </h3>
                <p className="text-lightgrey text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-dark2">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-sm text-lime tracking-[0.1em] mb-2">
            /02
          </div>
          <h2 className="font-display font-bold text-3xl mb-4">
            Who&rsquo;s behind this
          </h2>
          <div className="bg-char w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl">Jordan McCorkell</h3>
          <p className="text-midgrey mb-4">Founder · Melbourne</p>
          <p className="text-lightgrey max-w-lg mx-auto leading-relaxed">
            One person, one laptop, one mission: give independent Australian
            artists a marketplace that actually works for them. No VC money, no
            corporate strategy deck — just artists selling their work on their
            terms.
          </p>
        </div>
      </section>
    </>
  );
}