"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type Counts = {
  apps: number;
  pendingApps: number;
  artists: number;
  featured: number;
  categories: number;
  orders: number;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    async function loadCounts() {
      const [apps, artists, featured, cats, orders] = await Promise.all([
        supabase.from("applications").select("id, status", { count: "exact" }),
        supabase.from("artists").select("id", { count: "exact" }),
        supabase.from("artists").select("id", { count: "exact" }).eq("featured", true),
        supabase.from("categories").select("id", { count: "exact" }),
        supabase.from("orders").select("id", { count: "exact" }),
      ]);

      const pendingApps = apps.data?.filter((a: any) => a.status === "pending" || a.status === "in_review").length ?? 0;

      setCounts({
        apps: apps.count ?? 0,
        pendingApps,
        artists: artists.count ?? 0,
        featured: featured.count ?? 0,
        categories: cats.count ?? 0,
        orders: orders.count ?? 0,
      });
    }

    loadCounts();
  }, [pathname]); // re-fetch when navigating between admin pages

  const navItems = [
    { href: "/admin", label: "Overview", key: "home" },
    { href: "/admin/applications", label: "Applications", key: "apps", badge: counts ? String(counts.apps) : "…", badgeNew: counts && counts.pendingApps > 0 ? String(counts.pendingApps) : undefined },
    { href: "/admin/artists", label: "Artists", key: "artists", badge: counts ? String(counts.artists) : "…" },
    { href: "/admin/featured", label: "Featured", key: "featured", badge: counts ? String(counts.featured) : "…" },
    { href: "/admin/categories", label: "Categories", key: "cats", badge: counts ? String(counts.categories) : "…" },
    { href: "/admin/orders", label: "Orders", key: "orders", badge: counts && counts.orders > 0 ? String(counts.orders) : undefined },
  ];

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
                {item.badgeNew ? (
                  <span className="ml-auto bg-pink text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
                    {item.badgeNew}
                  </span>
                ) : item.badge ? (
                  <span className={`ml-auto font-mono text-[10px] font-bold ${isActive ? "text-black" : "text-midgrey"}`}>
                    {item.badge}
                  </span>
                ) : null}
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
          <span className="bg-lime text-black px-3.5 py-1 rounded-full font-mono text-[10px] font-bold tracking-[0.15em]">
            LIVE
          </span>
        </div>
        {children}
      </main>
    </div>
  );
}
