"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/forms";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const result = await submitContact(formData);
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
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">/ CONTACT</div>
          <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-4">
            Message sent.
          </h1>
          <p className="text-lg text-lightgrey mb-8">
            Thanks for reaching out. We&rsquo;ll get back to you soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-lime hover:underline font-mono text-sm"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
          / CONTACT
        </div>
        <h1 className="font-display font-[800] text-[clamp(48px,8vw,72px)] leading-[0.92] tracking-[-0.02em] mb-4">
          Say hello.
        </h1>
        <p className="text-lg text-lightgrey mb-10">
          Got a question, feedback, or just want to chat? We read every message.
        </p>

        {status === "error" && (
          <div className="bg-pink/10 border border-pink/30 rounded-lg px-4 py-3 text-sm text-pink mb-6">
            {errorMsg}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Name</label>
            <input name="name" required className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" placeholder="Your name" />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Email</label>
            <input name="email" type="email" required className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Category</label>
            <select name="category" className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white focus:border-lime focus:outline-none">
              <option value="general">General enquiry</option>
              <option value="buying">Buying / orders</option>
              <option value="artist">Artist application</option>
              <option value="press">Press / media</option>
              <option value="partnership">Partnership</option>
              <option value="bug">Bug report</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs text-midgrey tracking-[0.1em] uppercase mb-2">Message</label>
            <textarea name="message" required rows={6} className="w-full bg-dark1 border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none resize-none" placeholder="What's on your mind?" />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-lime text-black py-4 rounded-full font-semibold text-lg hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send message →"}
          </button>
        </form>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            ["Email", "makeshift.melb@gmail.com"],
            ["Instagram", "@makeshift.au"],
            ["Location", "Melbourne, VIC"],
          ].map(([label, value]) => (
            <div key={label} className="bg-dark1 border border-dark2 rounded-2xl p-5">
              <div className="font-mono text-xs text-midgrey tracking-[0.1em] mb-1">{label!.toUpperCase()}</div>
              <div className="text-lime text-sm">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
