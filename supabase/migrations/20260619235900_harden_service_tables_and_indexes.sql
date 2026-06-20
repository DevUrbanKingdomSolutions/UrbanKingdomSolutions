revoke all on function public.current_app_role() from anon;
revoke all on function public.current_client_id() from anon;
revoke all on function public.current_worker_id() from anon;
revoke all on function public.current_promoter_id() from anon;

create index if not exists smtp_routes_client_id_idx on public.smtp_routes (client_id);
create index if not exists smtp_routes_owner_user_id_idx on public.smtp_routes (owner_user_id);
create index if not exists event_access_links_created_by_idx on public.event_access_links (created_by);
create index if not exists access_levels_created_by_idx on public.access_levels (created_by);
create index if not exists app_records_created_by_idx on public.app_records (created_by);
create index if not exists app_records_updated_by_idx on public.app_records (updated_by);
create index if not exists client_reps_client_id_idx on public.client_reps (client_id);
create index if not exists client_reps_auth_user_id_idx on public.client_reps (auth_user_id);

drop policy if exists "Users can read their own role" on public.user_roles;
create policy "Users can read their own role"
on public.user_roles
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "No browser access to SMTP routes" on public.smtp_routes;
create policy "No browser access to SMTP routes"
on public.smtp_routes
for all
to authenticated
using (false)
with check (false);

drop policy if exists "No browser access to event access links" on public.event_access_links;
create policy "No browser access to event access links"
on public.event_access_links
for all
to authenticated
using (false)
with check (false);
