-- Phase 7: RLS helper functions.
--
-- Every table's RLS policy needs to answer "is the caller an active admin"
-- (and sometimes "...with role X"). Inlining `exists (select 1 from
-- admin_users where ...)` in every policy, on every table — including on
-- admin_users itself — is exactly the shape that causes recursive RLS
-- evaluation problems. These two functions are defined once, here, and
-- used everywhere instead.
--
-- SECURITY DEFINER makes each function execute with the privileges of its
-- owner (the migration role), not the calling user — so the `select ...
-- from admin_users` inside the function does NOT get re-evaluated against
-- admin_users' own RLS policies the way a normal caller's query would.
-- That's what breaks the recursion: a policy on admin_users itself can
-- safely call is_active_admin() without re-entering admin_users' RLS.
--
-- `set search_path = public` is required for SECURITY DEFINER functions —
-- without it, they're vulnerable to search-path hijacking (a caller-
-- controlled search_path could redirect unqualified table references to a
-- different table). `stable` lets Postgres cache the result within a
-- single statement instead of re-running it per row.

create or replace function public.is_active_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.id = auth.uid()
      and admin_users.is_active = true
  );
$$;

comment on function public.is_active_admin() is
  'True if the current authenticated user is an active row in admin_users. SECURITY DEFINER so this can be called from a policy ON admin_users itself without recursing.';

create or replace function public.has_admin_role(required_roles admin_role[])
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.id = auth.uid()
      and admin_users.is_active = true
      and admin_users.role = any(required_roles)
  );
$$;

comment on function public.has_admin_role(admin_role[]) is
  'True if the current authenticated user is an active admin with one of the given roles. Use e.g. has_admin_role(array[''owner'',''admin'']::admin_role[]) for owner/admin-only actions.';

-- Functions are executable by PUBLIC by default unless revoked — tighten
-- this explicitly. (Not a live vulnerability either way, since both
-- functions resolve to false for an anonymous caller with no auth.uid(),
-- but being explicit here is cheap and removes any ambiguity.)
revoke all on function public.is_active_admin() from public;
grant execute on function public.is_active_admin() to authenticated;

revoke all on function public.has_admin_role(admin_role[]) from public;
grant execute on function public.has_admin_role(admin_role[]) to authenticated;
