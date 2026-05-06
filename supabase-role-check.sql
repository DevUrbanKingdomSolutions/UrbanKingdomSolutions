-- Use this to confirm a login user has the correct app role.
-- Replace the email with the person who is landing on the wrong access page.

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

-- If the row is missing or has the wrong role, update it from Supabase SQL Editor.
-- CLIENT example:
--
-- insert into public.user_roles (user_id, role, client_id)
-- values (
--   'AUTH_USER_ID_HERE',
--   'CLIENT',
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
