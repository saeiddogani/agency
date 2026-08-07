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

## [Phase 12A] - 2026-08-06

### Changed — Email templates only (no sending logic changed)

- Improved customer confirmation email — clean white card layout, proper heading/spacing, a subtle blue "Visit Our Website" CTA button, and a branded footer. Copy rewritten to the requested wording.
- Improved admin notification email — reformatted from a flat field dump into four clear sections (Contact Information, Business Information, Project Details, Message), with a "Reply to {name}" CTA button and the same branded footer/visual language as the customer email.
- Added professional, consistent HTML email templates for both (shared shell/footer/CTA-button helpers in `src/lib/email-templates.ts`).
- Added matching plain-text versions for both emails, mirroring the new section structure.

### Subject lines

- Customer confirmation: "We've received your project inquiry" (was: "We've received your inquiry — Northlight Studio").
- Admin notification: "New Project Inquiry — {businessName}", falling back to "New Project Inquiry — {name}" if no business name is present (was: "New Website Project Inquiry — {businessName}", no fallback).

### Not changed

- `src/app/api/contact/route.ts` — untouched. `resend.emails.send()` calls, the `buildLeadNotificationEmail`/`buildCustomerAutoReplyEmail` function signatures, validation, rate limiting, the honeypot check, the Supabase `create_contact_inquiry` call, and all routing are exactly as they were.
- No images or tracking pixels added to either template.

### Verified

- ESLint passes.
- `tsc --noEmit` passes.
- `next build` still can't run in this sandbox (pre-existing, sandbox-only missing SWC binary for linux/arm64, unrelated to this change) — recommend running `npm run build` locally to confirm, and sending a real test submission to preview both emails.

---

## [Phase 11] - 2026-08-06

### Changed — Homepage copy only (no layout, design, or backend changes)

Rewrote homepage copy to speak to business owners and lead with outcomes rather than describing services. No section was added, removed, or reordered.

- **Hero** (`HeroCarousel.tsx`): eyebrow, headline, subtext, and both CTA buttons rewritten.
  - Eyebrow: "Web Design & Development for Local Businesses" → "Web Design for Vancouver Small Businesses"
  - Headline: "Websites That Help Your Business Grow." → "A Website That Turns Visitors Into Customers."
  - Subtext rewritten to speak directly to the reader ("you") instead of describing what "we" do.
  - Primary CTA: "Get Started" → "Get Your Quote"
  - Secondary CTA: "View Templates" → "See Example Websites"
