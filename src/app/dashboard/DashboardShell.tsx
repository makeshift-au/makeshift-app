"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function getNavItems(isOnboarding: boolean) {
  const items = [
    { href: "/dashboard", label: "Home", key: "home" },
  ];

  if (isOnboarding) {
    items.push({ href: "/dashboard/setup", label: "Setup", key: "setup" });
  }

  items.push(
    { href: "/dashboard/page-editor", label: "My Page", key: "page" },
    { href: "/dashboard/listings", label: "Listings", key: "listings" },
    { href: "/dashboard/enquiries", label: "Enquiries", key: "enquiries" },
    { href: "/dashboard/orders", label: "Orders", key: "orders" },
    { href: "/dashboard/analytics", label: "Analytics", key: "analytics" },
    { href: "/dashboard/billing", label: "Billing", key: "billing" },
    { href: "/dashboard/settings", label: "Settings", key: "settings" },
  );

  return items;
}

interface DashboardShellProps {
  children: React.ReactNode;
  userEmail: string;
  artistName: string;
  artistSlug?: string;
  artistStatus: string;
}

export default function DashboardShell({
  children,
  artistName,
  artistStatus,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const initials = artistName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isOnboarding = artistStatus === "onboarding";
  const navItems = getNavItems(isOnboarding);

  const statusLabel =
    artistStatus === "live"
      ? "PAGE LIVE"
      : artistStatus === "paused"
        ? "PAUSED"
        : "SETUP";

  const statusColor =
    artistStatus === "live"
      ? "bg-lime shadow-[0_0_6px_theme(colors.lime)]"
      : artistStatus === "paused"
        ? "bg-orange"
        : "bg-midgrey";

  return (
    <div className="md:grid md:grid-cols-[260px_1fr] min-h-screen">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-dark1 border-b border-dark2 px-4 py-3 sticky top-0 z-50">
        <div className="font-display font-[800] text-lg tracking-[0.05em]">
          MAKE<span className="text-lime">SHIFT</span>
          <span className="font-mono text-[8px] text-lime tracking-[0.2em] font-normal ml-2">
            STUDIO
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-dark2 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-[280px] bg-dark1 border-r border-dark2 p-5 flex flex-col overflow-y-auto
          transition-transform duration-200 ease-in-out
          md:sticky md:translate-x-0
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="font-display font-[800] text-[22px] tracking-[0.05em] px-3 pb-5 border-b border-dark2 mb-5">
          MAKE<span className="text-lime">SHIFT</span>
          <span className="block font-mono text-[9px] text-lime tracking-[0.2em] font-normal mt-1">
            CREATOR STUDIO
          </span>
        </div>

        <div className="bg-black border border-dark2 rounded-xl p-3.5 mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-dark2 flex items-center justify-center font-display font-[800] text-lime text-sm flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-sm truncate">
              {artistName}
            </div>
            <div className="font-mono text-[10px] text-lime tracking-[0.1em] flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
              {statusLabel}
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5">
          <div className="font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase px-3 pt-3 pb-2">
            Dashboard
          </div>
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2.5 rounded-lg text-sm flex items-center gap-2.5 transition-all ${
                  isActive
                    ? "bg-lime text-black font-semibold"
                    : "text-lightgrey hover:bg-dark2 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-3.5 border-t border-dark2 font-mono text-[11px] text-midgrey tracking-[0.1em] space-y-1">
          <Link href="/" className="block hover:text-lime transition-colors">
            View public site
          </Link>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="block hover:text-lime transition-colors"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="p-6 md:p-10 max-w-[1200px]">{children}</main>
    </div>
  );
}
