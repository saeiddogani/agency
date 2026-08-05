import type { Metadata } from "next";
import Link from "next/link";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { NeedsAttention } from "@/components/admin/NeedsAttention";
import { TodaysWork } from "@/components/admin/TodaysWork";
import { RecentLeads } from "@/components/admin/RecentLeads";
import { SalesPipeline } from "@/components/admin/SalesPipeline";
import { ActiveProjects } from "@/components/admin/ActiveProjects";
import { BusinessSnapshot } from "@/components/admin/BusinessSnapshot";
import { SalesFunnel } from "@/components/admin/SalesFunnel";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { QuickActions } from "@/components/admin/QuickActions";
import {
  getLeadStatusCounts,
  getNeedsAttentionLeads,
  getPipelineLeads,
  getRecentActivity,
  getRecentLeads,
} from "@/lib/admin/queries/leads";
import { mapActivityToItems, mapCountsToSnapshotStats, mapLeadsToAttentionItems, mapLeadsToPipeline } from "@/lib/admin/mappers";

export const metadata: Metadata = {
  title: "Dashboard",
};

function SectionHeading({
  id,
  title,
  description,
  action,
  actionHref,
}: {
  id: string;
  title: string;
  description?: string;
  action?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 id={id} className="font-heading text-lg font-bold text-ink-950 sm:text-xl">
          {title}
        </h2>
        {description ? <p className="mt-0.5 text-sm text-ink-500">{description}</p> : null}
      </div>
      {action ? (
        actionHref ? (
          <Link href={actionHref} className="text-xs font-medium text-brand-600 hover:text-brand-700">
            {action}
          </Link>
        ) : (
          <span className="cursor-default select-none text-xs font-medium text-ink-400" aria-hidden="true">
            {action}
          </span>
        )
      ) : null}
    </div>
  );
}

/**
 * As of Phase 9, Needs Attention / Recent Leads / Sales Pipeline / Business
 * Snapshot / Recent Activity are backed by real Supabase data (leads,
 * lead_inquiries, activity_log — see src/lib/admin/queries/leads.ts).
 * Today's Work, Active Projects, and Sales Conversion stay on demo data on
 * purpose: they depend on follow_ups/projects, which are out of Phase 9's
 * scope (explicitly listed under "Do NOT build"). Quick Actions is
 * unchanged — every action it lists is a write, and this phase is
 * read-only.
 */
export default async function AdminDashboardPage() {
  const [statusCounts, needsAttentionLeads, pipelineLeads, recentLeads, recentActivity] = await Promise.all([
    getLeadStatusCounts(),
    getNeedsAttentionLeads(),
    getPipelineLeads(),
    getRecentLeads(),
    getRecentActivity(20),
  ]);

  return (
    <div className="flex flex-col gap-10">
      {/* Section 1 — Needs Attention */}
      <section aria-labelledby="needs-attention-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="needs-attention-heading"
          title="Needs Attention"
          description="Open leads that haven't been contacted yet"
        />
        <NeedsAttention items={mapLeadsToAttentionItems(needsAttentionLeads)} />
      </section>

      {/* Section 2 — Today's Work (demo — depends on follow-ups/projects, out of Phase 9 scope) */}
      <section aria-labelledby="todays-work-heading" className="flex flex-col gap-4">
        <SectionHeading id="todays-work-heading" title="Today's Work" />
        <TodaysWork />
      </section>

      {/* Section 3 — Recent Leads */}
      <section aria-labelledby="recent-leads-heading">
        <DashboardCard
          headingId="recent-leads-heading"
          title="Recent Leads"
          description="Newest contact form submissions"
          action={{ label: "View all leads", href: "/admin/leads" }}
        >
          <RecentLeads leads={recentLeads} />
        </DashboardCard>
      </section>

      {/* Section 4 — Sales Pipeline */}
      <section aria-labelledby="pipeline-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="pipeline-heading"
          title="Sales Pipeline"
          description="Track leads from inquiry to signed project"
          action="View Pipeline"
          actionHref="/admin/leads"
        />
        <SalesPipeline leads={mapLeadsToPipeline(pipelineLeads)} />
      </section>

      {/* Section 5 — Active Projects (demo — projects table not populated yet, out of Phase 9 scope) */}
      <section aria-labelledby="projects-heading">
        <DashboardCard headingId="projects-heading" title="Active Projects" description="Current website projects">
          <ActiveProjects />
        </DashboardCard>
      </section>

      {/* Section 6 — Business Snapshot (real lead-status counts) */}
      <section aria-labelledby="snapshot-heading" className="flex flex-col gap-4">
        <SectionHeading id="snapshot-heading" title="Business Snapshot" />
        <BusinessSnapshot stats={mapCountsToSnapshotStats(statusCounts)} />
      </section>

      {/* Section 7 — Sales Conversion (demo — full funnel needs proposal/invoice history, out of Phase 9 scope) */}
      <section aria-labelledby="funnel-heading">
        <DashboardCard
          headingId="funnel-heading"
          title="Sales Conversion"
          description="From first inquiry to signed project"
        >
          <SalesFunnel />
        </DashboardCard>
      </section>

      {/* Section 8 — Recent Activity */}
      <section aria-labelledby="activity-heading">
        <DashboardCard headingId="activity-heading" title="Recent Activity">
          <RecentActivity items={mapActivityToItems(recentActivity)} />
        </DashboardCard>
      </section>

      {/* Section 9 — Quick Actions (unchanged — every action here is a write, out of scope for a read-only phase) */}
      <section aria-labelledby="quick-actions-heading" className="flex flex-col gap-4">
        <SectionHeading id="quick-actions-heading" title="Quick Actions" />
        <QuickActions />
      </section>
    </div>
  );
}
