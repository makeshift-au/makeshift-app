import { getCurrentArtist, getMyEnquiries } from "@/lib/dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Enquiries" };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default async function DashboardEnquiriesPage() {
  const artist = await getCurrentArtist();
  const enquiries = artist ? await getMyEnquiries(artist.id) : [];

  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / ENQUIRIES
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Enquiries.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Commission enquiries from buyers. Reply, quote, or decline.
      </p>

      {enquiries.length === 0 ? (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="font-display font-bold text-xl mb-2">No enquiries yet</h3>
          <p className="text-midgrey text-sm max-w-sm mx-auto">
            When buyers send commission enquiries, they&apos;ll appear here.
            Make sure commissions are enabled on your profile.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq: any) => (
            <div key={enq.id} className="bg-dark1 border border-dark2 rounded-2xl p-5 hover:border-lime/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-display font-bold">{enq.name}</span>
                  <span className="font-mono text-xs text-midgrey ml-2">
                    {timeAgo(enq.created_at)}
                  </span>
                </div>
                <span className={`font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${
                  enq.status === "new" ? "bg-pink/15 text-pink" :
                  enq.status === "replied" ? "bg-lime/15 text-lime" :
                  "bg-dark2 text-midgrey"
                }`}>{(enq.status ?? "new").toUpperCase()}</span>
              </div>
              <p className="text-lightgrey text-sm mb-2">{enq.brief}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 font-mono text-xs text-midgrey">
                  {enq.budget && <span>Budget: {enq.budget}</span>}
                  {enq.timeline && <span>Timeline: {enq.timeline}</span>}
                </div>
                <a
                  href={`mailto:${enq.email}?subject=Re: Commission enquiry on Makeshift`}
                  className="border border-dark2 text-white px-4 py-1.5 rounded-full text-xs hover:border-lime hover:text-lime transition-colors"
                >
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
