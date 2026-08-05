# Supabase setup — /admin backend foundation

This covers getting the Supabase backend running: a real project, the schema applied, your first admin login working, and — as of Phase 8 — the public contact form storing real leads. It does **not** cover connecting the *dashboard* to real data yet; `/admin` still shows the same demo data it always has, just behind a real login. See §7 below for the contact form.

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com) (free tier is plenty for this).
2. In your new project, go to **Settings → API Keys** and copy three values into `.env.local` (copy `.env.example` to `.env.local` first — it's already gitignored):

   | `.env.local` variable | Where to find it | Exposed to browser? |
   |---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Settings → API Keys → Project URL | Yes — public |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Settings → API Keys → **Publishable key** | Yes — public, but RLS-restricted (see below) |
   | `SUPABASE_SECRET_KEY` | Settings → API Keys → **Secret keys** | **No — server-only.** Used by `POST /api/contact` to store submissions — see §7. |

   If your project only shows the older "anon key" / "service_role key" naming (some existing projects haven't migrated), use those instead — they're functionally equivalent to publishable/secret for everything in this phase and Supabase supports both during their migration window.

   **Never** put `SUPABASE_SECRET_KEY` behind a `NEXT_PUBLIC_` prefix, and never import the file that uses it into anything a Client Component (a file starting with `"use client"`) could pull in. It carries `BYPASSRLS` — anyone who obtains it has unrestricted read/write access to every table.

## 2. Apply the database schema

The schema lives in `supabase/migrations/` as 14 plain SQL files, applied in filename order (they're timestamp-prefixed, so alphabetical = chronological). Two ways to run them:

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
- **The public contact form talks to Supabase only through a server-only admin client and one narrowly-scoped database function** — never directly, and never with anon table access. See §7.

## 6. Environment variable reference

| Variable | Classification | Required for? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | `/admin/login` and the contact form's admin client both need it |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public (RLS-restricted) | `/admin/login` |
| `SUPABASE_SECRET_KEY` | **Server-only, secret** | `POST /api/contact` (via `src/lib/supabase/admin.ts`) — bypasses RLS, never used client-side |

No secrets are committed anywhere in this repo — `.env.example` (this file's sibling) contains only blank placeholders, and `.env*` / `.env.local` are already in `.gitignore`.

## 7. Contact form → CRM (Phase 8)

`POST /api/contact` (see `src/app/api/contact/route.ts`) validates a submission exactly as before (honeypot, per-IP rate limit, size limits, full server-side field/enum validation — none of that changed), then, once validated, stores it before attempting any email:

1. **`src/lib/supabase/admin.ts`** creates a server-only client using `SUPABASE_SECRET_KEY`. This file has `import "server-only"` at the top, which makes it a *build error* (not just a lint warning) if anything ever tries to import it into a Client Component.
2. That client calls one database function, **`public.create_contact_inquiry(...)`** (`supabase/migrations/20260804090000_create_contact_inquiry_function.sql`), which in a single transaction:
   - finds the existing *active* lead for the submitted email (status not `won`/`lost`, not archived) or creates a new one — race-safe, via the same partial unique index described in the leads migration
   - inserts one `lead_inquiries` row (always — one per submission, immutable)
   - inserts one `activity_log` row (`"New lead received from contact form"` for a new lead, `"Repeat inquiry received from contact form"` for a repeat one)
   - returns the lead id, inquiry id, and whether the lead was newly created
3. Only `service_role` can execute this function — `anon` and `authenticated` are explicitly revoked, so it's not callable from the browser or from a signed-in admin session, only from the server-only admin client above.
4. **Repeat inquiries never overwrite admin-edited lead fields** — name, company, business type, status, priority, estimated value, assignment, and notes are only ever set when the lead is first created. `last_contacted_at` is also left untouched by inbound form submissions on purpose (it's meant to track outbound agency contact, not inbound); "when did we last hear from this lead" is what `lead_inquiries.submitted_at` and `activity_log.created_at` are for.
5. **The database write is the source of truth.** If it fails (or Supabase isn't configured), the API returns an error and **no email is sent** — the two Resend emails (business notification, customer auto-reply) are both best-effort *after* a successful save: a failure to send either one is logged server-side but still returns success to the visitor, since their inquiry was genuinely captured.

### Verifying it worked

After submitting the contact form (or calling `POST /api/contact` directly), check in the Supabase SQL Editor:

```sql
-- Most recent lead + how many inquiries it has
select l.id, l.name, l.email, l.status, l.created_at,
       (select count(*) from lead_inquiries li where li.lead_id = l.id) as inquiry_count
from leads l
order by l.created_at desc
limit 5;

-- Its inquiries and activity, oldest first
select * from lead_inquiries where lead_id = '<lead id from above>' order by created_at;
select * from activity_log where entity_type = 'lead' and entity_id = '<lead id from above>' order by created_at;
```

To test repeat-inquiry behavior without using a real customer's email, submit the form twice locally with the same throwaway address (e.g. `test+1@example.com`) a few minutes apart (past the rate limit window) and confirm: still one `leads` row, two `lead_inquiries` rows, two `activity_log` rows (the second one reading "Repeat inquiry..."). For the full set of documented verification steps (new lead, repeat inquiry, separate email, won/lost/archived leads, concurrent submissions, and confirming `anon`/`authenticated` genuinely cannot call the function), see [`docs/testing-contact-inquiry.md`](testing-contact-inquiry.md).

### What I could not verify myself

I don't have a live Supabase project or network access to one, so none of this was actually executed against a real database — the migration, function, and route code are written and internally consistent (schema-qualified, race-safe by the same mechanism the leads table's own comments describe, `npx tsc --noEmit` passes against the real installed `@supabase/*` packages), but end-to-end behavior — the RPC call actually succeeding, the atomic transaction actually committing, the emails actually sending — needs to be confirmed by you after running the new migration. See the Phase 8 report's "Manual steps" and "Test results" sections for exactly what to check.
