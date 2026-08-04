-- Phase 7: projects.
--
-- status and stage are deliberately separate fields — see the approved
-- architecture document, section 6, for the full reasoning: stage answers
-- "where in the build pipeline", status answers "is work actually
-- happening right now" (a project can be on_hold while its stage is still
-- development — there's no single value that expresses both at once).

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  name text not null,
  project_type text,
  description text,
  status project_status not null default 'active',
  stage project_stage not null default 'planning',
  progress smallint check (progress is null or progress between 0 and 100),
  start_date date,
  target_launch_date date,
  completed_date date,
  estimated_value numeric(10, 2),
  actual_value numeric(10, 2),
  assigned_to uuid references public.admin_users (id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

create index projects_status_idx on public.projects (status);
create index projects_status_target_launch_idx on public.projects (status, target_launch_date);
create index projects_client_id_idx on public.projects (client_id);
create index projects_assigned_to_idx on public.projects (assigned_to);
