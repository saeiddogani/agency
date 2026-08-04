# Supabase setup — /admin backend foundation

This covers getting the Phase 7 backend foundation running: a real Supabase project, the schema applied, and your first admin login working. It does **not** cover connecting the contact form or the dashboard to real data — those are later phases; right now the dashboard still shows the same demo data it always has, just behind a real login.

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com) (free tier is plenty for this).
2. In your new project, go to **Settings → API Keys** and copy three values into `.env.local` (copy `.env.example` to `.env.local` first — it's already gitignored):

   | `.env.local` variable | Where to find it | Exposed to browser? |
   |---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Settings → API Keys → Project URL | Yes — public |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Settings → API Keys → **Publishable key** | Yes — public, but RLS-restricted (see below) |
   | `SUPABASE_SECRET_KEY` | Settings → API Keys → **Secret keys** | **No — server-only.** Not used by any code yet as of this phase. |

   If your project only shows the older "anon key" / "service_role key" naming (some existing projects haven't migrated), use those instead — they're functionally equivalent to publishable/secret for everything in this phase and Supabase supports both during their migration window.

   **Never** put `SUPABASE_SECRET_KEY` behind a `NEXT_PUBLIC_` prefix, and never import the file that uses it into anything a Client Component (a file starting with `"use client"`) could pull in. It carries `BYPASSRLS` — anyone who obtains it has unrestricted read/write access to every table.

## 2. Apply the database schema

The schema lives in `supabase/migrations/` as 12 plain SQL files, applied in filename order (they're timestamp-prefixed, so alphabetical = chronological). Two ways to run them:

### Option A — Supabase CLI (recommended)

```bash
npm install -g supabase       # one-time, if you don't have it
supabase login
supabase link --project-ref <your-project-ref>   # found in your project's Settings → General
supabase db push
```

`supabase db push` applies every migration in `supabase/migrations/` that hasn't been applied yet, in order, and records what's been run — this is the reproducible, "can recreate the database reliably" path Phase 7 asked for.

For **local development** against a Docker-based local Supabase instance instead of your real project, `supabase start` + `supabase db reset` also runs `supabase/seed.sql` automatically (see §4 below) — real production is never touched by that file.

### Option B — Manual, via the SQL Editor

If you'd rather not install the CLI yet: open your project's **SQL Editor** in the Supabase dashboard, and run each file in `supabase/migrations/` in order (they're numbered), pasting the contents of each one and clicking Run before moving to the next. This gets you the same schema, just without the CLI's migration-history bookkeeping — fine for getting started, but the CLI is worth adopting once you're doing this more than once (e.g. staging + production environments).

I didn't run either of these myself — I don't have a real Supabase project or credentials, and installing the CLI or reaching a live database isn't something I can do from here. Both paths above are things you run.

## 3. Create your first admin user

There's no sign-up page (invite-only, by design). Create the first account directly:

1. Supabase dashboard → **Authentication → Users → Add user**. Enter your email and a password (or use "Send invite" instead, if you'd rather set the password yourself via email).
2. This fires a trigger (`on_auth_user_created`, in `supabase/migrations/20260803120100_admin_users.sql`) that automatically creates a matching row in `admin_users`, defaulted to `role = 'staff'`.
3. Promote yourself to `owner` — the one manual step, run once in the SQL Editor:
   ```sql
   update admin_users set role = 'owner' where email = 'you@yourdomain.com';
   ```
4. Sign in at `/admin/login` with that email/password.

Adding teammates later is the same flow (steps 1–2; they stay `staff` unless you promote them too).

## 4. Seed data (development only)

`supabase/seed.sql` seeds the `templates` table with the agency's real 6 templates (mirroring `src/lib/templates.ts`) — no fake leads/clients/projects are seeded, since there's no UI yet to view them and Phase 7 is backend-foundation only. This file only runs via `supabase db reset` against a **local** instance; `supabase db push` (used for your real project in step 2) never touches it.

## 5. What's protected, and how

- **Every table has Row Level Security enabled, with zero policies for anonymous/public access.** An unauthenticated request — including one made with just the public key — gets nothing back from any of the 11 tables.
- **`/admin/*` is protected server-side** by `proxy.ts` (session check + redirect, runs on every `/admin` request — Next.js 16 renamed `middleware.ts` to `proxy.ts`; same mechanism, same guarantees) and, one layer deeper, `src/app/admin/(dashboard)/layout.tsx` (verifies the signed-in user is still an *active* admin, not just authenticated — catches the case of a deactivated account that still has a valid session). Neither of these is something client-side code could bypass by manipulating browser state; both run on the server.
- **Two `SECURITY DEFINER` SQL functions**, `is_active_admin()` and `has_admin_role(...)`, back every table's RLS policy — see `supabase/migrations/20260803121000_rls_helper_functions.sql` for why this avoids the classic recursive-policy problem.
- **The public contact form still doesn't talk to Supabase at all** — it's unchanged in this phase, and when it is eventually wired up (a later phase), it'll do so through the existing `/api/contact` route using `SUPABASE_SECRET_KEY` server-side, never from the browser.

## 6. Environment variable reference

| Variable | Classification | Required for this phase? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Yes — without it, `/admin/login` can't reach Supabase at all |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public (RLS-restricted) | Yes, same reason |
| `SUPABASE_SECRET_KEY` | **Server-only, secret** | Not used by any code yet — documented now for the phase that connects the contact form to the database |

No secrets are committed anywhere in this repo — `.env.example` (this file's sibling) contains only blank placeholders, and `.env*` / `.env.local` are already in `.gitignore`.
