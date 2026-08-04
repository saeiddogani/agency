import type { ComponentType } from "react";
import type { IconProps } from "@/components/icons";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "flat";
  icon: ComponentType<IconProps>;
}

const trendStyles: Record<StatCardProps["trend"], string> = {
  up: "text-emerald-600",
  down: "text-rose-600",
  flat: "text-ink-500",
};

export function StatCard({ label, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-500">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 font-heading text-3xl font-bold text-ink-950">{value}</p>
      <p className={`mt-1 text-xs font-medium ${trendStyles[trend]}`}>{change}</p>
    </div>
  );
}
