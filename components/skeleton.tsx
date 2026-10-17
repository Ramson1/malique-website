type SkeletonProps = { className?: string };

/** Base pulsing block used for all data-loading states. */
export function Skeleton({ className = "h-4 w-full" }: SkeletonProps) {
  return <div aria-hidden className={`animate-pulse rounded-lg bg-slate-200/70 ${className}`} />;
}

export function SkeletonCircle({ className = "h-10 w-10" }: SkeletonProps) {
  return <div aria-hidden className={`animate-pulse rounded-full bg-slate-200/70 ${className}`} />;
}

export function SkeletonText({ lines = 1, className = "" }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3.5 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

/** Placeholder for dashboard stat cards. */
export function SkeletonStatCard() {
  return (
    <div
      aria-hidden
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStatGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonStatCard key={i} />
      ))}
    </div>
  );
}

/** Placeholder for list rows (orders, addresses). */
export function SkeletonList({ rows = 4, className = "space-y-3" }: { rows?: number; className?: string }) {
  return (
    <div aria-hidden className={className}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <SkeletonCircle className="h-10 w-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/** Placeholder matching a product card in the order catalog. */
export function SkeletonProductCard() {
  return (
    <div
      aria-hidden
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <Skeleton className="mx-auto h-16 w-16 rounded-2xl" />
      <Skeleton className="mx-auto mt-4 h-4 w-2/3" />
      <Skeleton className="mx-auto mt-2 h-3 w-1/2" />
      <Skeleton className="mt-4 h-10 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonProductGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}
