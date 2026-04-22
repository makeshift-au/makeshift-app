import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join — About You" };

export default function JoinAboutyouPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / JOIN / STEP 1 OF 4
        </div>
        <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-8">
          About You.
        </h1>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {["About You", "Your Work", "Your Page", "Submit"].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${i < 1 ? "bg-lime" : "bg-dark2"}`} />
              <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")} {s.toUpperCase()}
              </div>
            </div>
          ))}
        </div>


        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">First name</label>
              <input className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" />
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Last name</label>
              <input className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Email</label>
            <input type="email" className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Phone</label>
            <input type="tel" className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">City</label>
              <input className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" />
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">State</label>
              <select className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none">
                <option>VIC</option><option>NSW</option><option>QLD</option><option>WA</option><option>SA</option><option>TAS</option><option>ACT</option><option>NT</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">One-line bio</label>
            <input className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none" placeholder="What do you make, in one sentence?" />
          </div>
        </div>


        <div className="flex justify-between mt-8">
          <Link href="/join" className="border border-dark2 text-white px-6 py-3 rounded-full text-sm hover:border-lime hover:text-lime transition-colors">
            &larr; Back
          </Link>
          <Link href="/join/your-work" className="bg-lime text-black px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-transform">
            Continue &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}