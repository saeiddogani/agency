import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";

/**
 * Auth gate for the actual dashboard (everything under /admin except
 * /admin/login, which lives outside this route group — see
 * src/app/admin/login/page.tsx — specifically so the login page itself
 * never gets caught by this check).
 *
 * proxy.ts already redirects unauthenticated requests before this
 * layout even runs, so `user` being null here should be rare — but Server
 * Components must never trust that a prior layer already checked auth
 * (defense in depth, not redundancy), so this re-verifies independently.
 *
 * It also checks admin_users.is_active — a middleware-level session check
 * alone would let a *deactivated* admin (valid Supabase session, but
 * is_active = false) still reach the dashboard shell. Note this query is
 * itself protected twice over: the RLS policy on admin_users requires
 * is_active_admin() to return true, so an inactive user's own row is
 * invisible to this exact SELECT regardless of what this code does —
 * `adminUser` comes back null either way, and both cases are handled
 * identically below.
 */
export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminUser, error: adminUserError } = await supabase
    .from("admin_users")
    .select("is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (adminUserError) {
    // A real query error (bad RLS grant, stale PostgREST schema cache,
    // etc.) is NOT the same thing as "this account is inactive" — treating
    // it that way hides the actual problem. Log the full detail server-side
    // only (this never reaches the browser) and keep the user-facing
    // message generic either way, since we still can't confirm they're a
    // valid active admin. We still sign out here (even though we can't be
    // sure they're actually inactive) — otherwise their still-valid session
    // would bounce right back to /admin via proxy.ts's isLoginRoute check,
    // producing a redirect loop instead of ever showing this page.
    if (process.env.NODE_ENV !== "production") {
      // Flattened into a single string, not passed as a separate object
      // argument — Next.js's dev-mode server->browser console mirroring
      // drops plain-object properties on extra console.error() arguments,
      // which otherwise shows up in the browser devtools as an empty `{}`
      // even though the real terminal running `npm run dev` has the full
      // detail. Stringifying here means the full detail survives either way.
      console.error(
        `[admin] admin_users lookup failed for user ${user.id} — this is being treated as 'not an active admin' below, ` +
          `but the real cause is this query error, not is_active=false: ` +
          JSON.stringify({
            message: adminUserError.message,
            code: adminUserError.code,
            details: adminUserError.details,
            hint: adminUserError.hint,
          }),
      );
    }
    await supabase.auth.signOut();
    redirect("/admin/login?error=inactive");
  }

  if (!adminUser || !adminUser.is_active) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=inactive");
  }

  return <AdminShell>{children}</AdminShell>;
}
