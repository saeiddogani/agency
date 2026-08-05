import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardCard } from "@/components/admin/DashboardCard";
import {
  LeadBusinessInfo,
  LeadContactInfo,
  LeadHeader,
  LeadInquiryTimeline,
  LeadRequestedServices,
} from "@/components/admin/LeadDetail";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { getLeadDetail } from "@/lib/admin/queries/leads";
import { mapActivityToItems } from "@/lib/admin/mappers";

export const metadata: Metadata = {
  title: "Lead details",
};

/** Read-only lead detail page. No editing, no status changes, no notes — see the Phase 9 report for what's explicitly deferred. */
export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getLeadDetail(id);

  if (!detail) {
    notFound();
  }

  const { lead, inquiries, activity } = detail;

  return (
    <div className="flex flex-col gap-8">
      <LeadHeader lead={lead} />

      <DashboardCard title="Contact Information">
        <LeadContactInfo lead={lead} />
      </DashboardCard>

      <DashboardCard title="Business Information">
        <LeadBusinessInfo lead={lead} />
      </DashboardCard>

      <DashboardCard title="Requested Services" description="Combined across every inquiry from this lead">
        <LeadRequestedServices inquiries={inquiries} />
      </DashboardCard>

      <DashboardCard
        title="Inquiry Timeline"
        description={`${inquiries.length} submission${inquiries.length === 1 ? "" : "s"} from this lead`}
      >
        <LeadInquiryTimeline inquiries={inquiries} />
      </DashboardCard>

      <DashboardCard title="Activity Timeline">
        <RecentActivity items={mapActivityToItems(activity)} />
      </DashboardCard>
    </div>
  );
}
