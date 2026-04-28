import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join Makeshift" };

export default function JoinPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / JOIN MAKESHIFT
        </div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,80px)] leading-[0.92] tracking-[-0.03em] mb-6">
          Apply to sell.
        </h1>
        <p className="text-xl text-lightgrey mb-8 max-w-lg mx-auto">
          4 short steps, about 15 minutes. We review within a week.
        </p>

        <div className="bg-dark1 border border-lime rounded-2xl p-8 mb-10 text-left">
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="font-display font-bold text-xl text-lime">
              Founding Artist Offer
            </h3>
            <span className="font-mono text-sm text-lime tracking-[0.1em]">
              47/50
            </span>
          </div>
          <p className="text-lightgrey mb-4">
            Founding artists get a <strong className="text-white">free subscription for 6 months</strong>.
            10% commission on sales — same as everyone. No lock-in.
          </p>
          <div className="w-full bg-dark2 rounded-full h-2">
            <div className="bg-lime rounded-full h-2" style={{ width: "94%" }} />
          </div>
        </div>

        <Link
          href="/join/about-you"
          className="inline-block bg-lime text-black px-10 py-4 rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-transform"
        >
          Start application &rarr;
        </Link>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["01 About You", "02 Your Work", "03 Your Page", "04 Submit"].map(
            (s) => (
              <div key={s}>
                <div className="h-1 bg-dark2 rounded-full mb-2" />
                <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                  {s.toUpperCase()}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}