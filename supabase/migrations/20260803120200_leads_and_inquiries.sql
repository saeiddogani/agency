-- Phase 7: leads + lead_inquiries.
--
-- leads = the business/contact record and its position in the pipeline.
-- lead_inquiries = the append-only history of every contact-form submission
-- for that lead — never updated, so a repeat inquiry can never overwrite or
-- lose a previous one. See the approved architecture document (v2) for the
-- full reasoning behind this split.

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  -- Generated, not app-maintained: guarantees this is always correct and
  -- never drifts out of sync with `email`, and is what the race-safe
  -- duplicate protection below is built on.
  email_normalized text generated always as (lower(btrim(email))) stored,
  phone text,
  website text,
  business_type text,
  source text not null default 'contact_form', -- first-touch attribution, set once
  status lead_status not null default 'new',
  priority priority_level not null default 'medium',
  lost_reason text,
  estimated_value numeric(10, 2), -- admin's qualified estimate, distinct from a raw form budget bucket
  assigned_to uuid references public.admin_users (id) on delete set null,
  last_contacted_at timestamptz,
  won_at timestamptz,
  lost_at timestamptz,
  archived_at timestamptz, -- soft delete; deliberately separate from `status` (see comment below)
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.leads is
  'The business/contact record and where it sits in the sales pipeline. Per-submission content (message, services requested, budget, timeline) lives in lead_inquiries, not here.';
comment on column public.leads.archived_at is
  'Soft delete. Separate from status: status=lost is a real sales outcome kept in reporting/funnel history; archived means hidden entirely (spam, duplicate test entries, mistakes) and is excluded from the active-duplicate check below.';

create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();

-- Race-safe duplicate protection: at most one OPEN, non-archived lead per
-- normalized email, enforced by the database rather than an
-- application-level check-then-insert (which has a race window). Combined
-- with `insert ... on conflict (...) where ... do nothing` at the call
-- site, this makes "does an active lead already exist" atomic. Leads that
-- are won/lost/archived are excluded on purpose, so a genuine repeat
-- inquiry from a closed-out lead can still create a fresh lead rather than
-- being blocked forever.
create unique index leads_active_email_unique
  on public.leads (email_normalized)
  where status not in ('won', 'lost') and archived_at is null;

-- General-purpose lookup/search — distinct from the partial unique index
-- above, which exists only to enforce the active-duplicate rule.
create index leads_email_normalized_idx on public.leads (email_normalized);
create index leads_status_idx on public.leads (status);
create index leads_created_at_idx on public.leads (created_at);
create index leads_assigned_to_idx on public.leads (assigned_to);


create table public.lead_inquiries (
  id uuid primary key default gen_random_uuid(),
  -- RESTRICT: a lead can never be deleted out from under its own inquiry
  -- history. In practice this means leads are effectively permanent once
  -- they have at least one inquiry, which they always do.
  lead_id uuid not null references public.leads (id) on delete restrict,
  submitted_at timestamptz not null default now(),
  source text not null default 'contact_form', -- source of THIS submission (may differ from leads.source)
  message text,
  services_requested text[],
  budget_range text,
  timeline text,
  -- Raw snapshot of exactly what was submitted, distinct from the
  -- (possibly since-corrected) canonical identity fields on `leads`.
  submitted_name text,
  submitted_email text,
  submitted_phone text,
  submitted_website text,
  created_at timestamptz not null default now()
);

comment on table public.lead_inquiries is
  'Append-only. One row per contact-form submission, ever. Never updated after insert — a repeat inquiry always adds a new row here rather than overwriting anything on leads. Does not duplicate name/email/phone/company from leads; submitted_* columns are a raw audit snapshot, not a copy of canonical identity.';

create index lead_inquiries_lead_id_idx on public.lead_inquiries (lead_id);
create index lead_inquiries_submitted_at_idx on public.lead_inquiries (submitted_at);
