do $$
begin
  create type public.app_role as enum (
    'ADMIN',
    'CLIENT',
    'PROMOTER_PRODUCTION_OFFICE',
    'CREW'
  );
exception
  when duplicate_object then null;
end
$$;

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
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.current_client_id() to authenticated;
grant execute on function public.current_worker_id() to authenticated;
grant execute on function public.current_promoter_id() to authenticated;

-- No recursive SELECT here. Users only read their own role row.
create policy "Users can read their own role"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

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

create policy "Clients can insert crew and promoter login roles"
on public.user_roles
for insert
to authenticated
with check (
  public.current_app_role() = 'CLIENT'
  and client_id = public.current_client_id()
  and role in ('PROMOTER_PRODUCTION_OFFICE', 'CREW')
);

create policy "Clients can update crew and promoter login roles"
on public.user_roles
for update
to authenticated
using (
  public.current_app_role() = 'CLIENT'
  and client_id = public.current_client_id()
  and role in ('PROMOTER_PRODUCTION_OFFICE', 'CREW')
)
with check (
  public.current_app_role() = 'CLIENT'
  and client_id = public.current_client_id()
  and role in ('PROMOTER_PRODUCTION_OFFICE', 'CREW')
);

create policy "Clients can remove crew and promoter login roles"
on public.user_roles
for delete
to authenticated
using (
  public.current_app_role() = 'CLIENT'
  and client_id = public.current_client_id()
  and role in ('PROMOTER_PRODUCTION_OFFICE', 'CREW')
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
  add column if not exists address text;

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
  public.current_app_role() = 'CLIENT'
  and id = public.current_client_id()
);

create policy "Clients can update their client account"
on public.clients
for update
to authenticated
using (
  public.current_app_role() = 'CLIENT'
  and id = public.current_client_id()
)
with check (
  public.current_app_role() = 'CLIENT'
  and id = public.current_client_id()
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

alter table public.client_reps enable row level security;

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

create policy "Admins can read client rep routing setup"
on public.client_reps
for select
to authenticated
using (public.current_app_role() = 'ADMIN');

create policy "Clients can manage reps for their client"
on public.client_reps
for all
to authenticated
using (
  public.current_app_role() = 'CLIENT'
  and client_id = public.current_client_id()
)
with check (
  public.current_app_role() = 'CLIENT'
  and client_id = public.current_client_id()
);

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
