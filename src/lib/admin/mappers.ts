import {
  IconAlertCircle,
  IconCheckCircle,
  IconDollarSign,
  IconFileText,
  IconInbox,
  IconTrendingUp,
} from "@/components/icons";
import type {
  DemoActivityItem,
  DemoAttentionItem,
  DemoLead,
  DemoSnapshotStat,
  LeadPriority as DemoLeadPriority,
  PipelineStage,
} from "@/lib/admin-demo-data";
import type { ActivityLogRow, LeadRow, LeadStatusCounts } from "@/lib/admin/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * ADMIN — DASHBOARD MAPPERS (Phase 9)
 * ─────────────────────────────────────────────────────────────────────────
 * Pure functions that reshape real database rows into the exact prop
 * shapes the existing dashboard components already render (`Demo*` types
 * from src/lib/admin-demo-data.ts). This is what lets the dashboard show
 * real data with zero changes to those components' visual output — only
 * where their data comes from changes. No component in here does any
 * fetching; that's the queries layer's job (src/lib/admin/queries/).
 * ─────────────────────────────────────────────────────────────────────────
 */

const priorityLabel: Record<LeadRow["priority"], DemoLeadPriority> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const statusToPipelineStage: Partial<Record<LeadRow["status"], PipelineStage>> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  // "lost" intentionally has no mapping — lost leads never appear on the
  // pipeline board, matching the board's original 5-column design.
};

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

/** Lead status counts → the dashboard's stat cards (replaces the old demo Business Snapshot content). */
export function mapCountsToSnapshotStats(counts: LeadStatusCounts): DemoSnapshotStat[] {
  return [
    { id: "new", label: "New Leads", value: String(counts.new), helper: "Not yet contacted", icon: IconInbox },
    { id: "qualified", label: "Qualified", value: String(counts.qualified), helper: "In progress", icon: IconCheckCircle },
    { id: "proposal", label: "Proposal Sent", value: String(counts.proposal), helper: "Awaiting response", icon: IconFileText },
    { id: "won", label: "Won", value: String(counts.won), helper: "All time", icon: IconTrendingUp },
    { id: "lost", label: "Lost", value: String(counts.lost), helper: "All time", icon: IconAlertCircle },
    { id: "active", label: "Total Active Leads", value: String(counts.totalActive), helper: "Open right now", icon: IconDollarSign },
  ];
}

/** leads → Sales Pipeline kanban cards, grouped by src/lib/admin-demo-data.ts's pipelineStages. */
export function mapLeadsToPipeline(leads: LeadRow[]): DemoLead[] {
  return leads.flatMap((lead) => {
    const stage = statusToPipelineStage[lead.status];
    if (!stage) return [];
    return [
      {
        id: lead.id,
        business: lead.company || lead.name,
        serviceType: lead.business_type ?? "Website inquiry",
        value: lead.estimated_value ?? 0,
        stage,
        priority: priorityLabel[lead.priority],
        followUpDate: lead.last_contacted_at
          ? new Date(lead.last_contacted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
          : "Not yet contacted",
      } satisfies DemoLead,
    ];
  });
}
