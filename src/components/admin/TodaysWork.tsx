import { DashboardCard } from "@/components/admin/DashboardCard";
import { EmptyState } from "@/components/admin/EmptyState";
import { demoFollowUpTasks, demoProjectTasks, demoSalesTasks, type DemoWorkItem, type WorkStatus } from "@/lib/admin-demo-data";

const statusStyles: Record<WorkStatus, string> = {
  overdue: "bg-rose-50 text-rose-700",
  today: "bg-amber-50 text-amber-700",
  upcoming: "bg-ink-100 text-ink-600",
  "in-progress": "bg-brand-50 text-brand-700",
  pending: "bg-violet-50 text-violet-700",
  new: "bg-emerald-50 text-emerald-700",
};

function WorkColumn({ title, items }: { title: string; items: DemoWorkItem[] }) {
  return (
    <DashboardCard title={title}>
      {items.length === 0 ? (
        <EmptyState title="Nothing here today." className="py-6" />
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-1 border-b border-ink-50 pb-3 last:border-0 last:pb-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-ink-900">{item.title}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${statusStyles[item.status]}`}
                >
                  {item.status.replace("-", " ")}
                </span>
              </div>
              <p className="text-xs text-ink-500">
                {item.business} · {item.when}
              </p>
            </li>
          ))}
        </ul>
      )}
      <span className="mt-4 inline-block cursor-default select-none text-xs font-medium text-ink-400" aria-hidden="true">
        View all
      </span>
    </DashboardCard>
  );
}

export function TodaysWork() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <WorkColumn title="Follow-ups" items={demoFollowUpTasks} />
      <WorkColumn title="Projects" items={demoProjectTasks} />
      <WorkColumn title="Sales" items={demoSalesTasks} />
    </div>
  );
}
