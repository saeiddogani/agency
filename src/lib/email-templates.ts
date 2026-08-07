import { siteConfig } from "@/lib/site-config";
import type { InquiryPayload } from "@/lib/inquiry";

/** Minimal HTML escaping for values interpolated into email HTML bodies. */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: siteConfig.timeZone,
  }).format(date);
}

interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * SHARED EMAIL STYLING
 * ─────────────────────────────────────────────────────────────────────────
 * Both templates below share one visual language — a centered white card on
 * a light gray backdrop, the site's own brand blue for headings/links/the
 * CTA button, and the same footer. Styles are inline (not a <style> block)
 * because that's what actually renders consistently across email clients.
 * No images and no tracking pixels are used anywhere in either template.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BRAND_BLUE = "#1f4a8c";
const INK_900 = "#10151d";
const INK_700 = "#333b47";
const INK_500 = "#5b6472";
const INK_300 = "#a3abb6";
const BORDER = "#ececef";
const SURFACE_ALT = "#f6f7f9";

const fontFamily = "-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif";

/** Outer wrapper every email shares: light gray backdrop + centered white card. */
function emailShell(bodyHtml: string, maxWidth: number): string {
  return `
    <div style="background-color:${SURFACE_ALT};padding:32px 16px;font-family:${fontFamily};">
      <div style="max-width:${maxWidth}px;margin:0 auto;background-color:#ffffff;border-radius:12px;border:1px solid ${BORDER};overflow:hidden;">
        <div style="padding:36px 40px;">
          <p style="margin:0 0 28px;font-size:15px;font-weight:700;color:${BRAND_BLUE};letter-spacing:-0.01em;">
            ${escapeHtml(siteConfig.name)}
          </p>
          ${bodyHtml}
        </div>
      </div>
    </div>
  `;
}

/** Shared footer for both emails. */
function emailFooterHtml(): string {
  return `
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid ${BORDER};">
      <p style="margin:0;font-size:13px;font-weight:600;color:${INK_700};">${escapeHtml(siteConfig.name)}</p>
      <p style="margin:2px 0 0;font-size:12px;color:${INK_300};">Modern websites built for Canadian businesses</p>
    </div>
  `;
}

function emailFooterText(): string {
  return `${siteConfig.name}\nModern websites built for Canadian businesses`;
}

