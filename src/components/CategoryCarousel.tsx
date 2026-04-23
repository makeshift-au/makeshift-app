"use client";

import { useRef } from "react";
import ArtistCard from "./ArtistCard";
import Link from "next/link";
import type { Artist } from "@/data/artists";

export default function CategoryCarousel({
  slug,
  label,
  bg,
  artists,
  count,
}: {
  slug: string;
  label: string;
  bg: string;
  artists: Artist[];
  count: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("a");
    const w = card ? card.offsetWidth + 20 : 320; // card width + gap
    scrollRef.current.scrollBy({
      left: dir === "left" ? -w : w,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span
            className={`${bg} w-3 h-3 rounded-full inline-block shrink-0`}
          />
          <h2 className="font-display font-bold text-2xl tracking-tight">
            {label}
          </h2>
          <span className="font-mono text-xs text-midgrey tracking-[0.1em]">
            {count}
          </span>
        </div>
        <div className="flex-1 h-px bg-dark2" />

        {/* Scroll arrows */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label={`Scroll ${label} left`}
            className="w-8 h-8 rounded-full border border-dark2 flex items-center justify-center text-midgrey hover:border-lime hover:text-lime transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label={`Scroll ${label} right`}
            className="w-8 h-8 rounded-full border border-dark2 flex items-center justify-center text-midgrey hover:border-lime hover:text-lime transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        <Link
          href={`/browse/${slug}`}
          className="font-mono text-xs text-midgrey tracking-[0.1em] hover:text-lime transition-colors whitespace-nowrap"
        >
          SEE ALL &rarr;
        </Link>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {artists.map((a) => (
          <div
            key={a.slug}
            className="min-w-[280px] max-w-[300px] w-[calc(25%-15px)] flex-shrink-0 snap-start"
          >
            <ArtistCard artist={a} />
          </div>
        ))}

        {/* "See all" card */}
        <Link
          href={`/browse/${slug}`}
          className={`${bg} min-w-[200px] max-w-[220px] flex-shrink-0 rounded-2xl flex flex-col items-center justify-center gap-3 border border-dark2 hover:border-lime/40 transition-all hover:-translate-y-1 snap-start`}
        >
          <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white/70"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </div>
          <span className="font-mono text-xs text-white/70 tracking-[0.1em]">
            SEE ALL {count}
          </span>
        </Link>
      </div>
    </section>
  );
}
