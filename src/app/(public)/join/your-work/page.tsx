import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join — Your Work" };

export default function JoinYourworkPage() {
  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / JOIN / STEP 2 OF 4
        </div>
        <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-8">
          Your Work.
        </h1>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {["About You", "Your Work", "Your Page", "Submit"].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${i < 2 ? "bg-lime" : "bg-dark2"}`} />
              <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")} {s.toUpperCase()}
              </div>
            </div>
          ))}
        </div>


        <div className="space-y-5">
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-3">Discipline (pick all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Fashion", "Music", "Visual Art", "Ceramics", "Tattoo", "Jewellery", "Graphic", "Photography"].map((d) => (
                <label key={d} className="flex items-center gap-2 bg-dark1 border border-dark2 rounded-xl px-4 py-3 cursor-pointer hover:border-lime transition-colors">
                  <input type="checkbox" className="accent-lime" />
                  <span className="text-sm">{d}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Describe your work</label>
            <textarea rows={4} className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none resize-none" placeholder="Materials, process, what makes it yours..." />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Upload 4-8 images of your best work</label>
            <div className="border-2 border-dashed border-dark2 rounded-xl p-10 text-center hover:border-lime transition-colors cursor-pointer">
              <div className="font-mono text-sm text-midgrey">Drag & drop or click to upload</div>
              <div className="font-mono text-xs text-midgrey mt-1">JPG, PNG, WEBP — max 10MB each</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Price range</label>
              <select className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none">
                <option>Under $100</option><option>$100 – $300</option><option>$300 – $500</option><option>$500 – $1,000</option><option>$1,000+</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Lead time</label>
              <select className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none">
                <option>Ready to ship</option><option>1-2 weeks</option><option>2-4 weeks</option><option>4-8 weeks</option>
              </select>
            </div>
          </div>
        </div>


        <div className="flex justify-between mt-8">
          <Link href="/join/about-you" className="border border-dark2 text-white px-6 py-3 rounded-full text-sm hover:border-lime hover:text-lime transition-colors">
            &larr; Back
          </Link>
          <Link href="/join/your-page" className="bg-lime text-black px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-transform">
            Continue &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}