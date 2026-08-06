import "server-only";
import { createClient } from "@/lib/supabase/server";
import { templateFilterCategories } from "@/lib/templates";
import type {
  ActivityLogRow,
  LeadDetail,
  LeadInquiryRow,
  LeadPriority,
  LeadRow,
  LeadsListParams,
  LeadsListResult,
  LeadStatus,
} from "@/lib/admin/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * ADMIN — LEAD QUERIES (Phase 9, read-only)
 * ─────────────────────────────────────────────────────────────────────────
 * Every function here uses the RLS-respecting server client
 * (src/lib/supabase/server.ts) — NOT the service-role admin client from
 * src/lib/supabase/admin.ts. These queries run as the signed-in admin's
 * own session, subject to the same RLS policies as everything else in
 * /admin; there is no reason for a dashboard read to bypass Row Level
 * Security, and doing so would be a real regression from the architecture
 * Phase 7/8 established. By the time any of these run, the (dashboard)
 * route group's layout has already confirmed the caller is a signed-in,
 * active admin — see src/app/admin/(dashboard)/layout.tsx.
 *
 * Nothing here writes, updates, or deletes anything — Phase 9 is read-only
 * by explicit instruction.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Business types a lead can have — reused from the same list the public contact form validates against, not queried from the database (source is a fixed, known set, so a distinct-values query would be pure overhead). */
export const businessTypeOptions = templateFilterCategories.filter((category) => category !== "All") as string[];

/** Every lead created via the contact form has source = 'contact_form' today (see the create_contact_inquiry function) — this list exists so the filter UI is ready for future sources without a schema change. */
export const sourceOptions = ["contact_form"];

/** Most recently created leads, for the dashboard's "Recent Leads" section. */
export async function getRecentLeads(limit = 6): Promise<LeadRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[admin] getRecentLeads failed:", error.message);
    return [];
  }
  return (data ?? []) as LeadRow[];
}

/**
 * Most recent activity_log rows, across all entities — currently only
 * leads generate activity (contact form submissions), but the table and
 * this query are already entity-agnostic. Capped at 20 per Phase 9's
 * explicit performance requirement.
 */
export async function getRecentActivity(limit = 20): Promise<ActivityLogRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[admin] getRecentActivity failed:", error.message);
    return [];
  }
  return (data ?? []) as ActivityLogRow[];
}

/**
 * "Needs Attention" — there's no follow_ups table yet (out of Phase 9's
 * scope), so this is a deliberate, documented stand-in heuristic rather
 * than a real reminder system: open leads (not won/lost, not archived)
 * that have never been contacted (last_contacted_at is null) and are
 * either high priority or brand new, oldest-first. This is meant to
 * surface "leads at risk of going cold," not to replace real follow-up
 * tracking once that's built (a later phase).
 */
export async function getNeedsAttentionLeads(limit = 6): Promise<LeadRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .is("archived_at", null)
    .not("status", "eq", "won")
    .not("status", "eq", "lost")
    .is("last_contacted_at", null)
    .or("priority.eq.high,status.eq.new")
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[admin] getNeedsAttentionLeads failed:", error.message);
    return [];
  }
  return (data ?? []) as LeadRow[];
}

/**
 * Paginated, filtered, sorted leads list for /admin/leads. Two queries:
 * one for the page of leads (with an exact count for pagination), and one
 * small follow-up query for just the "last inquiry" timestamp of the leads
 * on THIS page (bounded by page size, not a per-row N+1 — see the comment
 * below).
 */
export async function getLeadsList(params: LeadsListParams): Promise<LeadsListResult> {
  const supabase = await createClient();
  const page = Math.max(1, params.page ?? 1);
  const pageSize = params.pageSize ?? 25;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("leads").select("*", { count: "exact" });

  if (params.search) {
    const term = params.search.trim();
    if (term) {
      const escaped = term.replace(/[%,]/g, "");
      query = query.or(`name.ilike.%${escaped}%,company.ilike.%${escaped}%,email.ilike.%${escaped}%`);
    }
  }
  if (params.status) query = query.eq("status", params.status);
  if (params.priority) query = query.eq("priority", params.priority);
  if (params.businessType) query = query.eq("business_type", params.businessType);
  if (params.source) query = query.eq("source", params.source);

  switch (params.sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "name":
      query = query.order("name", { ascending: true });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("[admin] getLeadsList failed:", error.message);
    return { leads: [], total: 0, page, pageSize, businessTypes: businessTypeOptions, sources: sourceOptions };
  }

  const leads = (data ?? []) as LeadRow[];

  // Budget/Timeline/Last Inquiry columns live on lead_inquiries, not leads
  // (a lead can have more than one inquiry) — this second query fetches
  // just enough to show the MOST RECENT inquiry's values per lead, scoped
  // only to the lead ids on this page (bounded by pageSize, never the
  // whole table).
  const lastInquiryByLead = new Map<string, { submitted_at: string; budget_range: string | null; timeline: string | null }>();
  if (leads.length > 0) {
    const { data: inquiries, error: inquiryError } = await supabase
      .from("lead_inquiries")
      .select("lead_id, submitted_at, budget_range, timeline")
      .in(
        "lead_id",
        leads.map((lead) => lead.id),
      );

    if (inquiryError) {
      console.error("[admin] getLeadsList last-inquiry lookup failed:", inquiryError.message);
    } else {
      for (const row of inquiries ?? []) {
        const existing = lastInquiryByLead.get(row.lead_id);
        if (!existing || row.submitted_at > existing.submitted_at) {
          lastInquiryByLead.set(row.lead_id, row);
        }
      }
    }
  }

  return {
    leads: leads.map((lead) => {
      const lastInquiry = lastInquiryByLead.get(lead.id);
      return {
        ...lead,
        lastInquiryAt: lastInquiry?.submitted_at ?? null,
        lastInquiryBudget: lastInquiry?.budget_range ?? null,
        lastInquiryTimeline: lastInquiry?.timeline ?? null,
      };
    }),
    total: count ?? 0,
    page,
    pageSize,
    businessTypes: businessTypeOptions,
    sources: sourceOptions,
  };
}

/** A single lead plus its full inquiry and activity history, for /admin/leads/[id]. Returns null if not found (or not visible under RLS). */
export async function getLeadDetail(id: string): Promise<LeadDetail | null> {
  const supabase = await createClient();

  const [leadResult, inquiriesResult, activityResult] = await Promise.all([
    supabase.from("leads").select("*").eq("id", id).maybeSingle(),
    supabase.from("lead_inquiries").select("*").eq("lead_id", id).order("submitted_at", { ascending: true }),
    supabase
      .from("activity_log")
      .select("*")
      .eq("entity_type", "lead")
      .eq("entity_id", id)
      .order("created_at", { ascending: true }),
  ]);

  if (leadResult.error) {
    console.error("[admin] getLeadDetail lead lookup failed:", leadResult.error.message);
    return null;
  }
  if (!leadResult.data) return null;

  if (inquiriesResult.error) {
    console.error("[admin] getLeadDetail inquiries lookup failed:", inquiriesResult.error.message);
  }
  if (activityResult.error) {
    console.error("[admin] getLeadDetail activity lookup failed:", activityResult.error.message);
  }

  return {
    lead: leadResult.data as LeadRow,
    inquiries: (inquiriesResult.data ?? []) as LeadInquiryRow[],
    activity: (activityResult.data ?? []) as ActivityLogRow[],
  };
}

// Re-exported so pages importing from this module don't also need to
// import from "@/lib/admin/types" just for these two.
export type { LeadPriority, LeadStatus };
