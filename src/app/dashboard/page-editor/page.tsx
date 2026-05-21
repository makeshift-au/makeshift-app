import { getCurrentArtist } from "@/lib/dashboard";
import ProfileEditor from "@/components/ProfileEditor";
import ImageUpload from "@/components/ImageUpload";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Page" };

export default async function DashboardPageEditorPage() {
  const artist = await getCurrentArtist();

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / MY PAGE
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        My Page.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Edit your public artist page — basics, hero, links, commission settings.
      </p>

      {artist ? (
        <>
          <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
            <h2 className="font-display font-bold text-xl mb-4">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload
                artistId={artist.id}
                type="hero"
                currentUrl={artist.hero_url ?? undefined}
                label="Featured work image"
                hint="This is what people see when browsing artists — make it your best piece. A strong, eye-catching photo of your work gets the most clicks."
              />
              <ImageUpload
                artistId={artist.id}
                type="avatar"
                currentUrl={artist.avatar_url ?? undefined}
                label="Profile photo"
                hint="Your headshot or logo — shown as a small circle in the sidebar of your artist page."
              />
              <ImageUpload
                artistId={artist.id}
                type="banner"
                currentUrl={artist.banner_url ?? undefined}
                label="Cover image"
                hint="The wide banner behind your name at the top of your artist page. A studio shot, workspace, or landscape of your work looks great here (e.g. 1600×900)."
              />
            </div>
          </div>
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
        </>
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
