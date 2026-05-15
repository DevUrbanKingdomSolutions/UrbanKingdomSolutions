-- Use this to confirm a login user has the correct app role.
-- Replace the email with the person who is landing on the wrong access page,
-- or replace the Supabase user ID if the app shows one in its login error.

select
  users.id as auth_user_id,
  users.email,
  roles.role,
  roles.client_id,
  roles.worker_id,
  roles.promoter_id
from auth.users users
left join public.user_roles roles on roles.user_id = users.id
where users.email = 'person@example.com';

select
  users.id as auth_user_id,
  users.email,
  roles.role,
  roles.client_id,
  roles.worker_id,
  roles.promoter_id
from auth.users users
left join public.user_roles roles on roles.user_id = users.id
where users.id = '1d8762d1-5e41-4979-85a2-d75941653492';

select *
from public.user_roles
where user_id = '1d8762d1-5e41-4979-85a2-d75941653492';

-- If the row is missing or has the wrong role, update it from Supabase SQL Editor.
-- CLIENT example:
--
-- insert into public.user_roles (user_id, role, client_id)
-- values (
--   'AUTH_USER_ID_HERE',
--   'ACCOUNT',
--   'CLIENT_ID_HERE'
-- )
-- on conflict (user_id) do update
-- set role = excluded.role,
--     client_id = excluded.client_id,
--     worker_id = null,
--     promoter_id = null,
--     updated_at = now();
--
-- ADMIN example:
--
-- insert into public.user_roles (user_id, role)
-- values ('AUTH_USER_ID_HERE', 'ADMIN')
-- on conflict (user_id) do update
-- set role = excluded.role,
--     client_id = null,
--     worker_id = null,
--     promoter_id = null,
--     updated_at = now();
