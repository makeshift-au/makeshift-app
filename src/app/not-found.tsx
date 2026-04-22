import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 text-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(200,255,0,0.04)_0_2px,transparent_2px_40px)] pointer-events-none" />
      <div className="relative z-10 max-w-xl">
        <div className="font-display font-[800] text-[clamp(120px,28vw,280px)] leading-[0.88] tracking-[-0.05em] text-lime [text-shadow:0_0_60px_rgba(200,255,0,0.2)] mb-5">
          404
        </div>
        <div className="font-mono text-sm text-midgrey tracking-[0.2em] mb-5">
          PAGE NOT FOUND
        </div>
        <h1 className="font-display font-[800] text-4xl tracking-[-0.02em] text-white mb-5">
          Couldn&rsquo;t find that one.
        </h1>
        <p className="text-lightgrey text-lg mb-8 max-w-md mx-auto">
          The page you were after doesn&rsquo;t exist, moved, or was never made.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-lime text-black px-7 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Go home
          </Link>
          <Link
            href="/browse"
            className="border border-dark2 text-white px-7 py-3.5 rounded-full hover:border-lime hover:text-lime transition-colors"
          >
            Browse artists
          </Link>
        </div>
      </div>
    </div>
  );
}