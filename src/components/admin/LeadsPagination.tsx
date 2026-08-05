import Link from "next/link";
import { buildLeadsHref } from "@/lib/admin/search-params";
import type { LeadPageSize } from "@/lib/admin/types";

const pageSizes: LeadPageSize[] = [25, 50, 100];

interface LeadsPaginationProps {
  current: Record<string, string | undefined>;
  page: number;
  pageSize: LeadPageSize;
  total: number;
}

export function LeadsPagination({ current, page, pageSize, total }: LeadsPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-600">
      <p>
        {total === 0 ? "No leads" : `Showing ${from}–${to} of ${total} leads`}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-ink-500">Per page</span>
          {pageSizes.map((size) => (
            <Link
              key={size}
              href={buildLeadsHref(current, { pageSize: size, page: undefined })}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                size === pageSize ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-ink-50"
              }`}
              aria-current={size === pageSize ? "true" : undefined}
            >
              {size}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {page > 1 ? (
            <Link
              href={buildLeadsHref(current, { page: page - 1 })}
              className="rounded-md border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:border-ink-300"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-md border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-300">Previous</span>
          )}
          <span className="text-xs text-ink-500">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={buildLeadsHref(current, { page: page + 1 })}
              className="rounded-md border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:border-ink-300"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-md border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-300">Next</span>
          )}
        </div>
      </div>
    </div>
  );
}
