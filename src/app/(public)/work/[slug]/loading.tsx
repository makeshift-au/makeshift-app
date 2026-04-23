export default function WorkLoading() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image skeleton */}
        <div className="aspect-square bg-dark1 border border-dark2 rounded-2xl animate-pulse" />

        {/* Details skeleton */}
        <div className="space-y-5">
          <div className="h-3 w-20 bg-dark2 rounded animate-pulse" />
          <div className="h-10 w-64 bg-dark2 rounded animate-pulse" />
          <div className="h-5 w-32 bg-dark1 rounded animate-pulse" />
          <div className="h-8 w-28 bg-dark2 rounded animate-pulse" />
          <div className="space-y-2 mt-6">
            <div className="h-4 w-full bg-dark1 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-dark1 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-dark1 rounded animate-pulse" />
          </div>
          <div className="h-14 w-full bg-dark2 rounded-full animate-pulse mt-8" />
        </div>
      </div>
    </section>
  );
}
