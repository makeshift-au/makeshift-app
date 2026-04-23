import { getCurrentArtist } from "@/lib/dashboard";
import ProfileEditor from "@/components/ProfileEditor";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Page" };

export default async function DashboardPageEditorPage() {
  const artist = await getCurrentArtist();

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / MY PAGE
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        My Page.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Edit your public artist page — basics, hero, links, commission settings.
      </p>

      {artist ? (
        <ProfileEditor
          artist={{
            id: artist.id,
            name: artist.name,
            tagline: artist.tagline ?? "",
            bio: artist.bio ?? "",
            location: artist.location ?? "",
            instagram: artist.instagram ?? "",
            website: artist.website ?? "",
            commissions: artist.commissions ?? false,
            price_range: artist.price_range ?? "",
          }}
        />
      ) : (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <h3 className="font-display font-bold text-xl mb-2">No artist profile found</h3>
          <p className="text-midgrey text-sm">
            Please log in with your artist account to edit your page.
          </p>
        </div>
      )}
    </>
  );
}
