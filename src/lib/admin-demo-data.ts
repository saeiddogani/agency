import type { ComponentType } from "react";
import {
  IconGrid,
  IconInbox,
  IconClock,
  IconUsers,
  IconBriefcase,
  IconFileText,
  IconReceipt,
  IconGlobe,
  IconLayout,
  IconTrendingUp,
  IconSettings,
  IconDollarSign,
  IconCheckCircle,
  type IconProps,
} from "@/components/icons";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * ADMIN DASHBOARD — DEMO DATA
 * ─────────────────────────────────────────────────────────────────────────
 * Everything below is illustrative placeholder content for the `/admin`
 * dashboard UI. There is no database, CRM, or API behind it yet.
 *
 * FUTURE ARCHITECTURE: every `demo*` export below is shaped the way a real
 * API/database response would be shaped (flat records with typed fields,
 * grouped/derived in the UI rather than pre-grouped in the data). When a
 * real backend exists, each `demo*` export can be swapped for a
 * `database*` fetch of the same shape (e.g. `demoLeads` → `databaseLeads`)
 * without changing the components that consume it.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Placeholder "signed in" identity — replace once real auth/session exists. */
export const currentAdminUser = {
  name: "Saeid",
};

/* ───────────────────────── Sidebar navigation ───────────────────────── */

export interface AdminNavItem {
  label: string;
  /** Present only for sections that are actually built. Others render inert. */
  href?: string;
  icon: ComponentType<IconProps>;
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Work",
    items: [
      { label: "Dashboard", href: "/admin", icon: IconGrid },
      { label: "Leads", icon: IconInbox },
      { label: "Follow-ups", icon: IconClock },
      { label: "Clients", icon: IconUsers },
      { label: "Projects", icon: IconBriefcase },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Proposals", icon: IconFileText },
      { label: "Invoices", icon: IconReceipt },
    ],
  },
  {
    label: "Websites",
    items: [
      { label: "Websites", icon: IconGlobe },
      { label: "Templates", icon: IconLayout },
    ],
  },
  {
    label: "Insights",
    items: [{ label: "Analytics", icon: IconTrendingUp }],
  },
  {
    label: "System",
    items: [{ label: "Settings", icon: IconSettings }],
  },
];

/* ───────────────────────── Needs attention ───────────────────────── */

export type AttentionKind = "overdue" | "today" | "waiting" | "deadline";

export interface DemoAttentionItem {
  id: string;
  kind: AttentionKind;
  heading: string;
  business: string;
  detail: string;
  meta: string;
  actionLabel: string;
}

export const demoNeedsAttention: DemoAttentionItem[] = [
  {
    id: "attn-1",
    kind: "overdue",
    heading: "Overdue Follow-up",
    business: "ABC Roofing",
    detail: "Follow up about website proposal",
    meta: "2 days overdue",
    actionLabel: "Follow up",
  },
  {
    id: "attn-2",
    kind: "today",
    heading: "Follow-up Today",
    business: "Casa Bella",
    detail: "Call client about homepage design",
    meta: "Today · 2:00 PM",
    actionLabel: "View",
  },
  {
    id: "attn-3",
    kind: "waiting",
    heading: "Proposal Waiting",
    business: "North Shore Landscaping",
    detail: "Website proposal",
    meta: "Waiting for response",
    actionLabel: "View Proposal",
  },
  {
    id: "attn-4",
    kind: "deadline",
    heading: "Project Deadline",
    business: "Northpoint Realty",
    detail: "Homepage review",
    meta: "Due tomorrow",
    actionLabel: "View Project",
  },
];

/* ───────────────────────── Today's work ───────────────────────── */

export type WorkStatus = "overdue" | "today" | "upcoming" | "in-progress" | "pending" | "new";

export interface DemoWorkItem {
  id: string;
  title: string;
  business: string;
  when: string;
  status: WorkStatus;
}

export const demoFollowUpTasks: DemoWorkItem[] = [
  { id: "wf-1", title: "Follow up on proposal", business: "ABC Roofing", when: "Overdue", status: "overdue" },
  { id: "wf-2", title: "Call about homepage design", business: "Casa Bella", when: "Today · 2:00 PM", status: "today" },
  {
    id: "wf-3",
    title: "Check in after proposal sent",
    business: "North Shore Landscaping",
    when: "Tomorrow",
    status: "upcoming",
  },
];

