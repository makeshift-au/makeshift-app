"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"init" | "ready" | "loading" | "success" | "error">("init");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  // On mount, exchange the code from URL for a session (PKCE flow)
  useEffect(() => {
    const supabase = createClient();

    // Check for code in URL query params (PKCE redirect from Supabase)
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error("Code exchange failed:", error.message);
          // Still allow the form — user might already have a session
        }
        // Clean the URL
        window.history.replaceState({}, "", "/reset-password");
        setStatus("ready");
      });
    } else {
      // No code — check if user already has a valid session (e.g. came via onAuthStateChange)
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          setStatus("ready");
        } else {
          // Listen for PASSWORD_RECOVERY event from hash fragment (implicit flow fallback)
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === "PASSWORD_RECOVERY") {
              setStatus("ready");
            }
          });

          // Give it a moment, then show form anyway or redirect
          setTimeout(() => {
            setStatus((prev) => {
              if (prev === "init") {
                // No session, no recovery event — redirect to forgot-password
                router.push("/forgot-password");
                return prev;
              }
              return prev;
            });
          }, 3000);

          return () => subscription.unsubscribe();
        }
      });
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      setStatus("error");
      return;
    }

    if (password !== confirm) {
      setErrorMsg("Passwords don't match.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="font-display font-[800] text-3xl tracking-[0.05em] mb-2 inline-block">
            MAKE<span className="text-lime">SHIFT</span>
          </Link>
          <p className="text-midgrey text-sm">Set a new password</p>
        </div>

        <div className="bg-dark1 border border-dark2 rounded-2xl p-8">
          {status === "init" ? (
            <div className="text-center py-4">
              <div className="font-mono text-sm text-midgrey">Verifying your reset link...</div>
            </div>
          ) : status === "success" ? (
            <>
              <h2 className="font-display font-bold text-xl mb-2">Password updated</h2>
              <p className="text-sm text-midgrey mb-4">
                Your password has been changed. Redirecting to your dashboard...
              </p>
              <Link
                href="/dashboard"
                className="text-sm text-lime hover:underline"
              >
                Go to dashboard →
              </Link>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="font-display font-bold text-xl mb-2">New password</h2>
              <p className="text-sm text-midgrey mb-6">
                Enter a new password for your account.
              </p>

              {(status === "error") && errorMsg && (
                <div className="bg-pink/10 border border-pink/30 rounded-lg px-4 py-3 text-sm text-pink mb-4">
                  {errorMsg}
                </div>
              )}

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                required
                minLength={8}
                className="w-full bg-black border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none mb-3"
              />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm password"
                required
                minLength={8}
                className="w-full bg-black border border-dark2 rounded-xl px-4 py-3.5 text-white placeholder:text-midgrey focus:border-lime focus:outline-none mb-5"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-lime text-black py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === "loading" ? "Updating..." : "Set new password →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
