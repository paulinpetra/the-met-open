export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-16 animate-pulse">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Image skeleton */}
        <div className="aspect-square rounded-xl bg-neutral-200" />

        {/* Text skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-neutral-200 rounded" />
          <div className="h-4 w-1/2 bg-neutral-200 rounded" />

          <div className="space-y-2 pt-6">
            <div className="h-3 w-1/3 bg-neutral-200 rounded" />
            <div className="h-3 w-2/3 bg-neutral-200 rounded" />
            <div className="h-3 w-1/2 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
