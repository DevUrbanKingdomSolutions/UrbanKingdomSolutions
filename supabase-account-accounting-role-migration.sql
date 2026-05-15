-- V1.06 account/accounting role foundation and repair.
-- Run this in Supabase SQL Editor if Account Owner saves show either:
-- Invalid input value for enum app_role: "ACCOUNT"
-- new row violates row-level security policy for table "user_roles"

alter type public.app_role add value if not exists 'ACCOUNT';
alter type public.app_role add value if not exists 'ACCOUNTING';

drop policy if exists "Admins can read user roles" on public.user_roles;

create policy "Admins can read user roles"
on public.user_roles
for select
to authenticated
using (public.current_app_role() = 'ADMIN');

-- Recreate user role policies so ACCOUNT can manage scoped account users,
-- while system ADMIN remains the only role that can create other ACCOUNT owners.
drop policy if exists "Clients can insert scoped login roles" on public.user_roles;
drop policy if exists "Clients can update scoped login roles" on public.user_roles;
drop policy if exists "Clients can remove scoped login roles" on public.user_roles;

create policy "Clients can insert scoped login roles"
on public.user_roles
for insert
to authenticated
with check (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
  and role::text in ('ACCOUNTING', 'CLIENT', 'PROMOTER', 'PRODUCTION', 'PROMOTER_PRODUCTION_OFFICE', 'CREW')
);

create policy "Clients can update scoped login roles"
on public.user_roles
for update
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
  and role::text in ('ACCOUNTING', 'CLIENT', 'PROMOTER', 'PRODUCTION', 'PROMOTER_PRODUCTION_OFFICE', 'CREW')
)
with check (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
  and role::text in ('ACCOUNTING', 'CLIENT', 'PROMOTER', 'PRODUCTION', 'PROMOTER_PRODUCTION_OFFICE', 'CREW')
);

create policy "Clients can remove scoped login roles"
on public.user_roles
for delete
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
  and role::text in ('ACCOUNTING', 'CLIENT', 'PROMOTER', 'PRODUCTION', 'PROMOTER_PRODUCTION_OFFICE', 'CREW')
);

drop policy if exists "Clients can read their client account" on public.clients;
drop policy if exists "Clients can update their client account" on public.clients;

create policy "Clients can read their client account"
on public.clients
for select
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and id = public.current_client_id()
);

create policy "Clients can update their client account"
on public.clients
for update
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and id = public.current_client_id()
)
with check (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and id = public.current_client_id()
);

drop policy if exists "Clients can read active access levels" on public.access_levels;

create policy "Clients can read active access levels"
on public.access_levels
for select
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT', 'ACCOUNTING')
  and status = 'Active'
);

drop policy if exists "Clients can manage reps for their client" on public.client_reps;
drop policy if exists "Accounting can read reps for their client" on public.client_reps;

create policy "Clients can manage reps for their client"
on public.client_reps
for all
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
)
with check (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
);

create policy "Accounting can read reps for their client"
on public.client_reps
for select
to authenticated
using (
  public.current_app_role()::text = 'ACCOUNTING'
  and client_id = public.current_client_id()
);

drop policy if exists "Clients can manage shared app records" on public.app_records;
drop policy if exists "Accounting can read financial app records" on public.app_records;
drop policy if exists "Client users can manage shared notification records" on public.app_records;

create policy "Clients can manage shared app records"
on public.app_records
for all
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
)
with check (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT')
  and client_id = public.current_client_id()
);

create policy "Accounting can read financial app records"
on public.app_records
for select
to authenticated
using (
  public.current_app_role()::text = 'ACCOUNTING'
  and client_id = public.current_client_id()
  and store_name in ('events', 'workers', 'timecards', 'vehicleLogs', 'accidentReports', 'appNotifications', 'messageThreadSettings')
);

create policy "Client users can manage shared notification records"
on public.app_records
for all
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'ACCOUNTING', 'CLIENT', 'PROMOTER', 'PROMOTER_PRODUCTION_OFFICE', 'PRODUCTION', 'CREW')
  and client_id = public.current_client_id()
  and store_name = 'appNotifications'
)
with check (
  public.current_app_role()::text in ('ACCOUNT', 'ACCOUNTING', 'CLIENT', 'PROMOTER', 'PROMOTER_PRODUCTION_OFFICE', 'PRODUCTION', 'CREW')
  and client_id = public.current_client_id()
  and store_name = 'appNotifications'
);
