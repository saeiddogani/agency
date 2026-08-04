-- Phase 7: templates + websites.
--
-- templates is the future database-backed replacement for the currently
-- static TemplateDefinition[] in src/lib/templates.ts (see supabase/seed.sql
-- for seeding it with the existing 6 real templates — this migration only
-- creates the table). A website may optionally reference a template; the
-- two stay independent, as approved.

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  description text,
  preview_image_url text,
  demo_url text,
  status template_status not null default 'active',
  price numeric(10, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger templates_set_updated_at
  before update on public.templates
  for each row
  execute function public.set_updated_at();

create index templates_status_idx on public.templates (status);


create table public.websites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  project_id uuid references public.projects (id) on delete restrict,
  -- SET NULL: a website "used" a template, it doesn't "belong to" one — if
  -- the template is later removed from the catalog, the website keeps its
  -- own identity and just loses that cross-reference. The one intentional
  -- exception to the RESTRICT-everywhere pattern used elsewhere.
  template_id uuid references public.templates (id) on delete set null,
  name text not null,
  domain text,
  staging_url text,
  production_url text,
  status website_status not null default 'planning',
  launch_date date,
  hosting_provider text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.websites is
  'Never store hosting/CMS/domain-registrar credentials here, not even encrypted. Reference where they''re kept (e.g. "See 1Password — Agency vault") in notes instead.';

create trigger websites_set_updated_at
  before update on public.websites
  for each row
  execute function public.set_updated_at();

create index websites_client_id_idx on public.websites (client_id);
create index websites_project_id_idx on public.websites (project_id);
create index websites_status_idx on public.websites (status);
