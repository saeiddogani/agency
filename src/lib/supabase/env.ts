/**
 * Shared, friendly guard for the two Supabase env vars every client needs.
 * Throws a clear, actionable message instead of letting the Supabase SDK
 * fail later with a cryptic "Invalid URL" error if these are unset.
 *
 * Unlike the contact form's EMAIL_API_KEY (which has a "demo mode" so the
 * public site works with zero configuration), /admin is an internal tool —
 * it's expected to require real Supabase credentials to function. See
 * docs/supabase-setup.md.
 */
export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local — see " +
        "docs/supabase-setup.md.",
    );
  }

  return { url, publishableKey };
}
