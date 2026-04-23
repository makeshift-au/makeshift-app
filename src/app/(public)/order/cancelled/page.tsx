import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Cancelled" };

export default function OrderCancelledPage() {
  return (
    <div className="px-6 md:px-12 py-24">
      <div className="max-w-xl mx-auto text-center">
        {/* Cancelled icon */}
        <div className="w-20 h-20 rounded-full bg-dark1 border-2 border-dark2 flex items-center justify-center mx-auto mb-8">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-midgrey">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <div className="font-mono text-sm text-midgrey tracking-[0.15em] mb-3">
          / CHECKOUT CANCELLED
        </div>
        <h1 className="font-display font-[800] text-4xl tracking-[-0.02em] mb-4">
          No worries.
        </h1>
        <p className="text-lightgrey text-lg leading-relaxed mb-8">
          Your checkout was cancelled and you haven&apos;t been charged.
          The piece is still available if you change your mind.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/browse"
            className="bg-lime text-black px-8 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Browse artists &rarr;
          </Link>
          <Link
            href="/"
            className="border border-dark2 text-white px-8 py-3.5 rounded-full hover:border-lime hover:text-lime transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
