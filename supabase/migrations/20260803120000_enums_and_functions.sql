-- Phase 7: enums + shared trigger function.
--
-- Enums are used (not lookup tables) for every fixed status/role set below.
-- Every one of these values is already hard-coded into the frontend
-- TypeScript types (PipelineStage, ProjectStage, WorkStatus, etc. in
-- src/lib/admin-demo-data.ts) — adding a new value always requires a
-- frontend code change regardless, so a lookup table's main advantage
-- (adding values without a migration) doesn't buy anything here. See
-- the approved architecture document, section 3, for the full reasoning.

create type admin_role as enum ('owner', 'admin', 'staff');
create type priority_level as enum ('low', 'medium', 'high');
create type lead_status as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');
create type follow_up_status as enum ('pending', 'completed', 'cancelled');
create type client_status as enum ('active', 'inactive', 'archived');
create type project_status as enum ('active', 'on_hold', 'completed', 'cancelled');
create type project_stage as enum ('planning', 'design', 'development', 'review', 'launch', 'completed');
create type proposal_status as enum ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired');
create type invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'cancelled');
create type website_status as enum (
  'planning', 'in_design', 'in_development', 'client_review',
  'ready_to_launch', 'live', 'maintenance', 'archived'
);
create type template_status as enum ('active', 'draft', 'archived');

-- Reused by every table below that has an `updated_at` column, so the
-- "keep updated_at current" logic exists exactly once.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Generic BEFORE UPDATE trigger — sets updated_at = now() on any table that attaches it.';
