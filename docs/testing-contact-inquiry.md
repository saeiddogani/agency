# Testing `create_contact_inquiry` and the contact form → CRM flow

No database test framework exists in this project yet (per Phase 8 scope, one wasn't added solely for this). These are documented SQL verification steps instead — run them in the Supabase SQL Editor against a real (ideally non-production, e.g. a local `supabase start` instance or a scratch project) database after applying `supabase/migrations/20260804090000_create_contact_inquiry_function.sql`.

Use throwaway addresses like `test+1@example.com` (the `+1` is ignored by most mail providers but makes each one unique) — never real customer data, per Phase 8 §13.

Clean up afterward with:

```sql
delete from lead_inquiries where submitted_email like 'test+%@example.com';
delete from activity_log where entity_id in (select id from leads where email like 'test+%@example.com');
delete from leads where email like 'test+%@example.com';
```

## 1. First submission creates one lead, one inquiry, one activity row

```sql
select * from create_contact_inquiry(
  'Test User', 'test+1@example.com', 'Test Business', '555-0100', '',
  'Home Services', array['New Website'], '$1,000–$2,000', 'ASAP',
  'Testing the contact form flow.'
);
-- expect: is_new_lead = true

select count(*) from leads where email = 'test+1@example.com';                    -- expect 1
select count(*) from lead_inquiries where lead_id = (select id from leads where email = 'test+1@example.com'); -- expect 1
select count(*) from activity_log where entity_id = (select id from leads where email = 'test+1@example.com'); -- expect 1, description = 'New lead received from contact form'
```

## 2. Repeat submission, same normalized email

```sql
select * from create_contact_inquiry(
  'Test User', 'TEST+1@Example.com  ', 'Test Business', '555-0100', '', -- note case + whitespace: still normalizes to the same lead
  'Home Services', array['SEO'], '', '', 'Following up on my last inquiry.'
);
-- expect: is_new_lead = false, lead_id = the SAME id as step 1
```

```sql
select count(*) from leads where email_normalized = 'test+1@example.com';         -- still 1
select count(*) from lead_inquiries where lead_id = (select id from leads where email_normalized = 'test+1@example.com'); -- now 2
select count(*) from activity_log where entity_id = (select id from leads where email_normalized = 'test+1@example.com'); -- now 2, second description = 'Repeat inquiry received from contact form'
```

## 3. Different email creates a separate lead

```sql
select * from create_contact_inquiry(
  'Second User', 'test+2@example.com', 'Second Business', '', '',
  'Real Estate', array['Website Redesign'], '', '', 'A different inquiry entirely.'
);
select count(*) from leads where email = 'test+1@example.com'; -- 1
select count(*) from leads where email = 'test+2@example.com'; -- 1 — two separate leads total
```

## 4. Previously lost/won lead — a new submission creates a NEW lead

The partial unique index only covers `status not in ('won','lost')`, so a closed-out lead doesn't block a fresh one:

```sql
update leads set status = 'lost', lost_reason = 'test' where email = 'test+2@example.com';

select * from create_contact_inquiry(
  'Second User', 'test+2@example.com', 'Second Business', '', '',
  'Real Estate', array['Website Redesign'], '', '', 'Reaching out again after being marked lost.'
);
-- expect: is_new_lead = true, a DIFFERENT lead_id than the lost one

select id, status from leads where email = 'test+2@example.com'; -- now 2 rows: one status='lost', one status='new'
```

## 5. Archived lead — same rule, via `archived_at`

```sql
update leads set archived_at = now() where email = 'test+1@example.com' and status = 'new';

select * from create_contact_inquiry(
  'Test User', 'test+1@example.com', 'Test Business', '', '',
  'Home Services', array['Hosting'], '', '', 'Reaching out again after being archived.'
);
-- expect: is_new_lead = true, a DIFFERENT lead_id than the archived one
```

## 6. Two concurrent submissions produce one active lead, both inquiries preserved

Hard to script deterministically in a single SQL Editor tab (it's a single connection, so statements always run sequentially). To actually exercise the race:

1. Open two SQL Editor tabs (two separate connections).
2. In both, paste the same `select * from create_contact_inquiry('Concurrent Test', 'test+3@example.com', ...)` call, but don't run it yet.
3. Run both within roughly a second of each other (click Run in tab 1, then immediately switch and click Run in tab 2).
4. Check the results: exactly one of the two calls should have `is_new_lead = true`; the other `false`, with both returning the **same** `lead_id`.
5. Verify the end state:
   ```sql
   select count(*) from leads where email = 'test+3@example.com';         -- expect 1 (not 2)
   select count(*) from lead_inquiries where lead_id = (select id from leads where email = 'test+3@example.com'); -- expect 2 (both submissions recorded)
   ```

This relies on Postgres's own row-level locking on the partial unique index during `insert ... on conflict ... do nothing` — not application-level locking — so it holds regardless of which process or server instance issues the two calls.

## 7. Function cannot be executed by `anon` or `authenticated`

Using a Supabase client configured with the **publishable key** (no service role), attempt:

```js
const { error } = await supabase.rpc('create_contact_inquiry', { p_name: 'x', p_email: 'x@example.com', /* ...rest... */ });
```

Expect a permission-denied error (Postgres error code `42501`), both signed out (`anon`) and signed in as an admin (`authenticated`) — this function is `service_role`-only regardless of who's asking. You can also check the grants directly:

```sql
select grantee, privilege_type
from information_schema.role_routine_grants
where routine_name = 'create_contact_inquiry';
-- expect exactly one row: grantee = service_role, privilege_type = EXECUTE
```
