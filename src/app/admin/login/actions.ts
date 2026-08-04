"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface LoginState {
  error: string | null;
}

/**
 * Server Action backing the login form (see LoginForm.tsx). Deliberately
 * returns one generic error message for both "no such user" and "wrong
 * password" rather than Supabase's specific error — not distinguishing the
 * two avoids leaking which emails have an account (a standard auth
 * hardening practice, not an omission).
 *
 * No registration, no password reset, no MFA — none of this project's
 * accounts are self-service; the first owner and any later team members
 * are created directly in Supabase (see docs/supabase-setup.md), matching
 * the approved Phase 7 scope.
 */
export async function signIn(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextParam = String(formData.get("next") ?? "/admin");
  const next = nextParam.startsWith("/admin") ? nextParam : "/admin";

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Incorrect email or password." };
  }

  redirect(next);
}

/** Used by the sidebar's Logout button (see AdminSidebar.tsx). */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
