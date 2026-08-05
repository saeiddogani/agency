import Link from "next/link";
import { EmptyState } from "@/components/admin/EmptyState";
import type { DemoActivityItem } from "@/lib/admin-demo-data";

/** Real data as of Phase 9 (activity_log rows) — see getRecentActivity() and mapActivityToItems(). */
export function RecentActivity({ items }: { items: DemoActivityItem[] }) {
  if (items.length === 0) {
    return <EmptyState title="No recent activity yet." message="Activity will show up here as things happen." />;
  }

  return (
    <ul className="flex flex-col">
      {items.map((item, index) => {
        const message = (
          <p className="text-sm text-ink-900">
            {item.message}
            {item.business ? <span className="font-medium"> — {item.business}</span> : null}
          </p>
        );
        return (
          <li key={item.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <item.icon className="h-4 w-4" />
              </span>
              {index < items.length - 1 ? <span className="w-px flex-1 bg-ink-100" /> : null}
            </div>
            <div className={index === items.length - 1 ? "pb-0" : "pb-5"}>
              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {message}
                </Link>
              ) : (
                message
              )}
              <p className="mt-0.5 text-xs text-ink-400">{item.timestamp}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
