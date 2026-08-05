# Changelog

All notable changes to this project will be documented here.

## [Unreleased]

### Planned

- Connect the public contact form to Supabase
- Store leads and lead inquiries
- Add real dashboard data
- Build lead management
- Build follow-up management
- Build client and project management

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
