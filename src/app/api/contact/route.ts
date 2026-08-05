import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EMAIL_PATTERN, type InquiryPayload } from "@/lib/inquiry";
import { buildLeadNotificationEmail, buildCustomerAutoReplyEmail } from "@/lib/email-templates";
import { checkRateLimit } from "@/lib/rate-limit";
import { servicesNeededOptions, budgetOptions, timelineOptions } from "@/lib/data";
import { templateFilterCategories } from "@/lib/templates";
import { siteConfig } from "@/lib/site-config";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Project inquiry endpoint — validates a contact form submission, stores it
 * in Supabase (lead + lead_inquiry + activity_log, via the
 * create_contact_inquiry database function — see
 * supabase/migrations/20260804090000_create_contact_inquiry_function.sql),
 * and, once configured, emails it to the business inbox via Resend (see
 * `.env.example` for the required environment variables).
 *
 * Two independent things can be "not configured yet," and they're handled
 * differently on purpose:
 * - Supabase (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY) missing or
 *   the database write failing is a hard failure — the inquiry was not
 *   captured anywhere, so this returns an error and sends no emails.
 * - Resend (EMAIL_API_KEY / EMAIL_FROM) missing is "demo mode": the lead is
 *   still saved for real, just not emailed, and the client is told this
 *   honestly. This is a change from the previous phase, where demo mode
 *   skipped everything (there was nothing to save yet); see the Phase 8
 *   report for the full reasoning.
 *
 * Email provider: Resend (https://resend.com). Chosen because it has a
 * first-party Next.js App Router integration, a straightforward TypeScript
 * SDK, and a free tier that comfortably covers a small business's inquiry
 * volume. Swapping providers later only requires changing the `sendEmail`
 * calls below — nothing in the UI or `src/lib/inquiry.ts` needs to change.
 */

const MAX_BODY_BYTES = 20_000; // generous for this form; blocks abusive oversized payloads
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }; // 5 submissions / 10 minutes / IP

/** Shape of the single row returned by the create_contact_inquiry() RPC call. */
interface CreateContactInquiryResult {
  lead_id: string;
  inquiry_id: string;
  is_new_lead: boolean;
}

const businessTypeOptions = templateFilterCategories.filter((category) => category !== "All") as readonly string[];

