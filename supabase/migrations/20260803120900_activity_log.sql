-- Phase 7: activity_log.
--
-- Polymorphic (entity_type + entity_id), deliberately with NO foreign key
-- to the entities it describes — a log has to be able to point at rows in
-- several different tables, which a single Postgres FK can't do. This also
-- means deleting a lead/client/project can never cascade-delete its
-- activity history: there is no constraint for a cascade to travel
-- through. `description` is a plain text snapshot captured at write time,
-- so a log entry stays meaningful even if the entity it refers to is later
-- gone.
--
-- Note: this migration only creates the table. Automatic activity
-- generation for every feature (inserting a row whenever a lead changes
-- status, etc.) is application logic for a later phase, per the approved
-- Phase 7 scope — not part of the backend foundation itself.

create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null, -- 'lead' | 'client' | 'project' | 'proposal' | 'invoice' | 'website' | 'follow_up'
  entity_id uuid not null,
  action text not null, -- 'created' | 'status_changed' | 'email_sent' | ...
  description text not null, -- human-readable: "ABC Roofing moved to Qualified"
  metadata jsonb,
  user_id uuid references public.admin_users (id) on delete set null, -- null = system-generated event
  created_at timestamptz not null default now()
);

comment on table public.activity_log is
  'Append-only, no FK to the entities it describes (see comment above) — this is what protects activity history from disappearing if a parent record is later removed.';

create index activity_log_created_at_idx on public.activity_log (created_at desc);
create index activity_log_entity_idx on public.activity_log (entity_type, entity_id);
