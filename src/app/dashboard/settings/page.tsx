import { getCurrentArtist } from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/SettingsForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default async function DashboardSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const artist = await getCurrentArtist();

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / SETTINGS
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Settings.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Account settings, visibility, and danger zone.
      </p>

      <SettingsForm
        email={user?.email ?? ""}
        artistId={artist?.id}
        artistStatus={artist?.status ?? "live"}
        stripeCustomerId={artist?.stripe_customer_id ?? null}
      />
    </>
  );
}
