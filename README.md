# Northlight Studio — Agency Website

Marketing website for the agency itself, including a lead-capture contact form, a
browsable library of website template demos, and portfolio case studies. Built with
Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

The site works fully with no environment variables set — it falls back to a
localhost URL, the contact form runs in "demo mode" (submissions are validated and
logged, not emailed), and analytics simply doesn't load. See **Environment
variables** below for what to set as real credentials become available.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as they become available.
`.env.local` is already gitignored, so real secrets never get committed.

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Correct canonical/OG URLs, sitemap, robots | No trailing slash. Falls back to `http://localhost:3000`. |
| `EMAIL_API_KEY` | Sending real emails | Resend API key. |
| `EMAIL_FROM` | Sending real emails | Verified sender, e.g. `"Northlight Studio <notifications@yourdomain.com>"`. |
| `CONTACT_EMAIL` | Routing leads | Business inbox that receives inquiries. Falls back to `siteConfig.contact.email`. |
| `NEXT_PUBLIC_GA_ID` | Analytics | GA4 Measurement ID (`G-XXXXXXXXXX`). Analytics doesn't load if unset. |
| `NEXT_PUBLIC_SUPABASE_URL` | `/admin` login | Public. See [`docs/supabase-setup.md`](docs/supabase-setup.md). |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `/admin` login | Public, RLS-restricted. |
| `SUPABASE_SECRET_KEY` | *(not used yet)* | Server-only, secret. Documented ahead of the phase that connects the contact form to the database. |

## Admin backend (Supabase)

The `/admin` dashboard is now backed by a real Supabase project — Postgres database, Auth, and Row Level Security. As of this phase that covers the schema, authentication, and route protection only; the dashboard still displays the same demo data as before (see `src/lib/admin-demo-data.ts`), just behind a real login. Full setup walkthrough: [`docs/supabase-setup.md`](docs/supabase-setup.md). Schema lives in `supabase/migrations/`.

## Project structure

```
proxy.ts                      /admin session refresh + route protection (Supabase)
supabase/
  migrations/                 SQL schema, in order — see docs/supabase-setup.md
  seed.sql                    Local development only, never applied to production
src/
  app/
    layout.tsx              Root layout, fonts, global metadata, JSON-LD, GA
    page.tsx                 Home page
    services/ pricing/ about/ contact/ templates/ portfolio/   Site pages
    templates/[slug]/        Template demo dynamic route
    portfolio/[slug]/        Case study dynamic route
    api/contact/route.ts     Contact form endpoint (validation, rate limit, email)
    sitemap.ts, robots.ts    SEO
    admin/
      layout.tsx             Thin shared shell (metadata only)
      login/                 Public login page + sign-in/sign-out Server Actions
      (dashboard)/           Auth-gated — layout.tsx checks session + active admin, page.tsx is the dashboard
  components/
    layout/                 Header, MobileMenu, Footer, SiteChrome
    admin/                  AdminShell, AdminSidebar, AdminHeader, dashboard section components
    ui/                     Button (incl. GA event tracking), Container, SectionHeading, BrowserMockup
    cards/                  ServiceCard, TemplateCard, PortfolioCard, PricingCard, ProcessStep, TestimonialCard
    home/                   One component per homepage section
    contact/                ContactForm
    templates/              One folder per template demo site (self-contained)
    icons.tsx               Self-authored SVG icon set (no icon library)
  lib/
    site-config.ts           Agency name, nav links, contact info — THE place to update business details
    data.ts                  Content for services, pricing, contact form options, etc.
    templates.ts             Template demo registry
    portfolio.ts             Portfolio case study registry
    inquiry.ts, email-templates.ts, rate-limit.ts   Contact form service layer
    seo.ts                   Shared metadata builder
    analytics.ts             Google Analytics event helper
    admin-demo-data.ts       Dashboard demo data — see docs/supabase-setup.md for the real-data migration path
    supabase/                Browser + server Supabase client utilities
```

## Editing content

Business details (name, domain, email, phone, location, service area, social
links) live in **one place**: `src/lib/site-config.ts`. Everything else — services,
pricing, contact form options, portfolio case studies, template demos — lives in
`src/lib/data.ts`, `src/lib/portfolio.ts`, and `src/lib/templates.ts`.

## Launch checklist

Steps that require real credentials or a live domain, to complete once those are
available (not done automatically, since they can't be verified from here):

### 1. Domain & hosting

- [ ] Point your real domain at the Vercel (or other host) deployment.
- [ ] Set `NEXT_PUBLIC_SITE_URL` in your hosting provider's environment variables
      to the real domain, e.g. `https://www.yourdomain.com`.

### 2. Email (Resend)

- [ ] Create a Resend account and verify your sending domain at
      [resend.com/domains](https://resend.com/domains) (adds a few DNS records).
- [ ] Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
- [ ] Set `EMAIL_API_KEY`, `EMAIL_FROM` (using the verified domain), and
      `CONTACT_EMAIL` in your hosting provider's environment variables.
- [ ] Submit a real test inquiry on the live site and confirm both the lead
      notification and the customer auto-reply arrive.

### 3. Google Analytics

- [ ] Create a GA4 property at [analytics.google.com](https://analytics.google.com).
- [ ] Copy the Measurement ID (`G-XXXXXXXXXX`) from Admin → Data Streams → your
      web stream.
- [ ] Set `NEXT_PUBLIC_GA_ID` in your hosting provider's environment variables.
- [ ] Confirm page views and the `contact_form_submit` / `cta_click` events show
      up in GA4 Realtime after a test visit.

### 4. Google Search Console

Not attempted yet since the final domain isn't connected. Once it is:

- [ ] Add the property in [Search Console](https://search.google.com/search-console)
      (domain property is recommended over URL-prefix, since it covers all subdomains).
- [ ] Verify ownership — DNS TXT record is usually simplest if you already control
      the domain's DNS.
- [ ] Submit the sitemap: `https://yourdomain.com/sitemap.xml` (already generated
      automatically from `src/app/sitemap.ts` — no manual editing needed).
- [ ] Spot-check `https://yourdomain.com/robots.txt` resolves and references the
      sitemap correctly.
- [ ] Use the URL Inspection tool to request indexing for the homepage once live.

### 5. Admin backend (Supabase)

- [ ] Follow [`docs/supabase-setup.md`](docs/supabase-setup.md) end to end: create the project, set the three `SUPABASE_*`/`NEXT_PUBLIC_SUPABASE_*` env vars, run the migrations in `supabase/migrations/`, create your first admin user, and promote it to `owner`.
- [ ] Confirm `/admin/login` works, `/admin` redirects to it when signed out, and Logout in the sidebar works.
- [ ] Note: the dashboard itself still shows demo data as of this phase — connecting it to real leads/clients/projects is a separate, later phase.

### 6. Business information

- [ ] Replace every placeholder in `src/lib/site-config.ts` (name, email, phone,
      address, social links) with real details.
- [ ] Replace the placeholder testimonials in `src/lib/data.ts` with real client
      feedback once available.
- [ ] See the placeholder audit delivered at the end of Phase 6 for the full list
      of remaining placeholder content across the project.
