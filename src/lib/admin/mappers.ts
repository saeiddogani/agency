import { IconInbox, IconTrendingUp } from "@/components/icons";
import type { DemoActivityItem, DemoAttentionItem } from "@/lib/admin-demo-data";
import type { ActivityLogRow, LeadRow } from "@/lib/admin/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * ADMIN — DASHBOARD MAPPERS
 * ─────────────────────────────────────────────────────────────────────────
 * Pure functions that reshape real database rows into the exact prop
 * shapes the existing dashboard components already render (`Demo*` types
 * from src/lib/admin-demo-data.ts). This is what lets the dashboard show
 * real data with zero changes to those components' visual output — only
 * where their data comes from changes. No component in here does any
 * fetching; that's the queries layer's job (src/lib/admin/queries/).
 *
 * mapCountsToSnapshotStats() and mapLeadsToPipeline() (Business Snapshot /
 * Sales Pipeline mappers) were removed when the dashboard was simplified —
 * those sections no longer render on /admin. See CHANGELOG.md. The
 * BusinessSnapshot/SalesPipeline/StatCard/PipelineCard components and
 * their demo data in admin-demo-data.ts are untouched, in case a later
 * phase wants them back.
 * ─────────────────────────────────────────────────────────────────────────
 */

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** leads → Needs Attention cards. See getNeedsAttentionLeads() for the selection rule this displays. */
export function mapLeadsToAttentionItems(leads: LeadRow[]): DemoAttentionItem[] {
  return leads.map((lead) => ({
    id: lead.id,
    kind: lead.priority === "high" ? "overdue" : "waiting",
    heading: lead.priority === "high" ? "High Priority — No Contact Yet" : "New Lead — No Contact Yet",
    business: lead.company || lead.name,
    detail: lead.business_type ? `${lead.business_type} inquiry` : "Website inquiry",
    meta: `Received ${relativeTime(lead.created_at)}`,
    actionLabel: "View Lead",
    href: `/admin/leads/${lead.id}`,
  }));
}

/** activity_log rows → Recent Activity timeline items. */
export function mapActivityToItems(rows: ActivityLogRow[]): DemoActivityItem[] {
  return rows.map((row) => ({
    id: row.id,
    kind: "lead",
    message: row.description,
    timestamp: relativeTime(row.created_at),
    icon: row.action === "lead_created" ? IconInbox : IconTrendingUp,
    href: row.entity_type === "lead" ? `/admin/leads/${row.entity_id}` : undefined,
  }));
}
