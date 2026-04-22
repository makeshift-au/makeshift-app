"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview", key: "home" },
  { href: "/admin/applications", label: "Applications", key: "apps", badgeNew: "14" },
  { href: "/admin/artists", label: "Artists", key: "artists", badge: "47" },
  { href: "/admin/featured", label: "Featured", key: "featured", badge: "12" },
  { href: "/admin/categories", label: "Categories", key: "cats", badge: "8" },
  { href: "/admin/orders", label: "Orders", key: "orders" },
  { href: "/admin/flags", label: "Flags", key: "flags", badgeNew: "2" },
  { href: "/admin/analytics", label: "Analytics", key: "analytics" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-screen">
      <aside className="bg-dark1 border-r border-dark2 p-5 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="font-display font-[800] text-[22px] tracking-[0.05em] px-3 pb-5 border-b border-dark2 mb-5">
          MAKE<span className="text-lime">SHIFT</span>
          <span className="block font-mono text-[9px] text-pink tracking-[0.2em] font-bold mt-1">
            ADMIN · V0.1
          </span>
        </div>

        <div className="bg-black border border-dark2 rounded-xl p-3.5 mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink text-white flex items-center justify-center font-display font-[800] text-sm flex-shrink-0">
            JM
          </div>
          <div>
            <div className="font-display font-bold text-sm">Jordan M.</div>
            <div className="font-mono text-[10px] text-pink tracking-[0.1em]">FOUNDER</div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5">
          <div className="font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase px-3 pt-3 pb-2">
            Manage
          </div>
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
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
                {item.badge && (
                  <span className={`ml-auto font-mono text-[10px] font-bold ${isActive ? "text-black" : "text-midgrey"}`}>
                    {item.badge}
                  </span>
                )}
                {item.badgeNew && (
                  <span className="ml-auto bg-pink text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
                    {item.badgeNew}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-3.5 border-t border-dark2 font-mono text-[11px] text-midgrey tracking-[0.1em] space-y-1">
          <Link href="/dashboard" className="block hover:text-lime transition-colors">← Artist view</Link>
          <Link href="/" className="block hover:text-lime transition-colors">View public site</Link>
          <Link href="/login" className="block hover:text-lime transition-colors">Log out</Link>
        </div>
      </aside>

      <main className="p-8 md:p-10 max-w-[1400px]">
        <div className="flex justify-between items-center mb-7">
          <div className="font-mono text-[11px] text-midgrey tracking-[0.1em]">
            MAKESHIFT · ADMIN
          </div>
          <span className="bg-pink text-white px-3.5 py-1 rounded-full font-mono text-[10px] font-bold tracking-[0.15em]">
            STAGING
          </span>
        </div>
        {children}
      </main>
    </div>
  );
}