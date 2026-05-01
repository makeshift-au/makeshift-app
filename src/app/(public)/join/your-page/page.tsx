import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join — Your Page" };

export default function JoinYourpagePage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / JOIN / STEP 3 OF 4
        </div>
        <h1 className="font-display font-[800] text-3xl md:text-5xl leading-[0.92] tracking-[-0.02em] mb-8">
          Your Page.
        </h1>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {["About You", "Your Work", "Your Page", "Submit"].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${i < 3 ? "bg-lime" : "bg-dark2"}`} />
              <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")} {s.toUpperCase()}
              </div>
            </div>
          ))}
        </div>


        <div className="space-y-5">
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Choose your URL</label>
            <div className="flex items-center bg-dark1 border border-dark2 rounded-xl overflow-hidden">
              <span className="px-4 py-3.5 text-midgrey text-sm bg-dark2 border-r border-dark2 whitespace-nowrap">makeshift-au.com/artist/</span>
              <input className="flex-1 bg-transparent px-4 py-3.5 text-white focus:outline-none" placeholder="your-name" />
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Instagram handle</label>
            <input className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" placeholder="@yourname" />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Website (optional)</label>
            <input className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" placeholder="https://" />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Hero image for your page</label>
            <div className="border-2 border-dashed border-dark2 rounded-xl p-10 text-center hover:border-lime transition-colors cursor-pointer">
              <div className="font-mono text-sm text-midgrey">Upload hero image (landscape, min 1600px wide)</div>
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Why Makeshift? (optional)</label>
            <textarea rows={3} className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none resize-none" placeholder="What drew you here?" />
          </div>
        </div>


        <div className="flex justify-between mt-8">
          <Link href="/join/your-work" className="border border-dark2 text-white px-6 py-3 rounded-full text-sm hover:border-lime hover:text-lime transition-colors">
            &larr; Back
          </Link>
          <Link href="/join/submit" className="bg-lime text-black px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-transform">
            Continue &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}