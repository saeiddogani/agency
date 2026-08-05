import Link from "next/link";
import { leadPriorityLabel } from "@/components/admin/LeadPriorityBadge";
import { leadStatusLabel } from "@/components/admin/LeadStatusBadge";
import { leadPriorities, leadStatuses, type LeadPriority, type LeadSort, type LeadStatus } from "@/lib/admin/types";

const sortLabel: Record<LeadSort, string> = {
  newest: "Newest",
  oldest: "Oldest",
  name: "Name",
};

interface LeadsFilterBarProps {
  search?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  businessType?: string;
  source?: string;
  sort: LeadSort;
  businessTypes: string[];
  sources: string[];
}

/**
 * Plain GET form — no client-side JavaScript. Submitting navigates to
 * /admin/leads with the chosen filters as query params, which the Server
 * Component page reads via `searchParams` and passes to getLeadsList().
 * Deliberately no `page` field here: any filter/sort change always starts
 * back at page 1 (see src/lib/admin/queries/leads.ts — a missing `page`
 * param defaults to 1).
 */
export function LeadsFilterBar({
  search,
  status,
  priority,
  businessType,
  source,
  sort,
  businessTypes,
  sources,
}: LeadsFilterBarProps) {
  const selectClasses =
    "rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none";

  return (
    <form method="GET" action="/admin/leads" className="flex flex-wrap items-end gap-3 rounded-xl border border-ink-200 bg-white p-4 shadow-sm">
      <div className="flex min-w-[220px] flex-1 flex-col gap-1.5">
        <label htmlFor="leads-search" className="text-xs font-medium text-ink-500">
          Search
        </label>
        <input
          id="leads-search"
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Name, company, or email"
          className="rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="leads-status" className="text-xs font-medium text-ink-500">
          Status
        </label>
        <select id="leads-status" name="status" defaultValue={status ?? ""} className={selectClasses}>
          <option value="">All statuses</option>
          {leadStatuses.map((value) => (
            <option key={value} value={value}>
              {leadStatusLabel[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="leads-priority" className="text-xs font-medium text-ink-500">
          Priority
        </label>
        <select id="leads-priority" name="priority" defaultValue={priority ?? ""} className={selectClasses}>
          <option value="">All priorities</option>
          {leadPriorities.map((value) => (
            <option key={value} value={value}>
              {leadPriorityLabel[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="leads-business-type" className="text-xs font-medium text-ink-500">
          Business Type
        </label>
        <select id="leads-business-type" name="businessType" defaultValue={businessType ?? ""} className={selectClasses}>
          <option value="">All types</option>
          {businessTypes.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="leads-source" className="text-xs font-medium text-ink-500">
          Source
        </label>
        <select id="leads-source" name="source" defaultValue={source ?? ""} className={selectClasses}>
          <option value="">All sources</option>
          {sources.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="leads-sort" className="text-xs font-medium text-ink-500">
          Sort
        </label>
        <select id="leads-sort" name="sort" defaultValue={sort} className={selectClasses}>
          {(Object.keys(sortLabel) as LeadSort[]).map((value) => (
            <option key={value} value={value}>
              {sortLabel[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Filter
        </button>
        <Link
          href="/admin/leads"
          className="rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:border-ink-300"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
