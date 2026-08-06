import type { Metadata } from "next";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { NeedsAttention } from "@/components/admin/NeedsAttention";
import { RecentLeads } from "@/components/admin/RecentLeads";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { getNeedsAttentionLeads, getRecentActivity, getRecentLeads } from "@/lib/admin/queries/leads";
import { mapActivityToItems, mapLeadsToAttentionItems } from "@/lib/admin/mappers";

export const metadata: Metadata = {
  title: "Dashboard",
};

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 id={id} className="font-heading text-lg font-bold text-ink-950 sm:text-xl">
        {title}
      </h2>
      {description ? <p className="mt-0.5 text-sm text-ink-500">{description}</p> : null}
    </div>
  );
}

/**
 * Simplified dashboard homepage — three sections, all backed by real
 * Supabase data (see src/lib/admin/queries/leads.ts): Needs Attention,
 * Recent Leads, Recent Activity. Today's Work, Sales Pipeline, Active
 * Projects, Business Snapshot, Sales Conversion, and Quick Actions were
 * removed on purpose (they either depended on tables that don't have real
 * data yet — follow_ups, projects, proposals — or were judged not
 * essential to "what needs my attention today"). Their components and
 * demo data are untouched elsewhere in the project in case a later phase
 * wants them back; only this page stopped rendering them and querying for
 * them.
 */
export default async function AdminDashboardPage() {
  const [needsAttentionLeads, recentLeads, recentActivity] = await Promise.all([
    getNeedsAttentionLeads(),
    getRecentLeads(),
    getRecentActivity(20),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      {/* Section 1 — Needs Attention */}
      <section aria-labelledby="needs-attention-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="needs-attention-heading"
          title="Needs Attention"
          description="Open leads that haven't been contacted yet"
        />
        <NeedsAttention items={mapLeadsToAttentionItems(needsAttentionLeads)} />
      </section>

      {/* Section 2 — Recent Leads */}
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

      {/* Section 3 — Recent Activity */}
      <section aria-labelledby="activity-heading">
        <DashboardCard headingId="activity-heading" title="Recent Activity">
          <RecentActivity items={mapActivityToItems(recentActivity)} />
        </DashboardCard>
      </section>
    </div>
  );
}
