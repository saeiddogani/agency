-- Phase 7: clients.
--
-- A lead BECOMES a client — it is not converted in place. clients.source_lead_id
-- is a one-directional backlink; there is deliberately no matching column on
-- leads pointing back, to avoid two foreign keys that could drift out of sync.

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  -- Simple primary-contact columns for v1 (see architecture doc §5/§8) — a
  -- future `client_contacts` table is a clean additive change if a client
  -- ever needs more than one tracked contact; nothing here needs to change
  -- to support that later.
  primary_contact_name text not null,
  primary_contact_email text not null,
  primary_contact_phone text,
  website text,
  address text,
  notes text,
  status client_status not null default 'active',
  -- SET NULL, not RESTRICT: this is an attribution backlink, not ownership
  -- of business history the way follow_ups/proposals/invoices/websites are
  -- (those stay RESTRICT below). Losing this reference in the rare event a
  -- lead is purged just means "we no longer know which lead this came
  -- from" — acceptable, and consistent with how websites.template_id is
  -- treated (a reference, not a parent-child ownership relationship).
  source_lead_id uuid references public.leads (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.clients is
  '"Deleting" a client in the app is status = archived (already an enum value here), not a real DELETE — see the RESTRICT foreign keys on follow_ups/projects/proposals/invoices/websites, which protect a client''s history even if a hard delete is ever attempted directly against the database.';

create trigger clients_set_updated_at
  before update on public.clients
  for each row
  execute function public.set_updated_at();

create index clients_status_idx on public.clients (status);
create index clients_source_lead_id_idx on public.clients (source_lead_id);
