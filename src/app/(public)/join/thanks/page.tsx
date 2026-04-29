import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Application Submitted" };

export default function JoinThanksPage() {
  return (
    <div className="px-6 md:px-12 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-8xl mb-6">★</div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,72px)] leading-[0.92] tracking-[-0.03em] mb-4">
          See you soon.
        </h1>
        <p className="text-xl text-lightgrey mb-10 max-w-lg mx-auto">
          Your application is in. We&rsquo;ll review it within 5-7 business days
          and email you with the outcome.
        </p>

        <div className="bg-dark1 border border-dark2 rounded-2xl p-6 text-left mb-10">
          <h3 className="font-display font-bold text-lg mb-4">While you wait</h3>
          <div className="space-y-3 text-sm text-lightgrey">
            <div className="flex gap-3">
              <span className="text-lime">1.</span>
              <span>Follow <strong className="text-white">@makeshift.au</strong> on Instagram</span>
            </div>
            <div className="flex gap-3">
              <span className="text-lime">2.</span>
              <span>Get your best 4-8 photos ready for your page</span>
            </div>
            <div className="flex gap-3">
              <span className="text-lime">3.</span>
              <span>Read the <Link href="/creator-terms" className="text-lime underline">Creator Terms</Link> if you haven&rsquo;t already</span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block bg-lime text-black px-8 py-4 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
        >
          Back to Makeshift &rarr;
        </Link>
      </div>
    </div>
  );
}