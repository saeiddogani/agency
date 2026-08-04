"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * Supabase client for use in Client Components (e.g. the login form).
 * Uses the public publishable key — safe to ship to the browser, and
 * subject to Row Level Security exactly like any other authenticated
 * request. This is NOT the secret/service-role key and can never bypass
 * RLS, no matter what code runs in the browser.
 *
 * Create a fresh instance where it's needed rather than caching one at
 * module scope, per the current Supabase SSR guidance.
 */
export function createClient() {
  const { url, publishableKey } = getSupabasePublicConfig();
  return createBrowserClient(url, publishableKey);
}
