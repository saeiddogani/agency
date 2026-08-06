# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Planned

- Lead editing
- Follow-up management
- Client conversion
- Project management
- Proposal builder
- Invoice management
- Client portal

---

## [Phase 10A] - 2026-08-05

### Changed — Visual polish only (no layout, content, or functional changes)

- Standardized the light section background to `#FAFAFA` (`--color-surface-alt`), used site-wide.
- Softened section-boundary borders (`border-ink-200` → `border-ink-200/60`–`/70`) for a subtler transition between sections.
- Standardized `FinalCta` padding/spacing to match the rest of the homepage's rhythm and gave it a defined top border, mirroring the hero's bottom border.
- Refined `SectionHeading` spacing (eyebrow → heading → description) from a flat gap to a more deliberate rhythm.
- Refined the hero's headline block spacing and gave more breathing room before the CTA buttons.
- Refined `ServiceCard`: softer border, subtle resting shadow, deeper hover shadow, ringed icon badge.
- Refined `TemplateCard`: its browser-mockup preview now gains border/shadow depth on hover.
- Refined `BrowserMockup`: layered, more realistic shadow; softer border; subtle chrome-bar gradient; recessed address-bar; window-control dots lightened for a more refined (less flat) look.
- Refined `Button`: added subtle resting/hover shadows on the primary and secondary variants, a soft hover tint on the outline variant, and smoother, more precise transitions.

### Not changed

- Layout, page structure, navigation, and content — untouched.
- Supabase, CRM, authentication, contact form, and SEO/routing logic — untouched.
- No animations, parallax, glassmorphism, gradients-as-decoration, glows, background video, or particles were added — all changes are static (borders/shadows/spacing/color) or simple CSS hover/transition states already used elsewhere in the codebase.

### Verified

- ESLint passes.
- `tsc --noEmit` passes.
- `next build` could not be run in the sandbox (pre-existing, sandbox-only missing SWC binary for linux/arm64 — unrelated to this change, see prior phases); recommend running `npm run build` locally to confirm.

---

## [Dashboard Simplification] - 2026-08-04

### Changed

- Simplified the `/admin` dashboard homepage to focus on actionable information: Needs Attention, Recent Leads, and Recent Activity only.
- Removed Today's Work, Sales Pipeline, Active Projects, Business Snapshot, Sales Conversion, and Quick Actions from the dashboard homepage.
- Removed the now-dashboard-unused `getLeadStatusCounts()` and `getPipelineLeads()` queries and their mappers — the dashboard no longer runs status-count, pipeline, project, funnel, or snapshot queries.

### Not changed

- The Leads list page and Lead Details page — untouched.
- The sidebar, authentication, and Supabase setup — untouched.
- The removed sections' components (`BusinessSnapshot`, `SalesPipeline`, `ActiveProjects`, `SalesFunnel`, `TodaysWork`, `QuickActions`, `StatCard`, `PipelineCard`) and their demo data — left in place, unused but intact, in case a later phase brings any of them back.

---

## [Phase 9] - 2026-08-04

### Added

#### Read-Only CRM

- Connected the admin dashboard to live Supabase lead data.
- Added a real CRM Leads page.
- Added a Lead Details page.
- Added reusable admin query layer.
- Added reusable admin type definitions.
- Added server-side data mappers.
- Added URL-driven search parameter utilities.

#### Dashboard

The following dashboard widgets now use real Supabase data:

- Business Snapshot
- Sales Pipeline
- Recent Leads
- Recent Activity
- Needs Attention

The following widgets intentionally remain on demo data until future phases:

- Today's Work
- Active Projects
- Sales Conversion
- Quick Actions

#### Leads

Added:

- Search
- Filtering
- Sorting
- Pagination
- Lead Details page
- Inquiry Timeline
- Activity Timeline

Supported filters:

- Status
- Priority
- Business Type
- Source

Supported sorting:

- Newest
- Oldest
- Name

#### Performance

- Server Components used throughout the CRM.
- Read-only queries use the authenticated Supabase server client.
- Dashboard summary queries optimized.
- Recent Activity limited to 20 records.
- Leads list uses database pagination.
- Lead details only load required records.

#### Security

- No write operations added.
- No service-role client used for dashboard reads.
- All CRM queries respect existing Row Level Security (RLS).
- Dashboard remains fully server rendered.
- Search and filtering use validated URL parameters.

### Verified

- Dashboard displays live lead data.
- Lead search works.
- Lead filtering works.
- Lead sorting works.
- Pagination works.
- Lead Details page loads correctly.
- Inquiry history displays correctly.
- Activity timeline displays correctly.
- ESLint passes.
- Production build passes locally.

---

## [Phase 8] - 2026-08-04

### Added

- Connected the public contact form to Supabase.
- Added atomic contact submission workflow.
- Added server-only Supabase admin client.
- Added PostgreSQL contact submission function.
- Added automatic lead creation.
- Added repeat inquiry handling.
- Added automatic activity logging.
- Preserved existing validation and anti-spam protections.
- Preserved existing Resend integration.

### Security

- Browser never writes directly to Supabase.
- Contact submissions use a server-only client.
- Database transaction is atomic.
- Database becomes the source of truth before emails are sent.
- Email failures no longer lose customer inquiries.

### Verified

- Contact form stores leads.
- Contact form stores inquiries.
- Activity log entries are created.
- Existing lead matching works.
- Duplicate active leads are prevented.
- Existing lead data is preserved.
- ESLint passes.
- Production build passes locally.

---

## [Phase 7] - 2026-08-04

### Added

- Supabase integration
- Authentication
- Protected admin routes
- Admin login/logout
- Database migrations
- Row Level Security
- Admin roles
- Activity log
- Leads
- Clients
- Projects
- Proposals
- Invoices
- Templates
- Websites

### Security

- Server-side authentication
- RLS enabled on all tables
- Protected admin routes
- Secret keys remain server-side

### Fixed

- Missing authenticated database permissions
- Admin login permission issue

### Verified

- Login works
- Logout works
- Protected routes work
- Build passes
- Lint passes

---

## [Phase 6]

- Resend integration
- Google Analytics
- Contact email templates
- Rate limiting
- Spam protection
- Server-side validation

---

## [Phase 5]

- SEO improvements
- Portfolio pages
- Sitemap
- Robots.txt
- Metadata
- Open Graph

---

## [Phase 4]

- Six demo websites
- Template previews

---

## [Phases 1–3]

- Agency website
- Responsive layout
- Services
- Pricing
- Templates
- About
- Contact
- Design system
- Tailwind CSS
- TypeScript
- Next.js
