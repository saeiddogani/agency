/**
 * Project inquiry submission — client-side service abstraction.
 *
 * This is the single place the UI calls to submit the contact form. It
 * talks to our own `/api/contact` route handler (see
 * `src/app/api/contact/route.ts`), which in turn is the single place a real
 * email/form service gets wired in later. Keeping this logic out of the
 * form component means the UI never needs to know how (or whether) a
 * submission actually gets delivered anywhere.
 */

/** Shared with the server-side validator in `src/app/api/contact/route.ts`. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface InquiryPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  servicesNeeded: string[];
  budget: string;
  timeline: string;
  message: string;
  /**
   * Honeypot field — invisible to real visitors, only a bot filling out
   * every field would populate it. Left blank, it's harmless. See
   * `HoneypotField` in `ContactForm.tsx` and the server-side check in
   * `src/app/api/contact/route.ts`.
   */
  companyWebsite: string;
}

export type InquiryResult =
  | { ok: true; demo: boolean }
  | { ok: false; error: string };

/**
 * Submits a project inquiry. Never throws — network and server errors are
 * caught and returned as a typed failure result so the UI can render a
 * clear error state instead of an unhandled exception.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let body: { ok?: boolean; demo?: boolean; error?: string } = {};
    try {
      body = await response.json();
    } catch {
      // Non-JSON response — fall through to the generic error below.
    }

    if (!response.ok || !body.ok) {
      return {
        ok: false,
        error: body.error ?? "Something went wrong submitting your inquiry. Please try again.",
      };
    }

    return { ok: true, demo: Boolean(body.demo) };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}
