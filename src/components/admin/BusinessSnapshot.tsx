import { StatCard } from "@/components/admin/StatCard";
import type { DemoSnapshotStat } from "@/lib/admin-demo-data";

/** Real lead-status counts as of Phase 9 — see getLeadStatusCounts() and mapCountsToSnapshotStats(). */
export function BusinessSnapshot({ stats }: { stats: DemoSnapshotStat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} label={stat.label} value={stat.value} change={stat.helper} trend="flat" icon={stat.icon} />
      ))}
    </div>
  );
}
