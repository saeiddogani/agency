import type { LeadPriority } from "@/lib/admin/types";

export const leadPriorityLabel: Record<LeadPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const dotClasses: Record<LeadPriority, string> = {
  low: "bg-ink-300",
  medium: "bg-amber-500",
  high: "bg-rose-500",
};

export function LeadPriorityBadge({ priority }: { priority: LeadPriority }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClasses[priority]}`} aria-hidden="true" />
      {leadPriorityLabel[priority]}
    </span>
  );
}
