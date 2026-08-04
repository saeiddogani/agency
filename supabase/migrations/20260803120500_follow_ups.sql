-- Phase 7: follow_ups.
--
-- One table, referenced by leads, clients, and projects — this is what
-- powers "Needs Attention" (overdue / due today / upcoming) and all three
-- columns of "Today's Work" on the dashboard once real data is wired up in
-- a later phase. RESTRICT on every parent FK: a completed or cancelled
-- follow-up is still real history of what was planned and done, and must
-- not disappear if its parent lead/client/project is ever removed.

create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads (id) on delete restrict,
  client_id uuid references public.clients (id) on delete restrict,
  project_id uuid references public.projects (id) on delete restrict,
  title text not null,
  description text,
  due_at timestamptz not null,
  status follow_up_status not null default 'pending',
  priority priority_level not null default 'medium',
  completed_at timestamptz,
  assigned_to uuid references public.admin_users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint follow_ups_target_check check (
    lead_id is not null or client_id is not null or project_id is not null
  )
);

comment on table public.follow_ups is
  'A follow-up must relate to at least one of lead/client/project (see the check constraint). Powers Needs Attention and Today''s Work — overdue: status=pending and due_at < now(); due today: status=pending and due_at::date = current_date.';

create trigger follow_ups_set_updated_at
  before update on public.follow_ups
  for each row
  execute function public.set_updated_at();

-- Backs the overdue / due-today / upcoming queries directly.
create index follow_ups_status_due_at_idx on public.follow_ups (status, due_at);
create index follow_ups_lead_id_idx on public.follow_ups (lead_id);
create index follow_ups_client_id_idx on public.follow_ups (client_id);
create index follow_ups_project_id_idx on public.follow_ups (project_id);
create index follow_ups_assigned_to_idx on public.follow_ups (assigned_to);
