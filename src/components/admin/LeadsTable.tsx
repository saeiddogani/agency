import Link from "next/link";
import { EmptyState } from "@/components/admin/EmptyState";
import { LeadPriorityBadge } from "@/components/admin/LeadPriorityBadge";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import type { LeadListRow } from "@/lib/admin/types";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Read-only leads table for /admin/leads — see getLeadsList(). */
export function LeadsTable({ leads }: { leads: LeadListRow[] }) {
  if (leads.length === 0) {
    return <EmptyState title="No leads match these filters." message="Try adjusting or clearing the filters above." />;
  }

  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-left text-xs font-medium uppercase tracking-wide text-ink-400">
            <th className="px-5 py-2 font-medium">Priority</th>
            <th className="px-5 py-2 font-medium">Name</th>
            <th className="px-5 py-2 font-medium">Company</th>
            <th className="px-5 py-2 font-medium">Email</th>
            <th className="px-5 py-2 font-medium">Status</th>
            <th className="px-5 py-2 font-medium">Source</th>
            <th className="px-5 py-2 font-medium">Budget</th>
            <th className="px-5 py-2 font-medium">Timeline</th>
            <th className="px-5 py-2 font-medium">Last Inquiry</th>
            <th className="px-5 py-2 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50">
              <td className="px-5 py-3">
                <LeadPriorityBadge priority={lead.priority} />
              </td>
              <td className="px-5 py-3 font-medium text-ink-900">
                <Link href={`/admin/leads/${lead.id}`} className="hover:underline">
                  {lead.name}
                </Link>
              </td>
              <td className="px-5 py-3 text-ink-600">{lead.company || "—"}</td>
              <td className="px-5 py-3 text-ink-600">{lead.email}</td>
              <td className="px-5 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-5 py-3 text-ink-600">{lead.source}</td>
              <td className="px-5 py-3 text-ink-600">{lead.lastInquiryBudget || "—"}</td>
              <td className="px-5 py-3 text-ink-600">{lead.lastInquiryTimeline || "—"}</td>
              <td className="px-5 py-3 text-ink-600">{formatDate(lead.lastInquiryAt)}</td>
              <td className="px-5 py-3 text-ink-600">{formatDate(lead.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