export const demoProjectTasks: DemoWorkItem[] = [
  {
    id: "wp-1",
    title: "Review Casa Bella homepage",
    business: "Casa Bella",
    when: "Due Aug 7",
    status: "in-progress",
  },
  {
    id: "wp-2",
    title: "Finish Northpoint Realty mobile layout",
    business: "Northpoint Realty",
    when: "Due Aug 20",
    status: "in-progress",
  },
];

export const demoSalesTasks: DemoWorkItem[] = [
  { id: "ws-1", title: "Send proposal", business: "ABC Roofing", when: "Today", status: "pending" },
  { id: "ws-2", title: "Qualify new lead", business: "Riverside Landscaping", when: "Today", status: "new" },
];

/* ───────────────────────── Sales pipeline ───────────────────────── */

export type PipelineStage = "New" | "Contacted" | "Qualified" | "Proposal" | "Won";
export type LeadPriority = "Low" | "Medium" | "High";

export interface DemoLead {
  id: string;
  business: string;
  serviceType: string;
  value: number;
  stage: PipelineStage;
  priority?: LeadPriority;
  /** Overrides the priority badge when a more specific status reads better (e.g. "Proposal Sent"). */
  statusLabel?: string;
  followUpDate: string;
}

export const pipelineStages: PipelineStage[] = ["New", "Contacted", "Qualified", "Proposal", "Won"];

export const demoLeads: DemoLead[] = [
  // New
  { id: "lead-1", business: "Riverside Landscaping", serviceType: "Website redesign", value: 2800, stage: "New", priority: "Medium", followUpDate: "Aug 8" },
  { id: "lead-2", business: "Bluewave Dental", serviceType: "New website", value: 3200, stage: "New", priority: "Low", followUpDate: "Aug 9" },
  { id: "lead-3", business: "Fresh Cut Barbershop", serviceType: "Landing page", value: 1200, stage: "New", priority: "Low", followUpDate: "Aug 10" },
  // Contacted
  { id: "lead-4", business: "Harbor View Cafe", serviceType: "Website redesign", value: 2600, stage: "Contacted", priority: "Medium", followUpDate: "Aug 6" },
  { id: "lead-5", business: "Sunrise Auto Repair", serviceType: "New website", value: 3000, stage: "Contacted", priority: "Medium", followUpDate: "Aug 7" },
  { id: "lead-6", business: "Peak Fitness Studio", serviceType: "Website + booking page", value: 3800, stage: "Contacted", priority: "High", followUpDate: "Aug 9" },
  { id: "lead-7", business: "Golden Gate Tax Services", serviceType: "New website", value: 2400, stage: "Contacted", priority: "Low", followUpDate: "Aug 11" },
  // Qualified
  { id: "lead-8", business: "Maple Street Dentistry", serviceType: "New website", value: 3400, stage: "Qualified", priority: "Medium", followUpDate: "Aug 8" },
  { id: "lead-9", business: "Coastal Realty Group", serviceType: "Website redesign", value: 4000, stage: "Qualified", priority: "High", followUpDate: "Aug 9" },
  { id: "lead-10", business: "Blue Ridge Contractors", serviceType: "New website", value: 2900, stage: "Qualified", priority: "Medium", followUpDate: "Aug 10" },
  // Proposal
  {
    id: "lead-11",
    business: "ABC Roofing",
    serviceType: "Website redesign",
    value: 3500,
    stage: "Proposal",
    priority: "High",
    followUpDate: "Aug 5",
  },
  {
    id: "lead-12",
    business: "Casa Bella",
    serviceType: "New business website",
    value: 4200,
    stage: "Proposal",
    statusLabel: "Proposal Sent",
    followUpDate: "Aug 6",
  },
  // Won
  { id: "lead-13", business: "North Shore Landscaping", serviceType: "Website redesign", value: 2750, stage: "Won", statusLabel: "Signed Jul 30", followUpDate: "Jul 30" },
  { id: "lead-14", business: "Studio 22", serviceType: "New website", value: 2200, stage: "Won", statusLabel: "Signed Jul 25", followUpDate: "Jul 25" },
];

