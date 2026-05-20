import { getCurrentArtist, getMyListings } from "@/lib/dashboard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Onboarding & Set Up" };

interface Step {
  key: string;
  label: string;
  description: string;
  href: string;
  done: boolean;
}

export default async function SetupPage() {
  const artist = await getCurrentArtist();

  if (!artist) {
    return (
      <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
        <h3 className="font-display font-bold text-xl mb-2">
          No artist profile found
        </h3>
        <p className="text-midgrey text-sm">
          Please log in with your artist account to continue setup.
        </p>
      </div>
    );
  }

  const listings = await getMyListings(artist.id);
  const liveOrDraftListings = listings.length;

  const hasBio = !!artist.bio && artist.bio.trim().length >= 10;

  const steps: Step[] = [
    {
      key: "avatar",
      label: "Upload a profile photo",
      description:
        "Buyers want to see who they're supporting. A clear headshot or studio photo works best.",
      href: "/dashboard/page-editor",
      done: !!artist.avatar_url,
    },
    {
      key: "hero",
      label: "Add a hero image",
      description:
        "This is the big banner at the top of your artist page. Use a photo of your work, your studio, or something that represents your vibe.",
      href: "/dashboard/page-editor",
      done: !!artist.hero_url,
    },
    {
      key: "bio",
      label: "Write your bio",
      description:
        "Tell people your story — who you are, what you make, and why. Even a couple of sentences goes a long way.",
      href: "/dashboard/page-editor",
      done: hasBio,
    },
    {
      key: "listing",
      label: "Add your first listing",
      description:
        "Upload at least one piece of work with a title, description, price, and photos. You can always add more later.",
      href: "/dashboard/listings/new",
      done: liveOrDraftListings > 0,
    },
    {
      key: "stripe",
      label: "Connect your bank account",
      description:
        "Set up Stripe so you can receive payouts when you make a sale. It only takes a couple of minutes.",
      href: "/dashboard/billing",
      done: !!artist.stripe_onboarded,
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const allDone = completedCount === steps.length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  // Find the first incomplete step
  const nextStep = steps.find((s) => !s.done);

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / SETUP
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        {allDone ? "You're all set." : "Let's get you live."}
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        {allDone
          ? "Everything's done — your page is ready to go live on Makeshift."
          : "Complete these steps to get your artist page live on Makeshift. It only takes a few minutes."}
      </p>

      {/* Progress bar */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] uppercase">
            Progress
          </span>
          <span className="font-mono text-sm text-lime">
            {completedCount}/{steps.length} complete
          </span>
        </div>
        <div className="w-full h-2.5 bg-dark2 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {!allDone && nextStep && (
          <p className="text-sm text-midgrey mt-3">
            Next up:{" "}
            <span className="text-lightgrey">{nextStep.label}</span>
          </p>
        )}
      </div>

      {/* Steps checklist */}
      <div className="space-y-3 mb-8">
        {steps.map((step, i) => (
          <div
            key={step.key}
            className={`bg-dark1 border rounded-2xl p-5 transition-colors ${
              step.done
                ? "border-lime/20"
                : step === nextStep
                  ? "border-lime/40"
                  : "border-dark2"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Step number / check */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display font-[800] text-sm ${
                  step.done
                    ? "bg-lime text-black"
                    : "bg-dark2 text-midgrey"
                }`}
              >
                {step.done ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-display font-bold text-base ${
                      step.done ? "text-lime" : "text-white"
                    }`}
                  >
                    {step.label}
                  </h3>
                  {step.done && (
                    <span className="font-mono text-[10px] text-lime tracking-[0.1em] uppercase">
                      Done
                    </span>
                  )}
                </div>
                <p className="text-sm text-midgrey leading-relaxed mb-3">
                  {step.description}
                </p>
                <Link
                  href={step.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    step.done
                      ? "text-midgrey hover:text-lightgrey"
                      : "text-lime hover:text-white"
                  }`}
                >
                  {step.done ? "Edit" : "Get started"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All done CTA */}
      {allDone && (
        <div className="bg-lime/10 border border-lime/30 rounded-2xl p-6 text-center">
          <h2 className="font-display font-[800] text-2xl text-lime mb-2">
            Ready to go live!
          </h2>
          <p className="text-lightgrey text-sm mb-4">
            Everything looks good. Your page will be reviewed and published
            shortly.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-lime text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-white transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      {/* Help section */}
      <div className="mt-6 text-center">
        <p className="text-midgrey text-sm">
          Need help?{" "}
          <a
            href="mailto:makeshift.melb@gmail.com"
            className="text-lime hover:underline"
          >
            Get in touch
          </a>
        </p>
      </div>
    </>
  );
}
