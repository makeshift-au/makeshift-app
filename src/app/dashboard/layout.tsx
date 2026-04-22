import { createClient } from "@/lib/supabase/server";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch artist record if this user is an artist
  let artist = null;
  if (user) {
    const { data } = await supabase
      .from("artists")
      .select("id, name, slug, status, avatar_url")
      .eq("profile_id", user.id)
      .single();
    artist = data;
  }

  return (
    <DashboardShell
      userEmail={user?.email ?? ""}
      artistName={artist?.name ?? user?.user_metadata?.full_name ?? "Creator"}
      artistSlug={artist?.slug}
      artistStatus={artist?.status ?? "onboarding"}
    >
      {children}
    </DashboardShell>
  );
}
