import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for trusted backend operations that must run
 * without a signed-in user — currently just the public contact form (see
 * src/app/api/contact/route.ts), which has no admin session to act as.
 *
 * Uses SUPABASE_SECRET_KEY, which bypasses Row Level Security entirely.
 * That's what makes this dangerous, and exactly why:
 *
 * - The `import "server-only"` line above makes bundling this file into any
 *   Client Component a build-time error, not just a code-review mistake.
 * - There is no "use client" anywhere near this file, and there must never
 *   be.
 * - This is plain `@supabase/supabase-js`, not `@supabase/ssr` — there is
 *   no user session, no cookies, and nothing here should ever try to read
 *   or set one. Session persistence/refresh/URL detection are explicitly
 *   disabled below since none of them make sense for a static server
 *   credential.
 * - It is not used for reads or writes on behalf of a signed-in admin —
 *   src/lib/supabase/server.ts (the RLS-respecting client) is what the
 *   authenticated /admin dashboard uses, and continues to be what it
 *   should use once later phases connect it to real data.
 * - In practice this client should mostly be calling narrowly-scoped
 *   SECURITY DEFINER database functions (see
 *   supabase/migrations/20260804090000_create_contact_inquiry_function.sql)
 *   rather than querying tables directly — the function's own EXECUTE
 *   grants (service_role only) are a second, independent layer of control
 *   beyond "this code has the secret key at all."
 *
 * Fails safely: throws a clear, actionable error if the required
 * server-only env vars aren't set, rather than constructing a client that
 * would fail later with a confusing network/auth error. The error message
 * intentionally names only the env var, never a value — nothing secret is
 * ever logged or returned to a caller.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "SUPABASE_SECRET_KEY in .env.local — see docs/supabase-setup.md.",
    );
  }

  return createSupabaseClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
