import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join — Review & Submit" };

export default function JoinSubmitPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / JOIN / STEP 4 OF 4
        </div>
        <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-8">
          Review & Submit.
        </h1>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {["About You", "Your Work", "Your Page", "Submit"].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${i < 4 ? "bg-lime" : "bg-dark2"}`} />
              <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")} {s.toUpperCase()}
              </div>
            </div>
          ))}
        </div>


        <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-8">
          <h3 className="font-display font-bold text-xl mb-4">Application summary</h3>
          <div className="space-y-3 text-sm">
            {[
              ["Name", "Your Name Here"],
              ["Email", "you@email.com"],
              ["Discipline", "Ceramics, Visual Art"],
              ["City", "Melbourne, VIC"],
              ["URL", "makeshift-au.com/artist/your-name"],
              ["Images", "6 uploaded"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-dark2 pb-3">
                <span className="text-midgrey">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-8">
          <h3 className="font-display font-bold text-lg mb-3">What happens next</h3>
          <div className="space-y-3 text-sm text-lightgrey">
            {[
              ["Today", "Application received and queued for review"],
              ["1-3 days", "Portfolio reviewed by our team"],
              ["3-5 days", "Decision emailed to you"],
              ["Day 5-7", "If approved: set up Stripe + go live"],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4">
                <span className="font-mono text-xs text-lime tracking-[0.1em] w-20 flex-shrink-0">{t}</span>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input type="checkbox" className="accent-lime mt-1" />
          <span className="text-sm text-lightgrey">
            I agree to the <a href="/creator-terms" className="text-lime underline">Creator Terms</a> and
            the <a href="/terms" className="text-lime underline">Terms of Service</a>.
          </span>
        </label>


        <div className="flex justify-between mt-8">
          <Link href="/join/your-page" className="border border-dark2 text-white px-6 py-3 rounded-full text-sm hover:border-lime hover:text-lime transition-colors">
            &larr; Back
          </Link>
          <Link href="/join/thanks" className="bg-lime text-black px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-transform">
            Submit application &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}