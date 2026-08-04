-- Phase 7: invoices.
--
-- No Stripe, no payment processing, no card data — amount/status tracking
-- only. `total` is a generated column so it can never drift out of sync
-- with amount + tax. When payment processing is added later, only opaque
-- reference columns (e.g. stripe_invoice_id) get added here — this table
-- stays entirely out of PCI scope.

create sequence public.invoice_number_seq;

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique
    default ('INV-' || lpad(nextval('public.invoice_number_seq')::text, 4, '0')),
  client_id uuid not null references public.clients (id) on delete restrict,
  project_id uuid references public.projects (id) on delete restrict,
  amount numeric(10, 2) not null,
  tax numeric(10, 2) not null default 0,
  total numeric(10, 2) generated always as (amount + tax) stored,
  status invoice_status not null default 'draft',
  issue_date date,
  due_date date,
  paid_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger invoices_set_updated_at
  before update on public.invoices
  for each row
  execute function public.set_updated_at();

create index invoices_status_idx on public.invoices (status);
create index invoices_due_date_idx on public.invoices (due_date);
create index invoices_client_id_idx on public.invoices (client_id);
create index invoices_project_id_idx on public.invoices (project_id);
