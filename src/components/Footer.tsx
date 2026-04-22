import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark1 px-6 md:px-12 pt-12 pb-8 border-t border-dark2 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="font-display font-[800] text-[22px] tracking-[0.05em] mb-4">
            MAKE<span className="text-lime">SHIFT</span>
          </div>
          <p className="text-sm text-lightgrey leading-relaxed max-w-[320px]">
            A curated online marketplace for independent Australian artists and
            creators. Melbourne-based, community-led.
          </p>
        </div>

        {/* Browse */}
        <div>
          <h4 className="font-display text-sm text-lime mb-4 uppercase tracking-[0.1em]">
            Browse
          </h4>
          {["Fashion", "Visual Art", "Music", "Ceramics", "Jewellery", "Tattoo", "Graphic", "Photography"].map(
            (cat) => (
              <Link
                key={cat}
                href={`/browse/${cat.toLowerCase().replace(" ", "-")}`}
                className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors"
              >
                {cat}
              </Link>
            ),
          )}
        </div>

        {/* Makeshift */}
        <div>
          <h4 className="font-display text-sm text-lime mb-4 uppercase tracking-[0.1em]">
            Makeshift
          </h4>
          <Link href="/about" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">About</Link>
          <Link href="/story" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">Our Story</Link>
          <Link href="/for-creators" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">For Creators</Link>
          <Link href="/contact" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">Contact</Link>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-display text-sm text-lime mb-4 uppercase tracking-[0.1em]">
            Legal
          </h4>
          <Link href="/terms" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">Terms of Service</Link>
          <Link href="/creator-terms" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">Creator Terms</Link>
          <Link href="/privacy" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">Privacy Policy</Link>
          <Link href="/faq" className="block text-lightgrey text-sm mb-2.5 hover:text-lime transition-colors">FAQ</Link>
        </div>
      </div>

      <div className="border-t border-dark2 pt-7 flex flex-wrap justify-between font-mono text-xs text-midgrey tracking-[0.1em]">
        <span>&copy; 2026 Makeshift</span>
        <span>MADE IN MELBOURNE</span>
      </div>
    </footer>
  );
}
