import Link from "next/link";

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-acid rounded-2xl h-[500px]" />

        {/* Details */}
        <div>
          <div className="font-mono text-sm text-lime tracking-[0.15em] mb-3">
            / WORK
          </div>
          <h1 className="font-display font-[800] text-5xl leading-[0.92] tracking-[-0.02em] mb-2">
            Lime Viper
          </h1>
          <p className="font-mono text-sm text-midgrey tracking-[0.05em] mb-6">
            BY MACCS CUSTOMS &middot; CUSTOM LEATHER JACKET
          </p>

          <div className="font-display font-[800] text-4xl text-lime mb-6">
            $320
          </div>

          <p className="text-lightgrey leading-relaxed mb-8">
            Hand-cut and stitched custom leather jacket in acid lime with black
            panel detailing. Reclaimed leather, YKK hardware, cotton-lined.
            One of one. Will not be remade.
          </p>

          <div className="space-y-3 mb-8 text-sm">
            {[
              ["Material", "Reclaimed leather, cotton lining"],
              ["Hardware", "YKK zippers, brass snaps"],
              ["Size", "Made to measure"],
              ["Condition", "New — handmade to order"],
              ["Lead time", "3-4 weeks"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-dark2 pb-3">
                <span className="text-midgrey">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              href="/checkout"
              className="flex-1 bg-lime text-black py-4 rounded-full font-semibold text-center hover:-translate-y-0.5 transition-transform"
            >
              Buy now &rarr;
            </Link>
            <Link
              href="/enquire?artist=maccs-customs"
              className="flex-1 border border-dark2 text-white py-4 rounded-full text-center hover:border-lime hover:text-lime transition-colors"
            >
              Enquire
            </Link>
          </div>

          <p className="font-mono text-xs text-midgrey tracking-[0.05em] mt-4 text-center">
            FREE SHIPPING AUS-WIDE &middot; 10% TO MAKESHIFT
          </p>
        </div>
      </div>
    </div>
  );
}