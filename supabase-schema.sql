do $$
begin
  create type public.app_role as enum (
    'ADMIN',
    'ACCOUNT',
    'ACCOUNTING',
    'CLIENT',
    'PROMOTER',
    'PRODUCTION',
    'PROMOTER_PRODUCTION_OFFICE',
    'CREW'
  );
exception
  when duplicate_object then null;
end
$$;

alter type public.app_role add value if not exists 'ACCOUNT';
alter type public.app_role add value if not exists 'ACCOUNTING';
alter type public.app_role add value if not exists 'PROMOTER';
alter type public.app_role add value if not exists 'PRODUCTION';

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null,
  client_id uuid,
  worker_id text,
  promoter_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

create index if not exists user_roles_client_id_idx on public.user_roles (client_id);
create index if not exists user_roles_worker_id_idx on public.user_roles (worker_id);
create index if not exists user_roles_promoter_id_idx on public.user_roles (promoter_id);

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
  loop
    execute format('drop policy if exists %I on public.user_roles', policy_record.policyname);
  end loop;
end
$$;

create or replace function public.current_app_role()
returns public.app_role
language sql
security definer
stable
set search_path = public
as $$
  select role
  from public.user_roles
  where user_id = auth.uid()
  limit 1
$$;

create or replace function public.current_client_id()
returns uuid
language sql
security definer
stable
set search_path = public
as $$
  select client_id
  from public.user_roles
  where user_id = auth.uid()
  limit 1
$$;

create or replace function public.current_worker_id()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select worker_id
  from public.user_roles
  where user_id = auth.uid()
  limit 1
$$;

create or replace function public.current_promoter_id()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select promoter_id
  from public.user_roles
  where user_id = auth.uid()
  limit 1
$$;

revoke all on function public.current_app_role() from public;
revoke all on function public.current_client_id() from public;
revoke all on function public.current_worker_id() from public;
revoke all on function public.current_promoter_id() from public;
revoke all on function public.current_app_role() from anon;
revoke all on function public.current_client_id() from anon;
revoke all on function public.current_worker_id() from anon;
revoke all on function public.current_promoter_id() from anon;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.current_client_id() to authenticated;
grant execute on function public.current_worker_id() to authenticated;
grant execute on function public.current_promoter_id() to authenticated;

-- No recursive SELECT here. Users only read their own role row.
create policy "Users can read their own role"
on public.user_roles
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Admins can read user roles"
on public.user_roles
for select
to authenticated
using (public.current_app_role() = 'ADMIN');

-- Role management uses SECURITY DEFINER helper lookup, avoiding user_roles recursion.
-- The first ADMIN row must be inserted from Supabase SQL Editor or a trusted
-- service-role backend because no authenticated user is an ADMIN yet.
create policy "Admins can insert user roles"
on public.user_roles
for insert
to authenticated
with check (public.current_app_role() = 'ADMIN');

create policy "Admins can update user roles"
on public.user_roles
for update
to authenticated
using (public.current_app_role() = 'ADMIN')
with check (public.current_app_role() = 'ADMIN');

create policy "Admins can delete user roles"
on public.user_roles
for delete
to authenticated
using (public.current_app_role() = 'ADMIN');

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

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  email text,
  phone text,
  status text not null default 'Active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.clients
  add column if not exists company_type text,
  add column if not exists package_layouts text[] not null default array['LOCAL_PRODUCTION_SERVICES']::text[],
  add column if not exists address text,
  add column if not exists default_day_rate numeric,
  add column if not exists default_included_hours numeric,
  add column if not exists default_additional_rate numeric,
  add column if not exists default_rented_vehicle_rate numeric,
  add column if not exists default_personal_vehicle_rate numeric;

alter table public.clients enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'clients'
  loop
    execute format('drop policy if exists %I on public.clients', policy_record.policyname);
  end loop;
end
$$;

-- ADMIN can manage technical client setup records, but should not be granted
-- production module table access in future policies.
create policy "Admins can manage technical client setup"
on public.clients
for all
to authenticated
using (public.current_app_role() = 'ADMIN')
with check (public.current_app_role() = 'ADMIN');

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

