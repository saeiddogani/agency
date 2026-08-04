import type { ReactNode } from "react";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
  /** Applied to the title heading so a parent <section> can reference it via aria-labelledby. */
  headingId?: string;
}

/** Consistent card chrome (header + body) used across the admin dashboard. */
export function DashboardCard({
  title,
  description,
  action,
  children,
  className = "",
  headingId,
}: DashboardCardProps) {
  return (
    <div className={`rounded-xl border border-ink-200 bg-white shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-5 py-4">
        <div>
          <h2 id={headingId} className="text-sm font-semibold text-ink-950">
            {title}
          </h2>
          {description ? <p className="mt-0.5 text-xs text-ink-500">{description}</p> : null}
        </div>
        {action ? (
          <Link
            href={action.href}
            className="shrink-0 text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
