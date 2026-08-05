import Link from "next/link";
import { EmptyState } from "@/components/admin/EmptyState";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import type { LeadRow } from "@/lib/admin/types";

/** Most recently created leads — see getRecentLeads(). New in Phase 9; styled to match ActiveProjects' existing table pattern rather than introducing a new visual style. */
export function RecentLeads({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return <EmptyState title="No leads yet." message="New contact form submissions will show up here." />;
  }

  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-100 text-left text-xs font-medium uppercase tracking-wide text-ink-400">
            <th className="px-5 py-2 font-medium">Name</th>
            <th className="px-5 py-2 font-medium">Company</th>
            <th className="px-5 py-2 font-medium">Status</th>
            <th className="px-5 py-2 font-medium">Received</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50">
              <td className="px-5 py-3 font-medium text-ink-900">
                <Link href={`/admin/leads/${lead.id}`} className="hover:underline">
                  {lead.name}
                </Link>
              </td>
              <td className="px-5 py-3 text-ink-600">{lead.company || "—"}</td>
              <td className="px-5 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-5 py-3 text-ink-600">
                {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
