export default function ArtistLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="h-64 md:h-80 bg-dark2 animate-pulse" />

      {/* Profile section */}
      <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="flex items-end gap-5 mb-8">
          <div className="w-28 h-28 rounded-2xl bg-dark1 border-4 border-black animate-pulse" />
          <div className="space-y-2 pb-2">
            <div className="h-8 w-48 bg-dark2 rounded animate-pulse" />
            <div className="h-4 w-32 bg-dark1 rounded animate-pulse" />
          </div>
        </div>

        <div className="h-4 w-full max-w-lg bg-dark1 rounded animate-pulse mb-2" />
        <div className="h-4 w-3/4 max-w-md bg-dark1 rounded animate-pulse mb-10" />

        {/* Work grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
              <div className="aspect-square bg-dark2 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-32 bg-dark2 rounded animate-pulse" />
                <div className="h-4 w-20 bg-dark2 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
