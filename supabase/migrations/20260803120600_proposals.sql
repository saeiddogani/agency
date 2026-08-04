-- Phase 7: proposals.
--
-- line_items is jsonb, not a child table — structure without the overhead
-- of a full relational line-items table for something that currently only
-- needs to be displayed, not individually reported on. A clean migration
-- to a real `proposal_line_items` table remains possible later without
-- touching this table. No Stripe/payment fields — none needed yet.

create sequence public.proposal_number_seq;

create table public.proposals (
  id uuid primary key default gen_random_uuid(),
  proposal_number text not null unique
    default ('PRO-' || lpad(nextval('public.proposal_number_seq')::text, 4, '0')),
  lead_id uuid references public.leads (id) on delete restrict,
  client_id uuid references public.clients (id) on delete restrict,
  project_id uuid references public.projects (id) on delete restrict,
  title text not null,
  description text,
  line_items jsonb,
  amount numeric(10, 2) not null,
  status proposal_status not null default 'draft',
  sent_at timestamptz,
  viewed_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  expires_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint proposals_target_check check (lead_id is not null or client_id is not null)
);

create trigger proposals_set_updated_at
  before update on public.proposals
  for each row
  execute function public.set_updated_at();

create index proposals_status_idx on public.proposals (status);
create index proposals_lead_id_idx on public.proposals (lead_id);
create index proposals_client_id_idx on public.proposals (client_id);
create index proposals_project_id_idx on public.proposals (project_id);