create table if not exists public.access_levels (
  id text primary key,
  name text not null,
  base_role public.app_role not null,
  views jsonb not null default '[]'::jsonb,
  description text,
  status text not null default 'Active',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists access_levels_created_by_idx on public.access_levels (created_by);

alter table public.access_levels enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'access_levels'
  loop
    execute format('drop policy if exists %I on public.access_levels', policy_record.policyname);
  end loop;
end
$$;

create policy "Admins can manage access levels"
on public.access_levels
for all
to authenticated
using (public.current_app_role() = 'ADMIN')
with check (public.current_app_role() = 'ADMIN');

create policy "Clients can read active access levels"
on public.access_levels
for select
to authenticated
using (
  public.current_app_role()::text in ('ACCOUNT', 'CLIENT', 'ACCOUNTING')
  and status = 'Active'
);

create policy "Production office can read production access levels"
on public.access_levels
for select
to authenticated
using (
  public.current_app_role() in ('PROMOTER', 'PROMOTER_PRODUCTION_OFFICE')
  and status = 'Active'
  and base_role in ('PROMOTER', 'PROMOTER_PRODUCTION_OFFICE')
);

create table if not exists public.client_reps (
  id text primary key,
  client_id uuid not null references public.clients(id) on delete cascade,
  auth_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  title text,
  email text,
  phone text,
  mailing_address text,
  smtp_provider text,
  smtp_from_name text,
  smtp_from_email text,
  smtp_reply_to text,
  smtp_host text,
  smtp_port text,
  smtp_username text,
  smtp_secret_ref text,
  smtp_secure text,
  email_routing_status text not null default 'Not configured',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_reps_client_id_idx on public.client_reps (client_id);
create index if not exists client_reps_auth_user_id_idx on public.client_reps (auth_user_id);

alter table public.client_reps enable row level security;

alter table public.client_reps
  add column if not exists access_levels text[] not null default array['CLIENT_REP']::text[];

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'client_reps'
  loop
    execute format('drop policy if exists %I on public.client_reps', policy_record.policyname);
  end loop;
end
$$;

create policy "Admins can manage client rep setup"
on public.client_reps
for all
to authenticated
using (public.current_app_role() = 'ADMIN')
with check (public.current_app_role() = 'ADMIN');

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

create table if not exists public.smtp_routes (
  id text primary key,
  scope text not null,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  profile_id text,
  provider text,
  from_name text,
  from_email text,
  reply_to text,
  host text,
  port text,
  username text,
  secure_mode text,
  encrypted_password text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists smtp_routes_client_id_idx on public.smtp_routes (client_id);
create index if not exists smtp_routes_owner_user_id_idx on public.smtp_routes (owner_user_id);

alter table public.smtp_routes enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'smtp_routes'
  loop
    execute format('drop policy if exists %I on public.smtp_routes', policy_record.policyname);
  end loop;
end
$$;

-- SMTP passwords are written/read only by Edge Functions using the service role.
-- The browser app never selects this table directly.
create policy "No browser access to SMTP routes"
on public.smtp_routes
for all
to authenticated
using (false)
with check (false);

create table if not exists public.event_access_links (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  client_id uuid references public.clients(id) on delete cascade,
  event_id text not null,
  promoter_id text,
  created_by uuid references auth.users(id) on delete set null,
  recipient_email text,
  recipient_name text,
  notes text,
  snapshot jsonb not null default '{}'::jsonb,
  status text not null default 'Active',
  expires_at timestamptz,
  last_opened_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists event_access_links_token_hash_idx on public.event_access_links (token_hash);
create index if not exists event_access_links_event_id_idx on public.event_access_links (event_id);
create index if not exists event_access_links_client_id_idx on public.event_access_links (client_id);
create index if not exists event_access_links_created_by_idx on public.event_access_links (created_by);

alter table public.event_access_links enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'event_access_links'
  loop
    execute format('drop policy if exists %I on public.event_access_links', policy_record.policyname);
  end loop;
end
$$;

-- Event links are created/read by Edge Functions using the service role.
-- Public visitors only receive data after presenting the secure token.
create policy "No browser access to event access links"
on public.event_access_links
for all
to authenticated
using (false)
with check (false);

-- Future production tables should use the helper functions above instead of
-- directly querying user_roles inside policies.
--
-- Suggested policy shape:
-- CLIENT:
--   full access to rows where table.client_id = public.current_client_id()
--
-- ADMIN:
--   no access to sensitive production module tables by default
--   only system/configuration/user-management tables should allow ADMIN
--
-- PROMOTER_PRODUCTION_OFFICE:
--   access only rows linked to public.current_promoter_id(), assigned events,
--   or production-office scoped records
--
-- CREW:
--   access only their own profile, assigned events/gigs, their own submitted
--   timecards, and their own vehicle/report records via public.current_worker_id()

create table if not exists public.app_records (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  store_name text not null,
  record_id text not null,
  data jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, store_name, record_id)
);

create index if not exists app_records_created_by_idx on public.app_records (created_by);
create index if not exists app_records_updated_by_idx on public.app_records (updated_by);

alter table public.app_records enable row level security;

create index if not exists app_records_client_store_idx on public.app_records (client_id, store_name);
create index if not exists app_records_data_gin_idx on public.app_records using gin (data);

grant select, insert, update, delete on public.app_records to authenticated;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'app_records'
  loop
    execute format('drop policy if exists %I on public.app_records', policy_record.policyname);
  end loop;
end
$$;

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

create policy "Promoters can read shared production records"
on public.app_records
for select
to authenticated
using (
  public.current_app_role() in ('PROMOTER', 'PROMOTER_PRODUCTION_OFFICE')
  and client_id = public.current_client_id()
  and store_name in ('workers', 'venues', 'promoters', 'events', 'eventAssignments', 'vehicleLogs', 'accidentReports', 'runnerStops', 'runnerCategories', 'runnerNotes', 'venueContacts', 'productionCompanies', 'productionContacts', 'messageThreadSettings')
);

create policy "Promoters can manage event operations records"
on public.app_records
for all
to authenticated
using (
  public.current_app_role() in ('PROMOTER', 'PROMOTER_PRODUCTION_OFFICE')
  and client_id = public.current_client_id()
  and store_name in ('venues', 'events', 'eventAssignments', 'vehicleLogs', 'accidentReports', 'runnerStops', 'runnerCategories', 'runnerNotes', 'venueContacts', 'productionCompanies', 'productionContacts', 'messageThreadSettings')
)
with check (
  public.current_app_role() in ('PROMOTER', 'PROMOTER_PRODUCTION_OFFICE')
  and client_id = public.current_client_id()
  and store_name in ('venues', 'events', 'eventAssignments', 'vehicleLogs', 'accidentReports', 'runnerStops', 'runnerCategories', 'runnerNotes', 'venueContacts', 'productionCompanies', 'productionContacts', 'messageThreadSettings')
);

create policy "Production teams can read linked production records"
on public.app_records
for select
to authenticated
using (
  public.current_app_role() = 'PRODUCTION'
  and client_id = public.current_client_id()
  and store_name in ('workers', 'venues', 'promoters', 'events', 'eventAssignments', 'vehicleLogs', 'accidentReports', 'runnerStops', 'runnerCategories', 'runnerNotes', 'venueContacts', 'productionCompanies', 'productionContacts', 'messageThreadSettings')
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

create policy "Crew can read their shared work records"
on public.app_records
for select
to authenticated
using (
  public.current_app_role() = 'CREW'
  and client_id = public.current_client_id()
  and (
    store_name in ('venues', 'runnerStops', 'runnerCategories', 'runnerNotes')
    or (store_name = 'workers' and record_id = public.current_worker_id())
    or (store_name = 'events' and coalesce(data -> 'workerIds', '[]'::jsonb) ? public.current_worker_id())
    or (store_name in ('eventAssignments', 'timecards', 'vehicleLogs', 'accidentReports') and data ->> 'workerId' = public.current_worker_id())
  )
);

create policy "Crew can manage their submitted app records"
on public.app_records
for all
to authenticated
using (
  public.current_app_role() = 'CREW'
  and client_id = public.current_client_id()
  and (
    (store_name = 'workers' and record_id = public.current_worker_id())
    or (store_name in ('timecards', 'vehicleLogs', 'accidentReports') and data ->> 'workerId' = public.current_worker_id())
    or store_name in ('runnerCategories', 'runnerNotes')
  )
)
with check (
  public.current_app_role() = 'CREW'
  and client_id = public.current_client_id()
  and (
    (store_name = 'workers' and record_id = public.current_worker_id())
    or (store_name in ('timecards', 'vehicleLogs', 'accidentReports') and data ->> 'workerId' = public.current_worker_id())
    or store_name in ('runnerCategories', 'runnerNotes')
  )
);
