export default function BrowseLoading() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="h-3 w-24 bg-dark2 rounded mb-3 animate-pulse" />
      <div className="h-12 w-72 bg-dark2 rounded mb-3 animate-pulse" />
      <div className="h-5 w-96 bg-dark1 rounded mb-10 animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] bg-dark2 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 w-40 bg-dark2 rounded animate-pulse" />
              <div className="h-3 w-24 bg-dark2 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
