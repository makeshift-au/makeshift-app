"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `transition-colors hover:text-lime ${isActive ? "text-lime" : ""}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-dark2">
      <div className="px-6 md:px-12 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-display font-[800] text-[22px] sm:text-[26px] tracking-[0.05em]"
        >
          MAKE<span className="text-lime">SHIFT</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 lg:gap-9 items-center text-[15px]">
          <Link href="/browse" className={linkClass("/browse")}>
            Browse Artists
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>
          <Link
            href="/for-creators"
            className={`hidden lg:inline ${linkClass("/for-creators")}`}
          >
            For Creators
          </Link>
          <Link href="/login" className={`text-sm ${linkClass("/login")}`}>
            Artist Login
          </Link>
          <Link
            href="/join"
            className="bg-lime text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:-translate-y-0.5 transition-transform"
          >
            Join Makeshift
          </Link>
        </div>

        {/* Mobile: Join button + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/join"
            className="bg-lime text-black px-4 py-2 rounded-full font-semibold text-xs hover:-translate-y-0.5 transition-transform"
          >
            Join
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[2px] bg-white transition-transform ${open ? "rotate-45 translate-y-[5px]" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-transform ${open ? "-rotate-45 -translate-y-[5px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-dark2 bg-black/95 backdrop-blur-md px-6 pb-6 pt-4 flex flex-col gap-4 text-[15px]">
          <Link
            href="/browse"
            onClick={() => setOpen(false)}
            className={linkClass("/browse")}
          >
            Browse Artists
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className={linkClass("/about")}
          >
            About
          </Link>
          <Link
            href="/for-creators"
            onClick={() => setOpen(false)}
            className={linkClass("/for-creators")}
          >
            For Creators
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className={linkClass("/login")}
          >
            Artist Login
          </Link>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className={linkClass("/orders")}
          >
            My Orders
          </Link>
        </div>
      )}
    </nav>
  );
}
