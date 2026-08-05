-- Phase 8: public.create_contact_inquiry(...)
--
-- Single atomic entry point for the public contact form. Wraps three
-- writes — find-or-create the active lead, insert the lead_inquiries row,
-- insert the activity_log row — in one PL/pgSQL function body, which
-- Postgres already runs as a single transaction: either all three writes
-- land, or (on any error) none of them do. The API route calls this once
-- via RPC instead of issuing three independent inserts that could partially
-- succeed if the server crashed or the connection dropped between them.
--
-- SECURITY DEFINER is required here, not just convenient: the public
-- browser has zero database privileges (no anon INSERT grant exists on any
-- of these tables, by design — see 20260803121200_table_grants.sql and the
-- RLS policies in 20260803121100_rls_policies.sql, neither of which grants
-- anything to `anon`). The contact form's server route calls this function
-- using the service-role admin client (src/lib/supabase/admin.ts), and the
-- function then performs the actual table writes as its OWNER, which is
-- how a fully public-facing, credential-less form can still safely persist
-- rows into RLS-protected tables. Per current Supabase guidance, a
-- SECURITY DEFINER function must pin search_path — this one uses
-- `search_path = ''` (the strictest option) and schema-qualifies every
-- table reference in its body, so it cannot be tricked by a
-- caller-controlled search_path into resolving `leads`/`lead_inquiries`/
-- `activity_log` to some other, attacker-created object of the same name.
--
-- Race safety: reuses the exact `insert ... on conflict (email_normalized)
-- where status not in ('won','lost') and archived_at is null do nothing`
-- pattern the leads migration's own comments describe. Postgres resolves
-- concurrent inserts against the same partial unique index using the
-- index's own row-level locking — by the time this statement returns,
-- either this call's insert won (new lead) or the winning row from a
-- concurrent call is already committed and visible to the fallback SELECT
-- below. Two simultaneous submissions for the same email are guaranteed to
-- end up with exactly one active lead between them, both submissions still
-- recorded as separate lead_inquiries rows.
--
-- Deliberately narrow: this function only knows how to do ONE thing — take
-- a validated contact-form submission and turn it into a lead + inquiry +
-- activity row. It is not a general-purpose "upsert a lead" API.

create or replace function public.create_contact_inquiry(
  p_name text,
  p_email text,
  p_business_name text,
  p_phone text,
  p_website text,
  p_business_type text,
  p_services_requested text[],
  p_budget_range text,
  p_timeline text,
  p_message text
)
returns table (
  lead_id uuid,
  inquiry_id uuid,
  is_new_lead boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email_normalized text := lower(btrim(p_email));
  v_lead_id uuid;
  v_inquiry_id uuid;
  v_is_new_lead boolean;
begin
  -- 1. Find or create the active lead for this email, race-safely.
  --
  -- New leads get exactly the defaults the approved architecture calls
  -- for (status = new, priority = medium, source = contact_form — the
  -- latter two are the table's own column defaults, left unset here on
  -- purpose rather than re-stated, so this function can never drift out
  -- of sync with a future default change). company/business_type are only
  -- ever set here, on first creation — see the "repeat inquiry" branch
  -- below for why they are never touched again after that.
  insert into public.leads (name, company, email, business_type)
  values (p_name, p_business_name, p_email, p_business_type)
  on conflict (email_normalized) where status not in ('won', 'lost') and archived_at is null
  do nothing
  returning id into v_lead_id;

  v_is_new_lead := v_lead_id is not null;

  if not v_is_new_lead then
    -- Someone (possibly a concurrent call) already holds the active lead
    -- for this email. Deliberately does NOT touch name, company,
    -- business_type, status, priority, estimated_value, assigned_to, or
    -- notes here — those are admin-managed fields once a lead exists, and
    -- a customer resubmitting the same form is not the same thing as an
    -- admin editing the lead. See the migration header comment and the
    -- Phase 8 report for the full reasoning, including why
    -- last_contacted_at is also deliberately left untouched (it tracks
    -- outbound agency contact, not inbound form submissions).
    select id into v_lead_id
    from public.leads
    where email_normalized = v_email_normalized
      and status not in ('won', 'lost')
      and archived_at is null
    limit 1;
  end if;

  -- 2. One immutable inquiry row per submission, always — whether the
  -- lead above is brand new or already existed.
  insert into public.lead_inquiries (
    lead_id,
    message,
    services_requested,
    budget_range,
    timeline,
    submitted_name,
    submitted_email,
    submitted_phone,
    submitted_website
  )
  values (
    v_lead_id,
    p_message,
    p_services_requested,
    nullif(p_budget_range, ''),
    nullif(p_timeline, ''),
    p_name,
    p_email,
    nullif(p_phone, ''),
    nullif(p_website, '')
  )
  returning id into v_inquiry_id;

  -- 3. One activity row. Metadata stays minimal and non-identifying on
  -- purpose — no message text, phone, or email (see the migration header
  -- and Phase 8 report). user_id is null: this is a system-generated
  -- event, not an admin action.
  insert into public.activity_log (entity_type, entity_id, action, description, metadata, user_id)
  values (
    'lead',
    v_lead_id,
    case when v_is_new_lead then 'lead_created' else 'inquiry_received' end,
    case
      when v_is_new_lead then 'New lead received from contact form'
      else 'Repeat inquiry received from contact form'
    end,
    jsonb_build_object('inquiry_id', v_inquiry_id, 'source', 'contact_form', 'new_lead', v_is_new_lead),
    null
  );

  return query select v_lead_id, v_inquiry_id, v_is_new_lead;
end;
$$;

comment on function public.create_contact_inquiry(text, text, text, text, text, text, text[], text, text, text) is
  'Atomic entry point for the public contact form: find-or-create the active lead for the submitted email, insert one lead_inquiries row, insert one activity_log row. SECURITY DEFINER — callable only by service_role (see grants below); the public browser never has direct database access. search_path is pinned to '''' and every relation is schema-qualified, per Supabase''s SECURITY DEFINER guidance.';

-- Function privileges: default Postgres behavior is EXECUTE granted to
-- PUBLIC on every new function, which would let anon/authenticated call
-- this directly via RPC and write arbitrary lead data — revoke that
-- explicitly, then grant only to service_role, matching how this project's
-- other SECURITY DEFINER functions (is_active_admin, has_admin_role) are
-- already locked down. anon and authenticated are listed individually,
-- even though revoking from PUBLIC alone is already sufficient (neither
-- role had a separate direct grant) — being explicit here removes any
-- ambiguity for a future reader auditing this function's privileges.
revoke all on function public.create_contact_inquiry(text, text, text, text, text, text, text[], text, text, text) from public;
revoke all on function public.create_contact_inquiry(text, text, text, text, text, text, text[], text, text, text) from anon;
revoke all on function public.create_contact_inquiry(text, text, text, text, text, text, text[], text, text, text) from authenticated;
grant execute on function public.create_contact_inquiry(text, text, text, text, text, text, text[], text, text, text) to service_role;
