import type { ComponentType } from "react";
import { IconCheckCircle, type IconProps } from "@/components/icons";

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: ComponentType<IconProps>;
  className?: string;
}

/** Friendly "nothing to show" state — used wherever a demo list could be empty. */
export function EmptyState({ title, message, icon: Icon = IconCheckCircle, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200 bg-ink-50/40 px-6 py-10 text-center ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      {message ? <p className="text-xs text-ink-500">{message}</p> : null}
    </div>
  );
}