/** Subtle blue CTA button — used sparingly, inline-styled for email-client compatibility. */
function ctaButtonHtml(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;">
      <tr>
        <td style="border-radius:8px;background-color:${BRAND_BLUE};">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

const rowStyle = "padding:7px 0;border-bottom:1px solid #ececef;";
const labelStyle = "color:#5b6472;font-size:13px;font-weight:600;width:150px;vertical-align:top;";
const valueStyle = "color:#10151d;font-size:14px;vertical-align:top;";

function emailRow(label: string, value: string): string {
  return `<tr><td style="${rowStyle}${labelStyle}">${escapeHtml(label)}</td><td style="${rowStyle}${valueStyle}">${value || "—"}</td></tr>`;
}

/** A section heading used to group rows in the admin notification email (e.g. "Contact Information"). */
function sectionHeadingHtml(title: string, isFirst: boolean): string {
  return `<p style="margin:${isFirst ? "0" : "24px"} 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${INK_500};">${escapeHtml(title)}</p>`;
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * ADMIN NOTIFICATION EMAIL
 * ─────────────────────────────────────────────────────────────────────────
 * Sent to the agency's business inbox (`CONTACT_EMAIL`) whenever the contact
 * form is submitted. Grouped into scannable sections — Contact Information,
 * Business Information, Project Details, and the full Message — rather
 * than a flat list of fields. No internal/technical details (IP, headers,
 * etc.) are included — this is a business-facing email, not a debug log.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function buildLeadNotificationEmail(payload: InquiryPayload, submittedAt: Date): EmailContent {
  const emailAddress = escapeHtml(payload.email);
  const emailLink = `<a href="mailto:${emailAddress}" style="color:${BRAND_BLUE};text-decoration:none;">${emailAddress}</a>`;
  const website = payload.website ? escapeHtml(payload.website) : "";
  const websiteLink = website ? `<a href="${website}" style="color:${BRAND_BLUE};text-decoration:none;">${website}</a>` : "";
  const servicesNeeded = payload.servicesNeeded.map(escapeHtml).join(", ");
  const messageHtml = escapeHtml(payload.message).replace(/\n/g, "<br />");
  const submittedAtDisplay = formatSubmittedAt(submittedAt);
  const businessName = payload.businessName.trim();
  const subjectName = businessName || payload.name;

  const body = `
    <h1 style="margin:0 0 4px;font-size:20px;color:${INK_900};">New Project Inquiry</h1>
    <p style="margin:0 0 24px;font-size:13px;color:${INK_300};">Submitted ${escapeHtml(submittedAtDisplay)}</p>

    ${sectionHeadingHtml("Contact Information", true)}
    <table style="width:100%;border-collapse:collapse;">
      ${emailRow("Name", escapeHtml(payload.name))}
      ${emailRow("Email", emailLink)}
      ${emailRow("Phone", payload.phone ? escapeHtml(payload.phone) : "")}
    </table>

    ${sectionHeadingHtml("Business Information", false)}
    <table style="width:100%;border-collapse:collapse;">
      ${emailRow("Business", escapeHtml(payload.businessName))}
      ${emailRow("Industry", escapeHtml(payload.businessType))}
      ${emailRow("Website", websiteLink)}
    </table>

    ${sectionHeadingHtml("Project Details", false)}
    <table style="width:100%;border-collapse:collapse;">
      ${emailRow("Services Requested", servicesNeeded)}
      ${emailRow("Budget", payload.budget ? escapeHtml(payload.budget) : "")}
      ${emailRow("Timeline", payload.timeline ? escapeHtml(payload.timeline) : "")}
    </table>

    ${sectionHeadingHtml("Message", false)}
    <div style="background-color:${SURFACE_ALT};border-radius:8px;padding:16px;">
      <p style="margin:0;font-size:14px;line-height:1.6;color:${INK_900};white-space:pre-wrap;">${messageHtml}</p>
    </div>

    ${ctaButtonHtml("Reply to " + payload.name.split(/\s+/)[0], `mailto:${payload.email}`)}
    ${emailFooterHtml()}
  `;

  const html = emailShell(body, 600).trim();

  const text = [
    "New Project Inquiry",
    `Submitted ${submittedAtDisplay}`,
    "",
    "CONTACT INFORMATION",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    "",
    "BUSINESS INFORMATION",
    `Business: ${payload.businessName}`,
    `Industry: ${payload.businessType}`,
    `Website: ${payload.website || "—"}`,
    "",
    "PROJECT DETAILS",
    `Services Requested: ${payload.servicesNeeded.join(", ")}`,
    `Budget: ${payload.budget || "—"}`,
    `Timeline: ${payload.timeline || "—"}`,
    "",
    "MESSAGE",
    payload.message,
    "",
    "—",
    emailFooterText(),
  ].join("\n");

  return {
    subject: `New Project Inquiry — ${subjectName}`,
    html,
    text,
  };
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * CUSTOMER CONFIRMATION EMAIL
 * ─────────────────────────────────────────────────────────────────────────
 * Sent to the customer immediately after a successful submission. Confirms
 * the inquiry was received, sets a response-time expectation (kept in sync
 * with the Contact page via `siteConfig.responseTime`, rather than
 * hardcoded here), and gives a low-friction way to flag anything urgent.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function buildCustomerAutoReplyEmail(payload: InquiryPayload): EmailContent {
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name.trim();

  const body = `
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK_900};">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK_900};">
      Thank you for contacting <strong>${escapeHtml(siteConfig.name)}</strong>.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK_900};">
      We've received your project inquiry and appreciate you taking the time to tell us about your
      business.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK_900};">
      Our team will review the information you shared and get back to you as soon as possible, usually
      within <strong>${escapeHtml(siteConfig.responseTime)}</strong>.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK_900};">
      If your project is time-sensitive, simply reply to this email and we'll do our best to prioritize
      it.
    </p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:${INK_900};">
      We look forward to learning more about your project and helping bring your vision to life.
    </p>

    ${ctaButtonHtml("Visit Our Website", siteConfig.url)}

    <p style="margin:28px 0 0;font-size:15px;line-height:1.6;color:${INK_900};">Best regards,</p>
    ${emailFooterHtml()}
  `;

  const html = emailShell(body, 520).trim();

  const text = [
    `Hi ${firstName},`,
    "",
    `Thank you for contacting ${siteConfig.name}.`,
    "",
    "We've received your project inquiry and appreciate you taking the time to tell us about your business.",
    "",
    `Our team will review the information you shared and get back to you as soon as possible, usually within ${siteConfig.responseTime}.`,
    "",
    "If your project is time-sensitive, simply reply to this email and we'll do our best to prioritize it.",
    "",
    "We look forward to learning more about your project and helping bring your vision to life.",
    "",
    "Best regards,",
    "",
    "—",
    emailFooterText(),
  ].join("\n");

  return {
    subject: "We've received your project inquiry",
    html,
    text,
  };
}
