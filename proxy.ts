import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

/**
 * Session refresh + /admin route protection.
 *
 * Scoped to /admin only via `config.matcher` below — the public website
 * never runs this proxy, so there's no added latency or Supabase
 * dependency on any public page.
 *
 * This is only the first layer of protection: it confirms a valid Supabase
 * session exists. Whether that session belongs to an *active* admin (as
 * opposed to one that's been deactivated) is checked again, server-side,
 * in src/app/admin/(dashboard)/layout.tsx — and enforced independently by
 * Row Level Security at the data layer regardless of what either check
 * does. See docs/supabase-setup.md.
 *
 * Named `proxy.ts` (not `middleware.ts`) per the Next.js 16 rename —
 * `middleware.ts` still works but is deprecated and will be removed in a
 * future version; logic is otherwise unchanged. See
 * https://nextjs.org/docs/app/getting-started/proxy.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Supabase isn't configured yet — fail closed on /admin rather than
  // crashing. The public site is unaffected either way (this proxy
  // doesn't run there).
  if (!supabaseUrl || !publishableKey) {
    if (request.nextUrl.pathname !== LOGIN_PATH) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // This call is what actually refreshes the session (and must not be
  // removed or swapped for a cheaper check) — see Supabase's SSR docs.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === LOGIN_PATH;

  if (!user && !isLoginRoute) {
    const redirectUrl = new URL(LOGIN_PATH, request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isLoginRoute) {
    return NextResponse.redirect(new URL(ADMIN_PREFIX, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
