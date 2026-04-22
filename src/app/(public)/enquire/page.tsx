"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry } from "@/app/actions/forms";

export default function EnquirePage() {
  return (
    <Suspense>
      <EnquireForm />
    </Suspense>
  );
}

function EnquireForm() {
  const searchParams = useSearchParams();
  const artistSlug = searchParams.get("artist") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const result = await submitEnquiry(formData);
    if (result.error) {
      setStatus("error");
      setErrorMsg(result.error);
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="px-6 md:px-12 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">/ ENQUIRY SENT</div>
          <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-4">
            Nice one.
          </h1>
          <p className="text-lg text-lightgrey mb-8">
            Your enquiry has been sent to the artist. They&rsquo;ll get back to you within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / ENQUIRE / COMMISSION
        </div>
        <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-4">
          Let&rsquo;s make
          <br />
          something.
        </h1>
        <p className="text-lg text-lightgrey mb-10">
          Tell the artist what you&rsquo;re after. They&rsquo;ll get back to you
          within 48 hours with a quote and timeline.
        </p>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {["About you", "What you want", "References", "Timing"].map(
            (step, i) => (
              <div key={step} className="flex-1">
                <div
                  className={`h-1 rounded-full mb-2 ${
                    i === 0 ? "bg-lime" : "bg-dark2"
                  }`}
                />
                <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                  {String(i + 1).padStart(2, "0")} {step.toUpperCase()}
                </div>
              </div>
            ),
          )}
        </div>

        {status === "error" && (
          <div className="bg-pink/10 border border-pink/30 rounded-lg px-4 py-3 text-sm text-pink mb-6">
            {errorMsg}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <input type="hidden" name="artist" value={artistSlug} />
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Your name
            </label>
            <input
              name="name"
              required
              className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              What are you looking for?
            </label>
            <textarea
              name="brief"
              required
              rows={5}
              className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none resize-none"
              placeholder="Describe your idea, size, materials, anything that helps..."
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Budget range
            </label>
            <select name="budget" className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none">
              <option value="under-200">Under $200</option>
              <option value="200-500">$200 – $500</option>
              <option value="500-1000">$500 – $1,000</option>
              <option value="1000+">$1,000+</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
              Timeline
            </label>
            <select name="timeline" className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none">
              <option value="asap">ASAP</option>
              <option value="2-4-weeks">2–4 weeks</option>
              <option value="1-2-months">1–2 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-lime text-black py-4 rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send enquiry →"}
          </button>
        </form>
      </div>
    </div>
  );
}
