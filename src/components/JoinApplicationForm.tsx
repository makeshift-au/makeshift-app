"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitApplication } from "@/app/actions/forms";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  bio: string;
  disciplines: string[];
  workDescription: string;
  priceRange: string;
  leadTime: string;
  slugPreference: string;
  instagram: string;
  website: string;
  whyMakeshift: string;
  agreeTerms: boolean;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "VIC",
  bio: "",
  disciplines: [],
  workDescription: "",
  priceRange: "$100 – $300",
  leadTime: "1-2 weeks",
  slugPreference: "",
  instagram: "",
  website: "",
  whyMakeshift: "",
  agreeTerms: false,
};

const DISCIPLINES = [
  "Fashion",
  "Music",
  "Visual Art",
  "Ceramics",
  "Tattoo",
  "Jewellery",
  "Graphic",
  "Photography",
];

const STEPS = ["About You", "Your Work", "Your Page", "Submit"];

const inputCls =
  "w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none";

export default function JoinApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const toggleDiscipline = (d: string) =>
    setForm((f) => ({
      ...f,
      disciplines: f.disciplines.includes(d)
        ? f.disciplines.filter((x) => x !== d)
        : [...f.disciplines, d],
    }));

  // Validation per step
  function canAdvance() {
    if (step === 0) return !!form.firstName && !!form.email;
    if (step === 1) return form.disciplines.length > 0;
    if (step === 2) return true; // all optional
    if (step === 3) return form.agreeTerms;
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    const fd = new FormData();
    fd.set("full_name", `${form.firstName} ${form.lastName}`.trim());
    fd.set("email", form.email);
    fd.set("phone", form.phone);
    fd.set("city", form.city);
    fd.set("state", form.state);
    fd.set("bio", form.bio);
    form.disciplines.forEach((d) => fd.append("disciplines", d.toLowerCase()));
    fd.set("work_description", form.workDescription);
    fd.set("price_range", form.priceRange);
    fd.set("lead_time", form.leadTime);
    fd.set("slug_preference", form.slugPreference);
    fd.set("instagram", form.instagram);
    fd.set("website", form.website);
    fd.set("why_makeshift", form.whyMakeshift);

    const result = await submitApplication(fd);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    router.push("/join/thanks");
  }

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / JOIN / STEP {step + 1} OF 4
        </div>
        <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-8">
          {STEPS[step]}.
        </h1>

        {/* Progress bar */}
        <div className="flex gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1 rounded-full mb-2 ${i <= step ? "bg-lime" : "bg-dark2"}`}
              />
              <div className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")} {s.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: About You */}
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                  First name *
                </label>
                <input
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                  Last name
                </label>
                <input
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                  City
                </label>
                <input
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                  State
                </label>
                <select
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  className={inputCls}
                >
                  {["VIC", "NSW", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map(
                    (s) => (
                      <option key={s}>{s}</option>
                    ),
                  )}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                One-line bio
              </label>
              <input
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                className={inputCls}
                placeholder="What do you make, in one sentence?"
              />
            </div>
          </div>
        )}

        {/* Step 2: Your Work */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-3">
                Discipline (pick all that apply) *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DISCIPLINES.map((d) => (
                  <label
                    key={d}
                    className={`flex items-center gap-2 bg-dark1 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                      form.disciplines.includes(d)
                        ? "border-lime text-lime"
                        : "border-dark2 hover:border-lime"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-lime"
                      checked={form.disciplines.includes(d)}
                      onChange={() => toggleDiscipline(d)}
                    />
                    <span className="text-sm">{d}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Describe your work
              </label>
              <textarea
                rows={4}
                value={form.workDescription}
                onChange={(e) => set("workDescription", e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder="Materials, process, what makes it yours..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                  Price range
                </label>
                <select
                  value={form.priceRange}
                  onChange={(e) => set("priceRange", e.target.value)}
                  className={inputCls}
                >
                  <option>Under $100</option>
                  <option>$100 – $300</option>
                  <option>$300 – $500</option>
                  <option>$500 – $1,000</option>
                  <option>$1,000+</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                  Lead time
                </label>
                <select
                  value={form.leadTime}
                  onChange={(e) => set("leadTime", e.target.value)}
                  className={inputCls}
                >
                  <option>Ready to ship</option>
                  <option>1-2 weeks</option>
                  <option>2-4 weeks</option>
                  <option>4-8 weeks</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Your Page */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Choose your URL
              </label>
              <div className="flex items-center bg-dark1 border border-dark2 rounded-xl overflow-hidden">
                <span className="px-4 py-3.5 text-midgrey text-sm bg-dark2 border-r border-dark2 whitespace-nowrap">
                  makeshift.au/artist/
                </span>
                <input
                  value={form.slugPreference}
                  onChange={(e) => set("slugPreference", e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3.5 text-white focus:outline-none"
                  placeholder="your-name"
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Instagram handle
              </label>
              <input
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
                className={inputCls}
                placeholder="@yourname"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Website (optional)
              </label>
              <input
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                className={inputCls}
                placeholder="https://"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">
                Why Makeshift? (optional)
              </label>
              <textarea
                rows={3}
                value={form.whyMakeshift}
                onChange={(e) => set("whyMakeshift", e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder="What drew you here?"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 3 && (
          <div>
            <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-8">
              <h3 className="font-display font-bold text-xl mb-4">
                Application summary
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  ["Name", `${form.firstName} ${form.lastName}`.trim()],
                  ["Email", form.email],
                  ["Discipline", form.disciplines.join(", ") || "—"],
                  [
                    "Location",
                    [form.city, form.state].filter(Boolean).join(", ") || "—",
                  ],
                  [
                    "URL",
                    form.slugPreference
                      ? `makeshift.au/artist/${form.slugPreference}`
                      : "—",
                  ],
                  ["Price range", form.priceRange],
                  ["Lead time", form.leadTime],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between border-b border-dark2 pb-3"
                  >
                    <span className="text-midgrey">{k}</span>
                    <span className="text-right max-w-[60%]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-8">
              <h3 className="font-display font-bold text-lg mb-3">
                What happens next
              </h3>
              <div className="space-y-3 text-sm text-lightgrey">
                {[
                  ["Today", "Application received and queued for review"],
                  ["1-3 days", "Portfolio reviewed by our team"],
                  ["3-5 days", "Decision emailed to you"],
                  ["Day 5-7", "If approved: set up Stripe + go live"],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-4">
                    <span className="font-mono text-xs text-lime tracking-[0.1em] w-20 flex-shrink-0">
                      {t}
                    </span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                className="accent-lime mt-1"
                checked={form.agreeTerms}
                onChange={(e) => set("agreeTerms", e.target.checked)}
              />
              <span className="text-sm text-lightgrey">
                I agree to the{" "}
                <a
                  href="/creator-terms"
                  target="_blank"
                  className="text-lime underline"
                >
                  Creator Terms
                </a>{" "}
                and the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-lime underline"
                >
                  Terms of Service
                </a>
                .
              </span>
            </label>
          </div>
        )}

        {error && (
          <p className="text-pink text-sm mb-4">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => (step === 0 ? router.push("/join") : setStep(step - 1))}
            className="border border-dark2 text-white px-6 py-3 rounded-full text-sm hover:border-lime hover:text-lime transition-colors"
          >
            &larr; Back
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
              className="bg-lime text-black px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Continue &rarr;
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canAdvance() || submitting}
              className="bg-lime text-black px-8 py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? "Submitting…" : "Submit application →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
