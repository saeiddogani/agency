-- ═══════════════════════════════════════════════════════════════════════
-- DEVELOPMENT SEED DATA — DO NOT RUN AGAINST PRODUCTION
-- ═══════════════════════════════════════════════════════════════════════
-- This file is only executed automatically by `supabase db reset` against
-- your LOCAL Supabase instance. It is never applied by `supabase db push`
-- and is not part of the migration history — production is never touched
-- by this file.
--
-- No fake leads, clients, projects, or any other business data is seeded
-- here — there's no UI yet to view them (Phase 7 is backend foundation
-- only), and inserting placeholder business records this early risks them
-- getting mistaken for real data later. The only thing seeded is the
-- agency's own real template catalog, which already exists as public
-- marketing content in src/lib/templates.ts — this just mirrors it into
-- the database so the `templates` table isn't empty once something reads
-- from it in a later phase.
-- ═══════════════════════════════════════════════════════════════════════

insert into public.templates (name, slug, category, description, status) values
  ('West Coast Roofing', 'west-coast-roofing', 'Home Services', 'A modern website concept for a professional roofing company.', 'active'),
  ('North Shore Landscaping', 'north-shore-landscaping', 'Home Services', 'A clean, visual website concept for a landscaping and outdoor services company.', 'active'),
  ('Casa Bella', 'casa-bella', 'Food & Hospitality', 'An elegant restaurant website concept focused on menu, atmosphere, and reservations.', 'active'),
  ('Studio 22', 'studio-22', 'Health & Beauty', 'A modern website concept for a barber or salon.', 'active'),
  ('NorthPoint Realty', 'northpoint-realty', 'Real Estate', 'A professional real estate website concept designed to showcase properties and generate inquiries.', 'active'),
  ('Apex Consulting', 'apex-consulting', 'Professional Services', 'A clean corporate website concept for a consulting or professional services company.', 'active')
on conflict (slug) do nothing;
