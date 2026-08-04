import { StatCard } from "@/components/admin/StatCard";
import { demoBusinessSnapshot } from "@/lib/admin-demo-data";

export function BusinessSnapshot() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {demoBusinessSnapshot.map((stat) => (
        <StatCard key={stat.id} label={stat.label} value={stat.value} change={stat.helper} trend="flat" icon={stat.icon} />
      ))}
    </div>
  );
}
