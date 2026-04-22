import Marquee from "@/components/Marquee";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Story" };

export default function StoryPage() {
  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16 border-b border-dark2">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
            / OUR STORY
          </div>
          <h1 className="font-display font-[800] text-[clamp(48px,8vw,88px)] leading-[0.92] tracking-[-0.03em] mb-6">
            The long
            <br />
            version.
          </h1>
        </div>
      </section>

      <Marquee />

      <article className="px-6 md:px-12 py-16">
        <div className="max-w-3xl mx-auto prose-invert">
          <p className="text-xl text-lightgrey leading-relaxed mb-8">
            Makeshift started as a question: why is it so hard for independent
            artists to sell their work online without losing their soul to an
            algorithm?
          </p>
          <p className="text-lightgrey leading-relaxed mb-8">
            Etsy became a search engine for mass-produced goods. Instagram became
            a pay-to-play billboard. Redbubble commoditised art into mugs and
            phone cases. The platforms that were supposed to help creators kept
            extracting more while giving less.
          </p>
          <p className="text-lightgrey leading-relaxed mb-8">
            In early 2026, sitting in a Fitzroy studio surrounded by artists who
            were incredible at making things but exhausted by selling them, the
            idea landed: build a marketplace that&rsquo;s curated, not
            algorithmic. That takes a fair cut, not a greedy one. That treats
            artists as the product, not the content.
          </p>
          <p className="text-lightgrey leading-relaxed mb-8">
            So that&rsquo;s what we&rsquo;re doing. One artist at a time, one
            sale at a time, starting in Melbourne and expanding from there. The
            first 50 artists pay half the fee for their first year. The
            community shapes the platform. And we stay bootstrapped so
            we&rsquo;re accountable to artists, not investors.
          </p>
          <p className="text-xl text-white leading-relaxed font-display font-bold">
            That&rsquo;s the whole story. We&rsquo;re just getting started.
          </p>
        </div>
      </article>
    </>
  );
}