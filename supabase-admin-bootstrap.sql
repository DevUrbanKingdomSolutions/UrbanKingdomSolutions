-- One-time ADMIN bootstrap.
-- Replace the user_id below with the Auth user ID from Supabase:
-- Supabase Dashboard > Authentication > Users > select the admin user > copy User UID.

insert into public.user_roles (user_id, role)
values ('00000000-0000-0000-0000-000000000000', 'ADMIN')
on conflict (user_id)
do update set
  role = excluded.role,
  updated_at = now();
