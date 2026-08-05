import type { Metadata } from "next";
import { LeadsFilterBar } from "@/components/admin/LeadsFilterBar";
import { LeadsPagination } from "@/components/admin/LeadsPagination";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { getLeadsList } from "@/lib/admin/queries/leads";
import { leadPriorities, leadStatuses, type LeadPageSize, type LeadPriority, type LeadSort, type LeadStatus } from "@/lib/admin/types";

export const metadata: Metadata = {
  title: "Leads",
};

interface LeadsSearchParams {
  search?: string;
  status?: string;
  priority?: string;
  businessType?: string;
  source?: string;
  sort?: string;
  page?: string;
  pageSize?: string;
}

const validSorts: LeadSort[] = ["newest", "oldest", "name"];
const validPageSizes: LeadPageSize[] = [25, 50, 100];

function parseStatus(value?: string): LeadStatus | undefined {
  return leadStatuses.includes(value as LeadStatus) ? (value as LeadStatus) : undefined;
}

function parsePriority(value?: string): LeadPriority | undefined {
  return leadPriorities.includes(value as LeadPriority) ? (value as LeadPriority) : undefined;
}

function parseSort(value?: string): LeadSort {
  return validSorts.includes(value as LeadSort) ? (value as LeadSort) : "newest";
}

function parsePageSize(value?: string): LeadPageSize {
  const parsed = Number(value);
  return validPageSizes.includes(parsed as LeadPageSize) ? (parsed as LeadPageSize) : 25;
}

/**
 * Read-only leads list — search/filter/sort/pagination are all driven by
 * URL query params (see LeadsFilterBar's plain GET form and
 * LeadsPagination's links), so this stays a Server Component with no
 * client-side state at all. All logic beyond parsing searchParams lives in
 * src/lib/admin/queries/leads.ts (data) and src/components/admin/Leads*
 * (rendering) — this file just wires the two together.
 */
export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<LeadsSearchParams> }) {
  const params = await searchParams;

  const status = parseStatus(params.status);
  const priority = parsePriority(params.priority);
  const businessType = params.businessType || undefined;
  const source = params.source || undefined;
  const sort = parseSort(params.sort);
  const pageSize = parsePageSize(params.pageSize);
  const page = Math.max(1, Number(params.page) || 1);

  const result = await getLeadsList({
    search: params.search,
    status,
    priority,
    businessType,
    source,
    sort,
    page,
    pageSize,
  });

  // Preserve exactly the params a link/form change should carry forward —
  // deliberately excludes `page` (any filter/sort change starts at page 1).
  const currentParams: Record<string, string | undefined> = {
    search: params.search,
    status: params.status,
    priority: params.priority,
    businessType: params.businessType,
    source: params.source,
    sort: params.sort,
    pageSize: params.pageSize,
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-ink-950 sm:text-2xl">Leads</h1>
        <p className="mt-1 text-sm text-ink-500">
          {result.total} lead{result.total === 1 ? "" : "s"} total. Read-only for now — editing, assignment, and notes
          are a later phase.
        </p>
      </div>

      <LeadsFilterBar
        search={params.search}
        status={status}
        priority={priority}
        businessType={businessType}
        source={source}
        sort={sort}
        businessTypes={result.businessTypes}
        sources={result.sources}
      />

      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-sm">
        <LeadsTable leads={result.leads} />
      </div>

      <LeadsPagination current={currentParams} page={result.page} pageSize={result.pageSize} total={result.total} />
    </div>
  );
}
