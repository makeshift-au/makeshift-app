"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `transition-colors hover:text-lime ${isActive ? "text-lime" : ""}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-dark2 px-6 md:px-12 py-4 flex justify-between items-center">
      <Link
        href="/"
        className="font-display font-[800] text-[26px] tracking-[0.05em]"
      >
        MAKE<span className="text-lime">SHIFT</span>
      </Link>

      <div className="flex gap-6 lg:gap-9 items-center text-[15px]">
        <Link href="/browse" className={`hidden md:inline ${linkClass("/browse")}`}>
          Browse Artists
        </Link>
        <Link href="/about" className={`hidden md:inline ${linkClass("/about")}`}>
          About
        </Link>
        <Link
          href="/for-creators"
          className={`hidden lg:inline ${linkClass("/for-creators")}`}
        >
          For Creators
        </Link>
        <Link
          href="/login"
          className={`hidden md:inline text-sm ${linkClass("/login")}`}
        >
          Artist Login
        </Link>
        <Link
          href="/join"
          className="bg-lime text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:-translate-y-0.5 transition-transform"
        >
          Join Makeshift
        </Link>
      </div>
    </nav>
  );
}
