-- Phase 7: admin_users — profile + role for everyone who can sign into
-- /admin. Supabase Auth (auth.users) owns credentials entirely; this table
-- never stores a password or anything credential-like.

create table public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  role admin_role not null default 'staff',
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.admin_users is
  'One row per auth.users row (same id), created automatically by the trigger below. role defaults to the lowest privilege (staff); promote the first user to owner manually — see docs/supabase-setup.md. Deactivate someone by setting is_active = false rather than deleting the row, so their name stays attributable on old activity_log/assigned_to history.';

create trigger admin_users_set_updated_at
  before update on public.admin_users
  for each row
  execute function public.set_updated_at();

-- Standard Supabase pattern: auto-create the profile row whenever a new
-- Auth user is created (e.g. after accepting an invite from the Supabase
-- dashboard — this project has no public sign-up flow).
create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_users (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_admin_user();
