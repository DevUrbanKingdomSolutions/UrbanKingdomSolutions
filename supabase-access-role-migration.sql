-- V1.01.012 security foundation update.
-- Run these in Supabase SQL Editor before using the newer base roles.

alter type public.app_role add value if not exists 'ACCOUNT';
alter type public.app_role add value if not exists 'ACCOUNTING';
alter type public.app_role add value if not exists 'PROMOTER';
alter type public.app_role add value if not exists 'PRODUCTION';

alter table public.client_reps
  add column if not exists access_levels text[] not null default array['CLIENT_REP']::text[];

-- Optional cleanup after the enum values exist:
-- update public.user_roles
-- set role = 'PROMOTER'
-- where role = 'PROMOTER_PRODUCTION_OFFICE';
