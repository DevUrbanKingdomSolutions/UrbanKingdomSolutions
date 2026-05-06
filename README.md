# Production Crew Database

This is a first working version of a private entertainment production database and user interface.

## What it includes

- Worker directory with roles, contact info, skills, status, emergency contact, and notes.
- Crew/Runner profiles with headshot photos, self-editing, and public-directory opt-outs for phone, email, and headshot.
- Promoter / Production Office profiles with promoter company, local promoter rep, headshot photos, and company grouping.
- Client / Owner can assign Crew / Runner and Production Office access on profiles, including dual access where needed.
- Promoters can see same-company promoter profiles, assigned crew profiles, and leave notes on assigned crew profiles.
- Event manager with event type, production contact, venue, promoter, assigned crew/runners, and notes.
- Dedicated crew time clock with Call Time, Lunch Out, Lunch In, and Wrap buttons.
- Timecards with event, clock-in, lunch-out, lunch-in, wrap, venue, promoter, break minutes, day rates, included hours, additional hourly rates, vehicle rates, estimated pay, notes, and calculated hours.
- Estimated payroll by individual, event, bi-weekly period, and month.
- Venue editor for Client / Owner and Promoter / Production Office access with address, parking, contacts, and load-in notes.
- Promoter contact manager with production and billing notes.
- Crew Directory with Crew, Promoter, and Venue tabs.
- Gig Directory with category tabs for stores and services.
- Crew/Runners can add up to 3 new gig directory categories per calendar year.
- Vehicle rental checks with event, assigned worker, type, plate, gas gauge, scheduled/start/end check, front/back/side/gas/prior-damage photo uploads, and notes.
- Accident reports for physical damage and vehicle damage with event, assigned worker, multiple photo uploads, and details.
- Search across the database.
- JSON export and import for backup or moving data.
- Four access views for planning permissions: Admin, Client, Promoter / Production Office, and Crew / Runner.
- Supabase Auth login with database-backed roles: ADMIN, CLIENT, PROMOTER_PRODUCTION_OFFICE, and CREW.
- Dedicated ADMIN profile, Client Company profile, and Client Rep/My Profile pages.
- First-login invite setup screen for creating a password before entering the app.
- Client-visible profile login fields for login email, login role, Supabase user ID, and sending login setup.
- Admin-visible client login fields for login email, CLIENT role connection, Supabase user ID, and sending client login setup.
- Admin My Profile and Client Rep/My Profile fields for SMTP email routing details, including provider, sender, reply-to, host, port, username, secret reference, security mode, and routing status.
- ADMIN can manage client accounts and system setup without production data, payroll, timecards, crew personal data, promoter records, or reports.
- Production Board for CLIENT and PROMOTER_PRODUCTION_OFFICE to view assigned production details and mark runners Available, On a Run, or At Production Office.
- Hash-based route protection redirects restricted direct links like `#payroll` when the signed-in role cannot access that view.

## How to open it

Open `index.html` in a browser. Supabase is configured in `app.js`; run `supabase-schema.sql` in Supabase SQL Editor, then use `supabase-admin-bootstrap.sql` once with your first admin Auth user ID.

If a user lands on the wrong access page, run `supabase-role-check.sql` in Supabase SQL Editor to confirm that their `user_roles` row has the expected role and client/worker/promoter connection.

The production records are still stored locally in the browser using IndexedDB while the app screens are being finalized. Authentication and roles now come from Supabase so the production tables can move over module by module.

To send real login setup emails, deploy the Supabase Edge Function in `supabase/functions/send-login-setup`. The function uses Supabase's private service role key on the server side, then creates or updates the matching `user_roles` row for Client, Crew, and Production Office users.

SMTP routing fields are stored as configuration metadata. Keep actual SMTP passwords/API keys in Supabase secrets or provider settings, then reference the secret name in the app.

To test ADMIN SMTP settings, deploy `supabase/functions/send-smtp-test` and add the SMTP password/API key as a Supabase Edge Function secret whose name matches the profile's SMTP secret reference exactly. The secret reference should be a simple secret name such as `ADMIN_SMTP_PASSWORD`, not the actual password.

Quick deploy commands for the login setup button:

```bash
supabase login
supabase link --project-ref nnhqrhaltkmymnwxydwr
supabase functions deploy send-login-setup
```

## Important next steps

Next, move payroll, profiles, events, timecards, reports, directories, and vehicle logs into Supabase tables with row-level security policies matching the role rules in `supabase-schema.sql`.
