import type { LeadStatus } from "@/lib/admin/types";

/** Shared status vocabulary for anywhere a lead's status is displayed — dashboard, leads list, lead detail. */
export const leadStatusLabel: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

const statusClasses: Record<LeadStatus, string> = {
  new: "bg-brand-50 text-brand-700",
  contacted: "bg-amber-50 text-amber-700",
  qualified: "bg-violet-50 text-violet-700",
  proposal: "bg-sky-50 text-sky-700",
  won: "bg-emerald-50 text-emerald-700",
  lost: "bg-rose-50 text-rose-700",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusClasses[status]}`}>
      {leadStatusLabel[status]}
    </span>
  );
}
