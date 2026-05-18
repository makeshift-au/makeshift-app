"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="font-display font-[800] text-3xl tracking-[0.05em] mb-2 inline-block">
            MAKE<span className="text-lime">SHIFT</span>
          </Link>
          <p className="text-midgrey text-sm">Reset your password</p>
        </div>

        <div className="bg-dark1 border border-dark2 rounded-2xl p-8">
          {status === "sent" ? (
            <>
              <h2 className="font-display font-bold text-xl mb-2">Check your inbox</h2>
              <p className="text-sm text-midgrey mb-4">
                We sent a password reset link to{" "}
                <span className="text-white">{email}</span>.
                Click the link in the email to set a new password.
              </p>
              <p className="text-xs text-midgrey mb-6">
                Don&rsquo;t see it? Check your spam folder.
              </p>
              <Link
                href="/login"
                className="text-sm text-lime hover:underline"
              >
                ← Back to login
              </Link>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="font-display font-bold text-xl mb-2">Forgot password?</h2>
              <p className="text-sm text-midgrey mb-6">
                Enter your email and we&rsquo;ll send you a link to reset your password.
              </p>

              {status === "error" && (
                <div className="bg-pink/10 border border-pink/30 rounded-lg px-4 py-3 text-sm text-pink mb-4">
                  {errorMsg}
                </div>
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full bg-black border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none mb-5"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-lime text-black py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === "loading" ? "Sending..." : "Send reset link →"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-midgrey mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-lime hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
