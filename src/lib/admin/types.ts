/**
 * ─────────────────────────────────────────────────────────────────────────
 * ADMIN — REAL DATA TYPES (Phase 9)
 * ─────────────────────────────────────────────────────────────────────────
 * Mirrors the actual Postgres schema (see supabase/migrations/) for the
 * three tables Phase 9 reads from: leads, lead_inquiries, activity_log.
 * Deliberately separate from src/lib/admin-demo-data.ts's `Demo*` types —
 * those describe UI-shaped placeholder content; these describe raw
 * database rows. Query functions in src/lib/admin/queries/ map between
 * the two where a component's existing prop shape is being reused as-is.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
export type LeadPriority = "low" | "medium" | "high";

export const leadStatuses: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];
export const leadPriorities: LeadPriority[] = ["low", "medium", "high"];

export interface LeadRow {
  id: string;
  name: string;
  company: string | null;
  email: string;
  email_normalized: string;
  phone: string | null;
  website: string | null;
  business_type: string | null;
  source: string;
  status: LeadStatus;
  priority: LeadPriority;
  lost_reason: string | null;
  estimated_value: number | null;
  assigned_to: string | null;
  last_contacted_at: string | null;
  won_at: string | null;
  lost_at: string | null;
  archived_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadInquiryRow {
  id: string;
  lead_id: string;
  submitted_at: string;
  source: string;
  message: string | null;
  services_requested: string[] | null;
  budget_range: string | null;
  timeline: string | null;
  submitted_name: string | null;
  submitted_email: string | null;
  submitted_phone: string | null;
  submitted_website: string | null;
  created_at: string;
}

export interface ActivityLogRow {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  description: string;
  metadata: Record<string, unknown> | null;
  user_id: string | null;
  created_at: string;
}

/** A lead plus a few fields from its most recent inquiry — used by the leads list table (Budget/Timeline/Last Inquiry columns live on lead_inquiries, not leads, since a lead can have more than one). */
export interface LeadListRow extends LeadRow {
  lastInquiryAt: string | null;
  lastInquiryBudget: string | null;
  lastInquiryTimeline: string | null;
}

export interface LeadStatusCounts {
  new: number;
  contacted: number;
  qualified: number;
  proposal: number;
  won: number;
  lost: number;
  /** Open leads: status not won/lost, and not archived. */
  totalActive: number;
}

export type LeadSort = "newest" | "oldest" | "name";
export type LeadPageSize = 25 | 50 | 100;

export interface LeadsListParams {
  search?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  businessType?: string;
  source?: string;
  sort?: LeadSort;
  page?: number;
  pageSize?: LeadPageSize;
}

export interface LeadsListResult {
  leads: LeadListRow[];
  total: number;
  page: number;
  pageSize: LeadPageSize;
  /** Distinct business types across ALL leads (not just this page) — powers the filter dropdown. */
  businessTypes: string[];
  /** Distinct sources across ALL leads — powers the filter dropdown. */
  sources: string[];
}

export interface LeadDetail {
  lead: LeadRow;
  inquiries: LeadInquiryRow[];
  activity: ActivityLogRow[];
}
