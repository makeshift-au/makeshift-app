import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function DashboardSettingsPage() {
  return (
    <>
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / DASHBOARD / SETTINGS
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Settings.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Account settings, notifications, visibility, and danger zone.
      </p>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Login</h2>
        <div className="flex justify-between items-center text-sm">
          <div>
            <div className="font-medium">maccs@maccscustoms.com</div>
            <div className="text-midgrey">Magic link login</div>
          </div>
          <button className="border border-dark2 text-white px-4 py-2 rounded-full text-xs hover:border-lime hover:text-lime transition-colors">Change email</button>
        </div>
      </div>

      <div className="bg-dark1 border border-dark2 rounded-2xl p-6 mb-6">
        <h2 className="font-display font-bold text-xl mb-4">Notifications</h2>
        <div className="space-y-4">
          {[
            ["New enquiry", "Email when a buyer sends an enquiry", true],
            ["Order placed", "Email when someone buys your work", true],
            ["Payout sent", "Weekly payout confirmation", true],
            ["Featured placement", "When you're added to the homepage", true],
            ["Marketing emails", "Monthly newsletter and tips", false],
          ].map(([title, desc, on]) => (
            <div key={title as string} className="flex justify-between items-center pb-4 border-b border-dark2 last:border-b-0">
              <div>
                <div className="font-medium text-sm">{title as string}</div>
                <div className="text-xs text-midgrey">{desc as string}</div>
              </div>
              <div className={`w-10 h-[22px] rounded-full relative cursor-pointer transition-colors ${(on as boolean) ? "bg-lime" : "bg-dark2"}`}>
                <div className={`absolute top-[2px] w-[18px] h-[18px] rounded-full transition-all ${(on as boolean) ? "left-5 bg-black" : "left-[2px] bg-white"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark1 border border-pink rounded-2xl p-6">
        <h2 className="font-display font-bold text-xl text-pink mb-4">Danger zone</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-sm">Pause my page</div>
              <div className="text-xs text-midgrey">Temporarily hide from browse. Open orders still ship.</div>
            </div>
            <button className="border border-dark2 text-white px-4 py-2 rounded-full text-xs hover:border-pink hover:text-pink transition-colors">Pause</button>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-dark2">
            <div>
              <div className="font-medium text-sm">Close my account</div>
              <div className="text-xs text-midgrey">Permanently remove your page and data.</div>
            </div>
            <button className="border border-pink text-pink px-4 py-2 rounded-full text-xs hover:bg-pink hover:text-white transition-colors">Close account</button>
          </div>
        </div>
      </div>
    
    </>
  );
}