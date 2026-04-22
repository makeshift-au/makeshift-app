"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
      },
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
          <p className="text-midgrey text-sm">Creator login</p>
        </div>

        <div className="bg-dark1 border border-dark2 rounded-2xl p-8">
          {status === "sent" ? (
            <>
              <h2 className="font-display font-bold text-xl mb-2">Check your inbox</h2>
              <p className="text-sm text-midgrey mb-4">
                We sent a magic link to <span className="text-white">{email}</span>.
                Click the link in the email to log in.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm text-lime hover:underline"
              >
                Use a different email
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="font-display font-bold text-xl mb-2">Welcome back</h2>
              <p className="text-sm text-midgrey mb-6">
                Enter your email and we&rsquo;ll send you a magic link.
              </p>

              {(status === "error" || searchParams.get("error")) && (
                <div className="bg-pink/10 border border-pink/30 rounded-lg px-4 py-3 text-sm text-pink mb-4">
                  {errorMsg || "Authentication failed. Please try again."}
                </div>
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full bg-black border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none mb-4"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-lime text-black py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === "loading" ? "Sending..." : "Send magic link →"}
              </button>
              <p className="text-xs text-midgrey mt-4 text-center">
                No password needed. Check your inbox.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-midgrey mt-6">
          Don&rsquo;t have an account?{" "}
          <Link href="/join" className="text-lime hover:underline">
            Apply to sell
          </Link>
        </p>
      </div>
    </div>
  );
}
