-- Phase 7 follow-up: table-level GRANTs for the `authenticated` role.
--
-- Root cause of the "active admin_users row still shows as inactive" bug:
-- Row Level Security and SQL GRANTs are two independent, both-required
-- layers in Postgres. RLS policies control WHICH ROWS a role can see/touch
-- once it's already allowed to run the statement at all — they do nothing
-- if the role was never granted the underlying SELECT/INSERT/UPDATE/DELETE
-- privilege on the table in the first place. Every earlier migration in
-- this project enabled RLS and wrote policies, but never issued the plain
-- SQL-standard GRANTs alongside them — so every query from `authenticated`
-- was being rejected before RLS was ever evaluated ("permission denied for
-- table ..."), which is a different failure mode than "0 rows returned by
-- RLS" but was surfacing identically in the app as the generic inactive-
-- account redirect (see src/app/admin/(dashboard)/layout.tsx).
--
-- This migration grants exactly the operations each table's existing RLS
-- policies (from 20260803121100_rls_policies.sql) already allow for
-- `authenticated` — nothing broader. It does not add, remove, or alter any
-- RLS policy, and it grants nothing to `anon`: an authenticated-but-not-
-- active-admin user, or one without the right role, still gets zero rows
-- back on every operation, exactly as before — the RLS USING/WITH CHECK
-- clauses are what actually enforce that, and are completely unchanged.
-- Granting e.g. DELETE at the table level does not mean every authenticated
-- user can delete every row: it means the role is allowed to attempt a
-- DELETE statement at all, and RLS then filters it down to only the rows
-- (if any) its policy permits — for owner/admin-gated deletes, a `staff`
-- user's DELETE is still a well-formed, permitted statement that simply
-- matches and removes zero rows.
--
-- `admin_users` is deliberately SELECT + UPDATE only (no INSERT — rows are
-- created solely by the on_auth_user_created trigger; no DELETE — accounts
-- are deactivated via is_active = false, never removed), matching that
-- table's policy set exactly.
--
-- `lead_inquiries` and `activity_log` are deliberately SELECT + INSERT only
-- (no UPDATE, no DELETE), matching their immutability design from the
-- approved architecture.
--
-- `proposals` and `invoices` also need USAGE on their number-generating
-- sequences: the `proposal_number` / `invoice_number` columns default to
-- `nextval(...)`, and that default is evaluated as the inserting role
-- (`authenticated` via PostgREST), not the table owner — without this
-- grant, every insert would fail at the sequence, independent of the table
-- grant above it.

grant usage on schema public to authenticated;

grant select, update on table public.admin_users to authenticated;

grant select, insert, update, delete on table public.leads to authenticated;

grant select, insert on table public.lead_inquiries to authenticated;

grant select, insert, update, delete on table public.follow_ups to authenticated;

grant select, insert, update, delete on table public.clients to authenticated;

grant select, insert, update, delete on table public.projects to authenticated;

grant select, insert, update, delete on table public.proposals to authenticated;
grant usage, select on sequence public.proposal_number_seq to authenticated;

grant select, insert, update, delete on table public.invoices to authenticated;
grant usage, select on sequence public.invoice_number_seq to authenticated;

grant select, insert, update, delete on table public.websites to authenticated;

grant select, insert, update, delete on table public.templates to authenticated;

grant select, insert on table public.activity_log to authenticated;