function getClientIp(request: Request): string {
  // Vercel/most proxies set x-forwarded-for as "client, proxy1, proxy2".
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Server-side validation. Never trusts the client-side validation in
 * ContactForm.tsx — every field is re-checked here, including the enum
 * fields (business type, services, budget, timeline) against the same
 * option lists the form renders from, so arbitrary/malicious values can't
 * be submitted by bypassing the UI.
 */
function validatePayload(body: Partial<InquiryPayload>): string | null {
  if (!isNonEmptyString(body.name) || body.name.length > MAX_FIELD_LENGTH) {
    return "Please enter a valid name.";
  }
  if (!isNonEmptyString(body.businessName) || body.businessName.length > MAX_FIELD_LENGTH) {
    return "Please enter a valid business name.";
  }
  if (!isNonEmptyString(body.email) || body.email.length > MAX_FIELD_LENGTH || !EMAIL_PATTERN.test(body.email.trim())) {
    return "Please enter a valid email address.";
  }
  if (typeof body.phone !== "string" || body.phone.length > MAX_FIELD_LENGTH) {
    return "Please enter a valid phone number.";
  }
  if (typeof body.website !== "string" || body.website.length > MAX_FIELD_LENGTH) {
    return "Please enter a valid website.";
  }
  if (!isNonEmptyString(body.businessType) || !businessTypeOptions.includes(body.businessType)) {
    return "Please select a valid business type.";
  }
  if (
    !Array.isArray(body.servicesNeeded) ||
    body.servicesNeeded.length === 0 ||
    !body.servicesNeeded.every((service) => typeof service === "string" && servicesNeededOptions.includes(service as (typeof servicesNeededOptions)[number]))
  ) {
    return "Please select at least one valid service.";
  }
  if (body.budget !== undefined && body.budget !== "" && !budgetOptions.includes(body.budget as (typeof budgetOptions)[number])) {
    return "Please select a valid budget.";
  }
  if (body.timeline !== undefined && body.timeline !== "" && !timelineOptions.includes(body.timeline as (typeof timelineOptions)[number])) {
    return "Please select a valid timeline.";
  }
  if (!isNonEmptyString(body.message) || body.message.length > MAX_MESSAGE_LENGTH) {
    return "Please add a bit more detail about your project.";
  }

  return null;
}

export async function POST(request: Request) {
  // --- 1. Cheap size guard before parsing anything -----------------------
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }

  // --- 2. Rate limiting, per IP ------------------------------------------
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(ip, RATE_LIMIT.limit, RATE_LIMIT.windowMs);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  // --- 3. Parse body -------------------------------------------------------
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }

  let body: Partial<InquiryPayload> & { companyWebsite?: string };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // --- 4. Honeypot ---------------------------------------------------------
  // A hidden field real visitors never see or fill in. If it's populated,
  // silently report success without sending anything — this avoids
  // tipping off simple bots that their submission was rejected.
  if (isNonEmptyString(body.companyWebsite)) {
    console.log("[contact] Honeypot triggered — submission discarded.");
    return NextResponse.json({ ok: true, demo: false });
  }

  // --- 5. Validation ---------------------------------------------------------
  const validationError = validatePayload(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const payload = body as InquiryPayload;
  const submittedAt = new Date();

  // --- 6. Atomic database operation -----------------------------------------
  // The database write is the source of truth for "was this inquiry
  // captured" — it happens before any email is attempted, and unlike the
  // two best-effort email sends below, a failure here is fatal to the
  // request: no email is sent, and the client is never told the inquiry
  // succeeded. See src/lib/supabase/admin.ts and
  // supabase/migrations/20260804090000_create_contact_inquiry_function.sql.
  let admin: ReturnType<typeof createAdminClient>;
  try {
    admin = createAdminClient();
  } catch (error) {
    console.error("[contact] Supabase admin client is not configured:", error);
    if (process.env.NODE_ENV !== "production") {
      // Safe to be specific here — only reachable by whoever is running
      // the app locally, and names an env var, never a value.
      return NextResponse.json(
        { ok: false, error: "Supabase isn't configured for the contact form yet. See docs/supabase-setup.md." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your inquiry right now. Please try again shortly." },
      { status: 503 },
    );
  }

  let dbResult: CreateContactInquiryResult;
  try {
    const { data, error } = await admin.rpc("create_contact_inquiry", {
      p_name: payload.name.trim(),
      p_email: payload.email.trim(),
      p_business_name: payload.businessName.trim(),
      p_phone: payload.phone.trim(),
      p_website: payload.website.trim(),
      p_business_type: payload.businessType,
      p_services_requested: payload.servicesNeeded,
      p_budget_range: payload.budget,
      p_timeline: payload.timeline,
      p_message: payload.message.trim(),
    });

    if (error || !data || data.length === 0) {
      // Safe, minimal detail in every environment (operation name, no PII);
      // the Postgres error code/message/hint — never row data — only in
      // development, to help debugging without risking exposing internals
      // if this ever ran with NODE_ENV unset in a real deployment.
      console.error("[contact] create_contact_inquiry failed");
      if (process.env.NODE_ENV !== "production") {
        console.error("[contact] create_contact_inquiry error detail:", {
          message: error?.message,
          code: error?.code,
          details: error?.details,
          hint: error?.hint,
        });
      }
      return NextResponse.json(
        { ok: false, error: "We couldn't submit your inquiry right now. Please try again shortly." },
        { status: 502 },
      );
    }

    dbResult = data[0] as CreateContactInquiryResult;
  } catch (error) {
    console.error("[contact] Network error calling create_contact_inquiry:", process.env.NODE_ENV !== "production" ? error : "(see server logs)");
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your inquiry right now. Please try again shortly." },
      { status: 502 },
    );
  }

  // --- 7. Admin notification email (best-effort) -----------------------------
  // The inquiry is already safely stored as of step 6 — a failure sending
  // this notification is an operational problem to follow up on, not a
  // reason to tell the visitor their submission failed (it didn't).
  const apiKey = process.env.EMAIL_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const contactEmail = process.env.CONTACT_EMAIL || siteConfig.contact.email;

  if (!apiKey || !emailFrom) {
    // Email demo mode — the lead/inquiry above was still saved for real.
    console.log(
      `[contact] Email not configured — lead ${dbResult.lead_id} (inquiry ${dbResult.inquiry_id}) saved, no email sent.`,
    );
    return NextResponse.json({ ok: true, demo: true });
  }

  const resend = new Resend(apiKey);
  const leadEmail = buildLeadNotificationEmail(payload, submittedAt);

  try {
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: [contactEmail],
      replyTo: payload.email,
      subject: leadEmail.subject,
      html: leadEmail.html,
      text: leadEmail.text,
    });
    if (error) {
      console.error(`[contact] Failed to send lead notification email for lead ${dbResult.lead_id}:`, error);
    }
  } catch (error) {
    console.error(`[contact] Network error sending lead notification email for lead ${dbResult.lead_id}:`, error);
  }

  // --- 8. Customer auto-reply (best-effort) -----------------------------------
  try {
    const autoReply = buildCustomerAutoReplyEmail(payload);
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: [payload.email],
      replyTo: contactEmail,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
    });
    if (error) {
      console.error(`[contact] Failed to send customer auto-reply for lead ${dbResult.lead_id}:`, error);
    }
  } catch (error) {
    console.error(`[contact] Network error sending customer auto-reply for lead ${dbResult.lead_id}:`, error);
  }

  // --- 9. Success --------------------------------------------------------------
  return NextResponse.json({ ok: true, demo: false });
}
