import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AdminArtistEditor from "@/components/AdminArtistEditor";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Edit Artist" };

export default async function AdminArtistEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: artist, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !artist) {
    notFound();
  }

  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / THE ROSTER / EDIT
      </div>
      <h1 className="font-display font-[800] text-[46px] leading-[0.95] tracking-[-0.02em] mb-3">
        {artist.name}
      </h1>
      <p className="text-sm text-midgrey mb-8">
        /{artist.slug} · Created {new Date(artist.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
      </p>

      <AdminArtistEditor artist={artist} />
    </>
  );
}
