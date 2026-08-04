-- Phase 7: Row Level Security.
--
-- Default posture: enable RLS on every table below, grant NOTHING to
-- `anon`. No table in this migration gets a policy naming `anon` — that is
-- deliberate, not an omission. The public contact form does not, and will
-- not, talk to Supabase directly; it continues to POST to the existing
-- `/api/contact` Route Handler (unchanged by this phase), which — once
-- wired up in a later phase — will use the Supabase secret key server-side.
-- That key carries BYPASSRLS and is never exposed to the browser, so it
-- doesn't need an RLS policy to do its job; it doesn't go through RLS at
-- all. See docs/supabase-setup.md for the full explanation.
--
-- Every table using is_active_admin() / has_admin_role() below relies on
-- the SECURITY DEFINER functions defined in the previous migration — see
-- that file for why this avoids recursive policy evaluation.

-- ---------------------------------------------------------------------------
-- admin_users
-- ---------------------------------------------------------------------------
alter table public.admin_users enable row level security;

create policy "active admins can view the team roster"
  on public.admin_users for select
  to authenticated
  using (is_active_admin());

-- No self-service profile editing in this phase (name/avatar changes are a
-- reasonable later enhancement) — only owner/admin can update ANY
-- admin_users row, including their own. This is a deliberate, simple
-- choice: allowing `auth.uid() = id` as an alternative would let a plain
-- policy technically permit a user to edit their own `role` column too,
-- since Postgres RLS has no native column-level restriction — avoiding
-- that entirely is simpler than adding a column-guarding trigger for a
-- feature (self-service profile editing) nothing needs yet.
create policy "owners and admins can update admin_users"
  on public.admin_users for update
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]))
  with check (has_admin_role(array['owner', 'admin']::admin_role[]));

-- No insert policy: rows are created only by the handle_new_admin_user()
-- trigger (SECURITY DEFINER, runs alongside the Auth user insert, not
-- through a policy-checked API call) — there is no legitimate direct-insert
-- path from the app, so none is granted.
--
-- No delete policy: deactivate via is_active = false (see the update
-- policy above) rather than removing the row, so attribution on old
-- assigned_to / activity_log.user_id history is preserved. Actual account
-- removal is a rare, manual, dashboard-level action.

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;

create policy "active admins can view leads"
  on public.leads for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create leads"
  on public.leads for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update leads"
  on public.leads for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete leads"
  on public.leads for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]));

-- ---------------------------------------------------------------------------
-- lead_inquiries — immutable: select + insert only, no update, no delete.
-- This enforces "a repeat inquiry never overwrites a previous one" at the
-- database layer, not just as an application convention.
-- ---------------------------------------------------------------------------
alter table public.lead_inquiries enable row level security;

create policy "active admins can view lead inquiries"
  on public.lead_inquiries for select
  to authenticated
  using (is_active_admin());

create policy "active admins can record lead inquiries"
  on public.lead_inquiries for insert
  to authenticated
  with check (is_active_admin());

-- ---------------------------------------------------------------------------
-- follow_ups
-- ---------------------------------------------------------------------------
alter table public.follow_ups enable row level security;

create policy "active admins can view follow-ups"
  on public.follow_ups for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create follow-ups"
  on public.follow_ups for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update follow-ups"
  on public.follow_ups for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete follow-ups"
  on public.follow_ups for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]));

-- ---------------------------------------------------------------------------
-- clients
-- ---------------------------------------------------------------------------
alter table public.clients enable row level security;

create policy "active admins can view clients"
  on public.clients for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create clients"
  on public.clients for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update clients"
  on public.clients for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete clients"
  on public.clients for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]));

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
alter table public.projects enable row level security;

create policy "active admins can view projects"
  on public.projects for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create projects"
  on public.projects for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update projects"
  on public.projects for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete projects"
  on public.projects for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]));

-- ---------------------------------------------------------------------------
-- proposals — delete is further limited to drafts. A sent/accepted/
-- rejected/expired proposal is a real business record; only a proposal
-- that was never sent is trivial enough to actually remove.
-- ---------------------------------------------------------------------------
alter table public.proposals enable row level security;

create policy "active admins can view proposals"
  on public.proposals for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create proposals"
  on public.proposals for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update proposals"
  on public.proposals for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete draft proposals"
  on public.proposals for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]) and status = 'draft');

-- ---------------------------------------------------------------------------
-- invoices — same draft-only delete reasoning as proposals.
-- ---------------------------------------------------------------------------
alter table public.invoices enable row level security;

create policy "active admins can view invoices"
  on public.invoices for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create invoices"
  on public.invoices for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update invoices"
  on public.invoices for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete draft invoices"
  on public.invoices for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]) and status = 'draft');

-- ---------------------------------------------------------------------------
-- websites
-- ---------------------------------------------------------------------------
alter table public.websites enable row level security;

create policy "active admins can view websites"
  on public.websites for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create websites"
  on public.websites for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update websites"
  on public.websites for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete websites"
  on public.websites for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]));

-- ---------------------------------------------------------------------------
-- templates — fully admin-only in this phase (explicitly required: public/
-- anonymous users must not read templates from the database either). The
-- public site continues to read from the static src/lib/templates.ts file;
-- a public SELECT policy here is a possible future addition, not needed or
-- added now.
-- ---------------------------------------------------------------------------
alter table public.templates enable row level security;

create policy "active admins can view templates"
  on public.templates for select
  to authenticated
  using (is_active_admin());

create policy "active admins can create templates"
  on public.templates for insert
  to authenticated
  with check (is_active_admin());

create policy "active admins can update templates"
  on public.templates for update
  to authenticated
  using (is_active_admin())
  with check (is_active_admin());

create policy "owners and admins can delete templates"
  on public.templates for delete
  to authenticated
  using (has_admin_role(array['owner', 'admin']::admin_role[]));

-- ---------------------------------------------------------------------------
-- activity_log — immutable, same reasoning as lead_inquiries: select +
-- insert only. The insert policy also prevents impersonation: an
-- authenticated admin may only attribute an activity row to themselves or
-- leave it system-generated (null) — never to a different admin's id.
-- Trusted server-side code (once built, using the secret key) bypasses RLS
-- entirely and isn't affected by this constraint.
-- ---------------------------------------------------------------------------
alter table public.activity_log enable row level security;

create policy "active admins can view activity"
  on public.activity_log for select
  to authenticated
  using (is_active_admin());

create policy "active admins can record activity"
  on public.activity_log for insert
  to authenticated
  with check (
    is_active_admin()
    and (user_id = auth.uid() or user_id is null)
  );