- **Trust bar** (`trustPoints` in `lib/data.ts`): replaced generic feature tags with concrete, specific reassurances, each grounded in a claim already made elsewhere on the site (pricing FAQ, maintenance copy) so nothing new is asserted: "Modern Design" → "Live in 2–4 Weeks", "Mobile Friendly" → "No Tech Skills Needed", "Fast Performance" → "Mobile-Friendly by Default", "SEO Ready" → "Built to Rank on Google".
- **Services preview**: eyebrow "What We Do" → "What You Get"; description tightened. Three of the six service card descriptions rewritten to lead with the business outcome instead of the deliverable (Website Design, Website Development, SEO); the other three were already outcome-first and left as-is.
- **Templates preview**: title "Start With a Design You Love" → "A Design That Already Looks Like Your Business"; description rewritten to speak to the reader and set expectations about customization.
- **Why Choose Us**: eyebrow "Why Choose Us" → "What You Can Expect" (customer-centric instead of agency-centric); two of six item descriptions tightened for sharper, more direct phrasing.
- **Process**: eyebrow "Our Process" → "How It Works"; step 1 and step 4 descriptions tightened toward the reader's outcome.
- **Final CTA** (homepage only — see note below): heading "Ready to Build a Better Website?" → "Ready to Turn More Visitors Into Customers?" (echoes the hero's promise); supporting text rewritten to reduce last-step friction ("no pressure, no obligation"). Button label ("Start Your Project") intentionally left unchanged to stay consistent with the identical label used on the About and Templates pages' own closing CTAs.

### Not changed

- Layout, section order, design language, color palette, navigation, and all animations from Phase 10A/10B — untouched.
- Supabase, CRM, admin dashboard, contact-form logic, and routing — untouched.
- `FinalCta.tsx`'s default props were edited, but every other page that renders `<FinalCta />` (Services, Templates, About) passes its own explicit heading/text/buttonLabel and is fully unaffected — verified by inspecting every call site before editing.
- `serviceDetails`, `aboutValues`, `pricingTiers`, `pricingFaqs`, and `testimonials` in `lib/data.ts` were left untouched — they belong to other pages (or, for pricing/testimonials, sections already removed from the homepage), not the homepage.
- Page `<title>`/meta description were left as-is — not a visible homepage section.

### Verified

- ESLint passes (one real issue found and fixed: an unescaped apostrophe in the new hero copy).
- `tsc --noEmit` passes cleanly.
- `next build` still can't run in this sandbox (pre-existing, sandbox-only missing SWC binary for linux/arm64 — unrelated to this change); recommend running `npm run build` locally to confirm.

---

## [Phase 10B] - 2026-08-06

### Added — Homepage motion & micro-interactions (homepage only)

- Added the `motion` package (Motion for React, v12) — the only animation dependency added. Not yet in `node_modules` in this sandbox; **run `npm install` locally before `npm run dev`/`npm run build`** (see "Known limitation" below).
- New reusable motion system:
  - `src/lib/motion.ts` — centralized easing curve, durations, reveal distance, stagger timing, and viewport-trigger settings used by every animation below.
  - `src/components/motion/MotionProvider.tsx` — wraps the public site in `MotionConfig reducedMotion="user"`, so every component below automatically respects the visitor's OS-level reduced-motion setting with no per-component code.
  - `src/components/motion/FadeUp.tsx`, `FadeIn.tsx` — single-element reveals (fade+rise, or opacity-only).
  - `src/components/motion/StaggerContainer.tsx` + `StaggerItem.tsx` — reveals a group of children one after another (card grids, feature lists, process steps).
  - `src/components/motion/AnimatedSection.tsx` — single-block section reveal, for sections that don't need per-item stagger (currently unused by the homepage as shipped, but available — see "Not changed" below).
- Hero (`HeroCarousel.tsx`): staggered entrance on load — eyebrow → heading → paragraph → CTA buttons → mockup carousel — completing in ~0.87s. The mockup enters with opacity + a small upward move + a very slight scale (0.98 → 1), no rotation.
- Header (`Header.tsx`): now a Client Component; gains a subtle stronger background, border, and shadow once the page is scrolled, detected via a 1px scroll-sentinel + `IntersectionObserver` (not a scroll-event listener, so there's no per-frame React state update). Header height/padding is intentionally unchanged (avoids any layout shift or mismatch with the mobile menu's fixed offset).
- Mobile menu (`MobileMenu.tsx`): now animates open/close with `AnimatePresence` (fade + slight slide), and its links + CTA button stagger in. Escape-to-close and the body-scroll lock are unchanged; there was no click-outside-to-close behavior before this change, so none was added.
- Scroll-triggered reveals added to `TrustBar`, `ServicesPreview`, `TemplatesPreview`, `WhyChooseUs`, and `Process`: heading reveals first, then its cards/items/steps stagger in. Each section animates once. `TrustBar`, `ServicesPreview`, `TemplatesPreview`, `WhyChooseUs`, and `Process` are homepage-exclusive components, so this couldn't leak to any other page.
- The homepage's Final CTA is wrapped in a single `<FadeUp>` in `page.tsx` only — `FinalCta.tsx` itself was **not modified**, because it's also reused by `/services`, `/templates`, and `/about`; editing the shared component would have put motion (and its bundle cost) on pages this phase is explicitly not supposed to touch.
- Card/button hover micro-interactions — implemented as plain CSS transitions (transform/box-shadow/border-color), not the `motion` library (see "Performance decisions" below):
  - `ServiceCard`: 4px hover lift + deeper shadow (already had border/shadow from Phase 10A).
  - `TemplateCard`: 4px card lift, preview content scales ~1.03 within the mockup frame, "View Demo" gained an arrow icon that shifts on hover.
  - `Button`: subtle hover lift, active/pressed scale-down (0.98) for tactile click feedback, smoother transitions.
  - All of the above disable their transform movement under `prefers-reduced-motion` (Tailwind's `motion-reduce:` variant), independent of `MotionConfig` (which only governs the `motion`-library-driven reveals/hero/menu, not plain CSS hover states).

### Not changed

- `/admin`, `/admin/login`, CRM pages, Supabase, contact-form logic, Resend, analytics, SEO/routing, and public page content — untouched.
- Motion was **not** extended to `/services`, `/templates`, `/about`, `/contact`, or the template demo sites — homepage only, per instruction.
- `PricingCard`, `TestimonialCard`, and `PortfolioCard` were left as-is (still unused/orphaned since the Pricing and Portfolio pages and homepage Testimonials section were removed earlier) — no live page renders them, so there was nothing to visibly improve; revisit if/when any of them comes back into use.
- `BrowserMockup.tsx` itself stays a neutral, non-animated primitive; the hover "zoom" lives in `TemplateCard`, the consumer that needs it — the hero carousel's own mockups intentionally don't get an extra hover effect (they already have a coordinated entrance and an existing hover-to-pause behavior).

### Performance decisions

- Reveals/entrance/menu animate only `opacity` and `transform` (`y`, `scale`) — never `width`/`height`/`top`/`left` — so nothing triggers layout/reflow.
- Card/button hover states are plain CSS transitions, not JS — zero bundle cost, no hydration risk, and correct default behavior on touch devices (no "stuck hover").
- `ServicesPreview`, `TemplatesPreview`, `WhyChooseUs`, `Process`, `TrustBar`, and the homepage's `page.tsx` remain Server Components; only the motion primitives they render (already `"use client"`) and `Header`/`MobileMenu`/`HeroCarousel` need client-side JS — no large Server Component was converted unnecessarily.
- `MotionConfig reducedMotion="user"` is scoped to the public chrome only (not `/admin` or standalone template demos), so reduced-motion handling doesn't add any weight to pages that don't use `motion` at all.
- Every scroll reveal uses `viewport={{ once: true }}` — nothing re-animates on repeated scrolling.

### Known limitation

- `motion` could not be installed in this sandbox (`npm install` returns `403 Forbidden` here, same restriction noted in earlier phases) — it was added to `package.json` only. **Run `npm install` locally, then `npm run build`, before relying on this being verified end-to-end.** `npx tsc --noEmit` here shows only "Cannot find module 'motion/react'" errors (expected, resolves after a local install) — every other file typechecks cleanly. `npm run build` still fails in this sandbox only due to the pre-existing missing SWC binary for linux/arm64 (see earlier phases), unrelated to this change.

### Verified

- ESLint passes.
- `tsc --noEmit` passes except for the expected "Cannot find module 'motion/react'" errors described above (one real bug — a possibly-`undefined` array destructure in `Header.tsx`'s `IntersectionObserver` callback — was found and fixed during this pass).
- `next build` not runnable in this sandbox (pre-existing SWC limitation) — recommend running locally.

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
