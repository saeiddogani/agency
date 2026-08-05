# Changelog

All notable changes to this project will be documented here.

## [Unreleased]

### Planned

- Add real dashboard data (activity feed, lead pipeline)
- Build lead management
- Build follow-up management
- Build client and project management

---

## [Phase 8] - 2026-08-04

### Added

- `public.create_contact_inquiry(...)` — `SECURITY DEFINER` database function (search_path pinned to `''`, every relation schema-qualified) that atomically finds-or-creates the active lead for a submitted email, inserts a `lead_inquiries` row, and inserts an `activity_log` row, in one transaction. Executable only by `service_role`; explicitly revoked from `anon` and `authenticated`.
- `src/lib/supabase/admin.ts` — server-only Supabase client (`import "server-only"`, build-time enforced) using `SUPABASE_SECRET_KEY`, used exclusively by `POST /api/contact`.
- `docs/supabase-setup.md` §7 — contact-form-to-CRM flow, how to verify a submission was stored, how to test repeat-inquiry behavior without real customer data.

### Changed

- `POST /api/contact` now stores every valid submission in Supabase before attempting any email. Existing honeypot, rate limiting, request-size limits, and field/enum validation are unchanged.
  - The database write, not email configuration, now determines success/failure — a missing/failed write returns an error and sends no email.
  - "Demo mode" now means Resend specifically isn't configured; the lead is still saved for real either way (previously demo mode skipped everything, since there was no database yet).
  - Admin notification email failure no longer fails the request (previously `502`) — the inquiry is already stored by that point, so the failure is logged and the request still returns success. The customer auto-reply was already best-effort and is unchanged.
- Repeat inquiries never overwrite admin-edited lead fields (name, company, business type, status, priority, estimated value, assignment, notes) or `last_contacted_at` (reserved for outbound agency contact, not inbound form submissions) — only set once, when the lead is first created.

### Not done (explicitly out of scope this phase)

- Dashboard still reads `src/lib/admin-demo-data.ts`, not real Supabase data — deferred to Phase 9.
- No `lead_inquiries.submitted_business_type` column added — business type is only captured on first lead creation; adding a per-inquiry snapshot column is proposed, not implemented (see Phase 8 report).
- No request-ID-based submission idempotency added — existing submit-button disable-while-pending plus server-side rate limiting were judged sufficient for now; documented residual risk of a resubmitted request creating a second inquiry row.

---

## [Phase 7] - 2026-08-04

### Added

- Supabase project integration
- PostgreSQL database foundation
- Supabase Auth
- Protected `/admin` routes
- Admin login and logout
- Row Level Security policies
- Admin role support:
  - Owner
  - Admin
  - Staff
- Supabase server and browser utilities
- Database migrations for:
  - Admin users
  - Leads
  - Lead inquiries
  - Clients
  - Projects
  - Follow-ups
  - Proposals
  - Invoices
  - Websites
  - Templates
  - Activity log
- Required authenticated-role database grants
- Supabase setup documentation

### Security

- Public users cannot access admin data
- The Supabase secret key remains server-side
- RLS is enabled on all business tables
- Admin authorization is checked server-side
- Historical business records use restricted delete behavior
- Client website credentials are not stored in the database

### Fixed

- Missing `authenticated` role privileges on `admin_users`
- Login error incorrectly caused by database permission denial
- Database privileges added through a reproducible migration

### Verified

- Admin login works
- Admin logout works
- Unauthenticated users are redirected to `/admin/login`
- Owner account can access `/admin`
- ESLint passes
- Production build passes
- Supabase migrations applied successfully

---

## [Phase 6]

### Added

- Resend email integration
- Contact-form notification email
- Customer confirmation email
- Google Analytics integration
- Form spam protection
- Server-side validation
- Rate limiting
- Security response headers

---

## [Phase 5]

### Added

- Project inquiry form
- Portfolio case-study structure
- SEO metadata
- Sitemap
- Robots file
- Open Graph support
- Structured data
- Accessibility improvements
- Performance improvements

---

## [Phase 4]

### Added

Six website demos:

- West Coast Roofing
- North Shore Landscaping
- Casa Bella
- Studio 22
- NorthPoint Realty
- Apex Consulting

---

## [Phases 1–3]

### Added

- Next.js agency website
- Responsive navigation
- Homepage
- Services page
- Templates page
- Pricing page
- About page
- Contact page
- Reusable component architecture
- Tailwind CSS design system
- TypeScript setup
