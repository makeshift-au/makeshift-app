import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
            / CHECKOUT
          </div>
          <h1 className="font-display font-[800] text-4xl tracking-[-0.02em] mb-8">
            Secure checkout.
          </h1>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl mb-4">Contact</h2>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none mb-3"
            />
            <input
              type="tel"
              placeholder="Phone (for delivery updates)"
              className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none"
            />
          </div>

          {/* Shipping */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl mb-4">Shipping</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="First name" className="bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" />
              <input placeholder="Last name" className="bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" />
            </div>
            <input placeholder="Address" className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none mb-3" />
            <div className="grid grid-cols-3 gap-3">
              <input placeholder="City" className="bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" />
              <input placeholder="State" className="bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" />
              <input placeholder="Postcode" className="bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" />
            </div>
          </div>

          {/* Payment */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl mb-4">Payment</h2>
            <div className="flex gap-2 mb-4">
              {["Card", "Apple Pay", "Google Pay", "Afterpay"].map((m) => (
                <button
                  key={m}
                  className="bg-dark1 border border-dark2 text-lightgrey px-4 py-2 rounded-full text-sm font-mono hover:border-lime hover:text-lime transition-colors first:bg-lime first:text-black first:border-lime first:font-bold"
                >
                  {m}
                </button>
              ))}
            </div>
            <input placeholder="Card number" className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none mb-3" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="MM / YY" className="bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" />
              <input placeholder="CVC" className="bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" />
            </div>
          </div>

          <button className="w-full bg-lime text-black py-4 rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-transform">
            Pay $320.00 &rarr;
          </button>
          <p className="font-mono text-xs text-midgrey tracking-[0.05em] mt-3 text-center">
            SECURED BY STRIPE &middot; 256-BIT ENCRYPTION
          </p>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-dark1 border border-dark2 rounded-2xl p-6 sticky top-24">
            <h3 className="font-display font-bold text-lg mb-4">
              Order summary
            </h3>
            <div className="flex gap-4 pb-4 border-b border-dark2">
              <div className="bg-acid w-20 h-20 rounded-xl flex-shrink-0" />
              <div>
                <div className="font-display font-bold">Lime Viper</div>
                <div className="text-sm text-midgrey">Maccs Customs</div>
                <div className="text-sm text-midgrey">Custom leather jacket</div>
              </div>
            </div>
            <div className="space-y-2 py-4 text-sm">
              <div className="flex justify-between">
                <span className="text-midgrey">Subtotal</span>
                <span>$320.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-midgrey">Shipping</span>
                <span className="text-lime">Free</span>
              </div>
            </div>
            <div className="border-t border-dark2 pt-4 flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span className="text-lime">$320.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}