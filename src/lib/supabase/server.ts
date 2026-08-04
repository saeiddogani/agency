import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * Supabase client for use in Server Components, Server Actions, and Route
 * Handlers. Reads/writes the session via cookies, so every request is made
 * AS the currently signed-in admin — subject to Row Level Security, same
 * as the browser client. This is NOT the service-role/secret-key client;
 * it can only ever see what the signed-in user's RLS policies allow.
 *
 * Server Components can't set cookies (only read them), so `setAll` below
 * is wrapped in a try/catch there — that's expected, not a bug. Session
 * refresh in that context is handled by proxy.ts instead, which runs
 * before the Server Component and can write cookies. Server Actions and
 * Route Handlers CAN set cookies directly, so `setAll` works normally
 * there (e.g. the sign-in/sign-out actions in src/app/admin/login/actions.ts).
 */
export async function createClient() {
  const { url, publishableKey } = getSupabasePublicConfig();
  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render — safe to ignore,
          // middleware refreshes the session on every request instead.
        }
      },
    },
  });
}
