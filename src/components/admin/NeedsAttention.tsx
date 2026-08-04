import type { ComponentType } from "react";
import { IconAlertCircle, IconClock, IconFileText, IconBriefcase, type IconProps } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/admin/EmptyState";
import { demoNeedsAttention, type AttentionKind } from "@/lib/admin-demo-data";

const kindConfig: Record<
  AttentionKind,
  { icon: ComponentType<IconProps>; iconClass: string; metaClass: string; barClass: string }
> = {
  overdue: { icon: IconAlertCircle, iconClass: "bg-rose-50 text-rose-600", metaClass: "text-rose-600", barClass: "bg-rose-500" },
  today: { icon: IconClock, iconClass: "bg-amber-50 text-amber-600", metaClass: "text-amber-600", barClass: "bg-amber-500" },
  waiting: { icon: IconFileText, iconClass: "bg-violet-50 text-violet-600", metaClass: "text-violet-600", barClass: "bg-violet-500" },
  deadline: { icon: IconBriefcase, iconClass: "bg-brand-50 text-brand-600", metaClass: "text-brand-600", barClass: "bg-brand-500" },
};

export function NeedsAttention() {
  if (demoNeedsAttention.length === 0) {
    return <EmptyState title="You're all caught up." message="Nothing needs your attention right now." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {demoNeedsAttention.map((item) => {
        const config = kindConfig[item.kind];
        return (
          <div
            key={item.id}
            className="flex overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <span className={`w-1 shrink-0 ${config.barClass}`} aria-hidden="true" />
            <div className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.iconClass}`}>
                  <config.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{item.heading}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink-950">{item.business}</p>
                  <p className="text-sm text-ink-600">{item.detail}</p>
                  <p className={`mt-1 text-xs font-medium ${config.metaClass}`}>{item.meta}</p>
                </div>
              </div>
              <Button variant="outline" size="md" className="shrink-0 self-start sm:self-center">
                {item.actionLabel}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
