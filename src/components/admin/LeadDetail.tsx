import Link from "next/link";
import { IconArrowRight, IconGlobe, IconMail, IconPhone } from "@/components/icons";
import { EmptyState } from "@/components/admin/EmptyState";
import { LeadPriorityBadge } from "@/components/admin/LeadPriorityBadge";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import type { LeadInquiryRow, LeadRow } from "@/lib/admin/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * /admin/leads/[id] — presentational pieces (Phase 9, read-only)
 * ─────────────────────────────────────────────────────────────────────────
 * All pure, prop-driven components — no data fetching here (that's
 * getLeadDetail() in src/lib/admin/queries/leads.ts). Grouped in one file
 * since they're small and only ever used together on the lead detail page,
 * rather than one file per component.
 * ─────────────────────────────────────────────────────────────────────────
 */

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export function LeadHeader({ lead }: { lead: LeadRow }) {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/leads" className="flex w-fit items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-ink-800">
        <IconArrowRight className="h-3.5 w-3.5 rotate-180" />
        Back to leads
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-xl font-bold text-ink-950 sm:text-2xl">{lead.name}</h1>
          <p className="mt-0.5 text-sm text-ink-500">{lead.company || "No company given"}</p>
        </div>
        <div className="flex items-center gap-2">
          <LeadStatusBadge status={lead.status} />
          <LeadPriorityBadge priority={lead.priority} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof IconMail; label: string; value: string | null }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-500">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</p>
        <p className="text-sm text-ink-900">{value || "—"}</p>
      </div>
    </div>
  );
}

export function LeadContactInfo({ lead }: { lead: LeadRow }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <InfoRow icon={IconMail} label="Email" value={lead.email} />
      <InfoRow icon={IconPhone} label="Phone" value={lead.phone} />
      <InfoRow icon={IconGlobe} label="Current Website" value={lead.website} />
    </div>
  );
}

export function LeadBusinessInfo({ lead }: { lead: LeadRow }) {
  const rows: { label: string; value: string }[] = [
    { label: "Business Type", value: lead.business_type || "—" },
    { label: "Source", value: lead.source },
    {
      label: "Estimated Value",
      value: lead.estimated_value != null ? `$${Number(lead.estimated_value).toLocaleString()}` : "Not set",
    },
    { label: "First Received", value: formatDateTime(lead.created_at) },
    { label: "Last Contacted", value: lead.last_contacted_at ? formatDateTime(lead.last_contacted_at) : "Not yet contacted" },
  ];

  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">{row.label}</dt>
          <dd className="mt-0.5 text-sm text-ink-900">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Union of every service ever requested across all of this lead's inquiries — a quick summary; the full per-submission detail is in LeadInquiryTimeline below. */
export function LeadRequestedServices({ inquiries }: { inquiries: LeadInquiryRow[] }) {
  const services = Array.from(new Set(inquiries.flatMap((inquiry) => inquiry.services_requested ?? [])));

  if (services.length === 0) {
    return <p className="text-sm text-ink-500">No services specified.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {services.map((service) => (
        <span key={service} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          {service}
        </span>
      ))}
    </div>
  );
}

/**
 * Every inquiry this lead has ever submitted, oldest first — this is what
 * guarantees "every inquiry submitted by the customer must appear" and
 * "do not duplicate leads": repeat submissions from the same person show
 * up here as additional entries on the SAME lead, never as a second lead
 * (see create_contact_inquiry()'s find-or-create logic).
 */
export function LeadInquiryTimeline({ inquiries }: { inquiries: LeadInquiryRow[] }) {
  if (inquiries.length === 0) {
    return <EmptyState title="No inquiries recorded." message="This shouldn't happen — every lead starts from one." />;
  }

  return (
    <ul className="flex flex-col gap-5">
      {inquiries.map((inquiry, index) => (
        <li key={inquiry.id} className="rounded-lg border border-ink-100 bg-ink-50/40 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              {index === 0 ? "First inquiry" : `Inquiry #${index + 1}`}
            </p>
            <p className="text-xs text-ink-400">{formatDateTime(inquiry.submitted_at)}</p>
          </div>
          {inquiry.message ? <p className="mt-2 whitespace-pre-wrap text-sm text-ink-800">{inquiry.message}</p> : null}
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-500">
            {inquiry.services_requested && inquiry.services_requested.length > 0 ? (
              <span>Services: {inquiry.services_requested.join(", ")}</span>
            ) : null}
            {inquiry.budget_range ? <span>Budget: {inquiry.budget_range}</span> : null}
            {inquiry.timeline ? <span>Timeline: {inquiry.timeline}</span> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
