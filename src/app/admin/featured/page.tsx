import { createClient } from "@/lib/supabase/server";
import FeaturedManager from "@/components/FeaturedManager";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Featured" };

export default async function AdminFeaturedPage() {
  const supabase = await createClient();

  const { data: featured } = await supabase
    .from("artists")
    .select("id, name, slug, discipline, bg, featured")
    .eq("featured", true)
    .eq("status", "live")
    .order("name");

  const { data: allLive } = await supabase
    .from("artists")
    .select("id, name, slug, discipline, bg, featured")
    .eq("status", "live")
    .eq("featured", false)
    .order("name");

  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / FEATURED
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,46px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Featured.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Homepage featured slots. Pick who shows up on the hero grid.
      </p>

      <FeaturedManager
        featured={featured ?? []}
        available={allLive ?? []}
      />
    </>
  );
}
