export default function SkeletonCard() {
  return (
    <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-bg-subtle rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-bg-subtle rounded w-3/4" />
          <div className="h-3 bg-bg-subtle rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-bg-subtle rounded w-full" />
        <div className="h-3 bg-bg-subtle rounded w-2/3" />
      </div>
      <div className="h-10 bg-bg-subtle rounded-xl w-full" />
    </div>
  );
}
