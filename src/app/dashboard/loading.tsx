export default function DashboardLoading() {
  return (
    <div>
      <div className="h-3 w-32 bg-dark2 rounded mb-3 animate-pulse" />
      <div className="h-12 w-48 bg-dark2 rounded mb-3 animate-pulse" />
      <div className="h-5 w-80 bg-dark1 rounded mb-8 animate-pulse" />

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-dark1 border border-dark2 rounded-2xl p-5">
            <div className="h-3 w-16 bg-dark2 rounded mb-3 animate-pulse" />
            <div className="h-7 w-20 bg-dark2 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-dark1 border border-dark2 rounded-2xl p-5 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 w-16 bg-dark2 rounded animate-pulse" />
            <div className="h-4 flex-1 bg-dark2 rounded animate-pulse" />
            <div className="h-4 w-20 bg-dark2 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
