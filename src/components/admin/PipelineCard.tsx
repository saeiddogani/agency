import type { DemoLead, LeadPriority } from "@/lib/admin-demo-data";

const priorityDot: Record<LeadPriority, string> = {
  Low: "bg-ink-300",
  Medium: "bg-amber-500",
  High: "bg-rose-500",
};

export function PipelineCard({ lead }: { lead: DemoLead }) {
  const statusText = lead.statusLabel ?? (lead.priority ? `${lead.priority} Priority` : undefined);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-ink-200 bg-white p-3.5 shadow-sm transition-shadow hover:border-ink-300 hover:shadow-md">
      <p className="text-sm font-semibold text-ink-950">{lead.business}</p>
      <p className="text-xs text-ink-500">{lead.serviceType}</p>
      <p className="font-heading text-sm font-bold text-ink-900">${lead.value.toLocaleString()}</p>
      {statusText ? (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-600">
          {lead.priority ? <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[lead.priority]}`} /> : null}
          {statusText}
        </span>
      ) : null}
      <p className="text-[11px] text-ink-400">Follow-up {lead.followUpDate}</p>
    </div>
  );
}
