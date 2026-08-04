import type { Metadata } from "next";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { NeedsAttention } from "@/components/admin/NeedsAttention";
import { TodaysWork } from "@/components/admin/TodaysWork";
import { SalesPipeline } from "@/components/admin/SalesPipeline";
import { ActiveProjects } from "@/components/admin/ActiveProjects";
import { BusinessSnapshot } from "@/components/admin/BusinessSnapshot";
import { SalesFunnel } from "@/components/admin/SalesFunnel";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { QuickActions } from "@/components/admin/QuickActions";

export const metadata: Metadata = {
  title: "Dashboard",
};

function SectionHeading({
  id,
  title,
  description,
  action,
}: {
  id: string;
  title: string;
  description?: string;
  action?: string;
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
        <span className="cursor-default select-none text-xs font-medium text-ink-400" aria-hidden="true">
          {action}
        </span>
      ) : null}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Section 1 — Needs Attention */}
      <section aria-labelledby="needs-attention-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="needs-attention-heading"
          title="Needs Attention"
          description="Items that need your attention today"
        />
        <NeedsAttention />
      </section>

      {/* Section 2 — Today's Work */}
      <section aria-labelledby="todays-work-heading" className="flex flex-col gap-4">
        <SectionHeading id="todays-work-heading" title="Today's Work" />
        <TodaysWork />
      </section>

      {/* Section 3 — Sales Pipeline */}
      <section aria-labelledby="pipeline-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="pipeline-heading"
          title="Sales Pipeline"
          description="Track leads from inquiry to signed project"
          action="View Pipeline"
        />
        <SalesPipeline />
      </section>

      {/* Section 4 — Active Projects */}
      <section aria-labelledby="projects-heading">
        <DashboardCard headingId="projects-heading" title="Active Projects" description="Current website projects">
          <ActiveProjects />
        </DashboardCard>
      </section>

      {/* Section 5 — Business Snapshot */}
      <section aria-labelledby="snapshot-heading" className="flex flex-col gap-4">
        <SectionHeading id="snapshot-heading" title="Business Snapshot" />
        <BusinessSnapshot />
      </section>

      {/* Section 6 — Sales Conversion */}
      <section aria-labelledby="funnel-heading">
        <DashboardCard
          headingId="funnel-heading"
          title="Sales Conversion"
          description="From first inquiry to signed project"
        >
          <SalesFunnel />
        </DashboardCard>
      </section>

      {/* Section 7 — Recent Activity */}
      <section aria-labelledby="activity-heading">
        <DashboardCard headingId="activity-heading" title="Recent Activity">
          <RecentActivity />
        </DashboardCard>
      </section>

      {/* Section 8 — Quick Actions */}
      <section aria-labelledby="quick-actions-heading" className="flex flex-col gap-4">
        <SectionHeading id="quick-actions-heading" title="Quick Actions" />
        <QuickActions />
      </section>
    </div>
  );
}
