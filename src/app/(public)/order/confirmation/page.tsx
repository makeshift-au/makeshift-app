import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Confirmed" };

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="px-6 md:px-12 py-24">
      <div className="max-w-xl mx-auto text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-lime/10 border-2 border-lime flex items-center justify-center mx-auto mb-8">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-lime">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / ORDER CONFIRMED
        </div>
        <h1 className="font-display font-[800] text-4xl tracking-[-0.02em] mb-4">
          You&apos;re locked in.
        </h1>
        <p className="text-lightgrey text-lg leading-relaxed mb-8">
          Your order has been placed and the artist has been notified.
          You&apos;ll receive a confirmation email shortly with your order details.
        </p>

        <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-display font-bold text-lg mb-3">What happens next?</h3>
          <div className="space-y-4 text-sm text-lightgrey">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-lime/10 text-lime flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>The artist receives your order and begins crafting your piece.</span>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-lime/10 text-lime flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>You&apos;ll get an email when it ships, with tracking info.</span>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-lime/10 text-lime flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>Your one-of-a-kind piece arrives at your door.</span>
            </div>
          </div>
        </div>

        {session_id && (
          <p className="font-mono text-xs text-midgrey tracking-[0.05em] mb-6">
            REF: {session_id.slice(0, 20)}…
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <Link
            href="/browse"
            className="bg-lime text-black px-8 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Keep browsing &rarr;
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
