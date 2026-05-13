"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

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
          {status === "success" ? (
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

              {status === "error" && (
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
