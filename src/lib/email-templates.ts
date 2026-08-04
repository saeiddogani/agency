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

const rowStyle = "padding:6px 0;border-bottom:1px solid #ececef;";
const labelStyle = "color:#5b6472;font-size:13px;font-weight:600;width:160px;vertical-align:top;";
const valueStyle = "color:#10151d;font-size:14px;vertical-align:top;";

function emailRow(label: string, value: string): string {
  return `<tr><td style="${rowStyle}${labelStyle}">${escapeHtml(label)}</td><td style="${rowStyle}${valueStyle}">${value || "—"}</td></tr>`;
}

/**
 * Lead notification email — sent to the agency's business inbox
 * (`CONTACT_EMAIL`) whenever the contact form is submitted. Contains every
 * field the visitor entered, in the order requested, plus the submission
 * timestamp. No internal/technical details (IP, headers, etc.) are
 * included — this is a business-facing email, not a debug log.
 */
export function buildLeadNotificationEmail(payload: InquiryPayload, submittedAt: Date): EmailContent {
  const emailAddress = escapeHtml(payload.email);
  const emailLink = `<a href="mailto:${emailAddress}" style="color:#1f4a8c;">${emailAddress}</a>`;
  const website = payload.website ? escapeHtml(payload.website) : "";
  const websiteLink = website ? `<a href="${website}" style="color:#1f4a8c;">${website}</a>` : "";
  const servicesNeeded = payload.servicesNeeded.map(escapeHtml).join(", ");
  const messageHtml = escapeHtml(payload.message).replace(/\n/g, "<br />");
  const submittedAtDisplay = formatSubmittedAt(submittedAt);

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="font-size:20px;color:#10151d;margin:0 0 4px;">New Website Project Inquiry</h1>
      <p style="font-size:13px;color:#7c8493;margin:0 0 20px;">Submitted ${escapeHtml(submittedAtDisplay)}</p>
      <table style="width:100%;border-collapse:collapse;">
        ${emailRow("Name", escapeHtml(payload.name))}
        ${emailRow("Business", escapeHtml(payload.businessName))}
        ${emailRow("Email", emailLink)}
        ${emailRow("Phone", payload.phone ? escapeHtml(payload.phone) : "")}
        ${emailRow("Current Website", websiteLink)}
        ${emailRow("Business Type", escapeHtml(payload.businessType))}
        ${emailRow("Services Needed", servicesNeeded)}
        ${emailRow("Budget", payload.budget ? escapeHtml(payload.budget) : "")}
        ${emailRow("Timeline", payload.timeline ? escapeHtml(payload.timeline) : "")}
      </table>
      <div style="margin-top:20px;">
        <p style="color:#5b6472;font-size:13px;font-weight:600;margin:0 0 6px;">Project Details</p>
        <p style="color:#10151d;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${messageHtml}</p>
      </div>
    </div>
  `.trim();

  const text = [
    "New Website Project Inquiry",
    `Submitted ${submittedAtDisplay}`,
    "",
    `Name: ${payload.name}`,
    `Business: ${payload.businessName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Current Website: ${payload.website || "—"}`,
    `Business Type: ${payload.businessType}`,
    `Services Needed: ${payload.servicesNeeded.join(", ")}`,
    `Budget: ${payload.budget || "—"}`,
    `Timeline: ${payload.timeline || "—"}`,
    "",
    "Project Details:",
    payload.message,
  ].join("\n");

  return {
    subject: `New Website Project Inquiry — ${payload.businessName}`,
    html,
    text,
  };
}

/**
 * Simple confirmation email sent to the customer after a successful
 * submission. Intentionally brief, and doesn't promise a specific response
 * time beyond the configurable `siteConfig.responseTime`.
 */
export function buildCustomerAutoReplyEmail(payload: InquiryPayload): EmailContent {
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name.trim();

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;">
      <p style="font-size:15px;color:#10151d;line-height:1.6;">Hi ${escapeHtml(firstName)},</p>
      <p style="font-size:15px;color:#10151d;line-height:1.6;">
        Thanks for reaching out to ${escapeHtml(siteConfig.name)}. We've received your project details
        and will review them shortly — you can expect to hear from us within
        ${escapeHtml(siteConfig.responseTime)}.
      </p>
      <p style="font-size:15px;color:#10151d;line-height:1.6;">
        If anything is time-sensitive in the meantime, just reply to this email or call us at
        ${escapeHtml(siteConfig.contact.phoneDisplay)}.
      </p>
      <p style="font-size:15px;color:#10151d;line-height:1.6;">— ${escapeHtml(siteConfig.name)}</p>
    </div>
  `.trim();

  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for reaching out to ${siteConfig.name}. We've received your project details and will review them shortly — you can expect to hear from us within ${siteConfig.responseTime}.`,
    "",
    `If anything is time-sensitive in the meantime, just reply to this email or call us at ${siteConfig.contact.phoneDisplay}.`,
    "",
    `— ${siteConfig.name}`,
  ].join("\n");

  return {
    subject: `We've received your inquiry — ${siteConfig.name}`,
    html,
    text,
  };
}