/* ───────────────────────── Active projects ───────────────────────── */

export type ProjectStage = "Planning" | "Design" | "Development" | "Review" | "Launch";

export interface DemoProject {
  id: string;
  name: string;
  client: string;
  stage: ProjectStage;
  /** Optional more specific display text for the stage badge (e.g. "Client Review" for "Review"). */
  stageLabel?: string;
  progress: number;
  dueDate: string;
}

export const demoActiveProjects: DemoProject[] = [
  { id: "proj-1", name: "ABC Roofing Website", client: "ABC Roofing", stage: "Development", progress: 65, dueDate: "Aug 12" },
  {
    id: "proj-2",
    name: "Casa Bella Website",
    client: "Casa Bella",
    stage: "Review",
    stageLabel: "Client Review",
    progress: 85,
    dueDate: "Aug 7",
  },
  { id: "proj-3", name: "Northpoint Realty", client: "Northpoint Realty", stage: "Design", progress: 35, dueDate: "Aug 20" },
  {
    id: "proj-4",
    name: "North Shore Landscaping",
    client: "North Shore Landscaping",
    stage: "Planning",
    progress: 15,
    dueDate: "Aug 28",
  },
];

/* ───────────────────────── Business snapshot ───────────────────────── */

export interface DemoSnapshotStat {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: ComponentType<IconProps>;
}

export const demoBusinessSnapshot: DemoSnapshotStat[] = [
  { id: "leads", label: "Leads", value: "24", helper: "This month", icon: IconInbox },
  { id: "qualified", label: "Qualified", value: "11", helper: "This month", icon: IconCheckCircle },
  { id: "proposals", label: "Proposals", value: "6", helper: "This month", icon: IconFileText },
  { id: "won", label: "Won", value: "3", helper: "This month", icon: IconTrendingUp },
  { id: "pipeline", label: "Pipeline", value: "$14,500", helper: "Estimated value", icon: IconDollarSign },
];

/* ───────────────────────── Sales funnel ───────────────────────── */

export interface DemoFunnelStage {
  label: string;
  value: number;
}

export const demoSalesFunnel: DemoFunnelStage[] = [
  { label: "Leads", value: 24 },
  { label: "Contacted", value: 18 },
  { label: "Qualified", value: 11 },
  { label: "Proposal", value: 6 },
  { label: "Won", value: 3 },
];

/* ───────────────────────── Recent activity ───────────────────────── */

export type ActivityKind = "lead" | "stage-change" | "proposal" | "project" | "invoice";

export interface DemoActivityItem {
  id: string;
  kind: ActivityKind;
  message: string;
  business?: string;
  timestamp: string;
  icon: ComponentType<IconProps>;
}

export const demoRecentActivity: DemoActivityItem[] = [
  { id: "act-1", kind: "lead", message: "New lead received from contact form", business: "ABC Roofing", timestamp: "2 min ago", icon: IconInbox },
  { id: "act-2", kind: "stage-change", message: "ABC Roofing moved to Qualified", timestamp: "1 hour ago", icon: IconTrendingUp },
  { id: "act-3", kind: "proposal", message: "Proposal sent to Casa Bella", timestamp: "3 hours ago", icon: IconFileText },
  { id: "act-4", kind: "project", message: "Northpoint Realty project created", timestamp: "Yesterday", icon: IconBriefcase },
  { id: "act-5", kind: "invoice", message: "Invoice marked as paid", timestamp: "Yesterday", icon: IconReceipt },
];

/* ───────────────────────── Quick actions ───────────────────────── */

export interface DemoQuickAction {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
}

/** Powers both the header "+ Add" dropdown and the Quick Actions section. */
export const demoQuickActions: DemoQuickAction[] = [
  { id: "lead", label: "New Lead", icon: IconInbox },
  { id: "client", label: "New Client", icon: IconUsers },
  { id: "project", label: "New Project", icon: IconBriefcase },
  { id: "proposal", label: "New Proposal", icon: IconFileText },
  { id: "followup", label: "New Follow-up", icon: IconClock },
];
