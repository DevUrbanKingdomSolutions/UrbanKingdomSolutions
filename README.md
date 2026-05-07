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
- Access views for planning permissions: Admin, Client Admin, Client Rep, Promoter Admin, Promoter Rep, Production Team Access, and Crew / Runner.
- Supabase Auth login with database-backed base roles: ADMIN, CLIENT, PROMOTER, CREW, and PRODUCTION, with app-level access levels layered on top. Legacy PROMOTER_PRODUCTION_OFFICE rows are still understood during migration.
- Dedicated ADMIN profile, Client Company profile, and Client Rep/My Profile pages.
- First-login invite setup screen for creating a password before entering the app.
- Client-visible profile login fields for login email, access level selection, Supabase user ID, and sending login setup.
- Admin-visible client login fields for login email, CLIENT ADMIN role connection, Supabase user ID, and sending client login setup.
- Admin My Profile, Client Rep/My Profile, and Promoter Profile fields for SMTP email routing details, including provider, sender, reply-to, host, port, username, app password/key capture, security mode, and routing status.
- Admin-managed access levels with selectable app pages, backed by Supabase.
- Event-specific production team links that can be sent by email and opened without a full login.
- ADMIN can manage client accounts and system setup without production data, payroll, timecards, crew personal data, promoter records, or reports.
- Production Board for Client Admin, Client Rep, Promoter Admin, Promoter Rep, and Production Team Access to view assigned production details and mark runners Available, On a Run, or At Production Office.
- Hash-based route protection redirects restricted direct links like `#payroll` when the signed-in role cannot access that view.

## How to open it

Open `index.html` in a browser. Supabase is configured in `app.js`; run `supabase-schema.sql` in Supabase SQL Editor, then use `supabase-admin-bootstrap.sql` once with your first admin Auth user ID.

If a user lands on the wrong access page, run `supabase-role-check.sql` in Supabase SQL Editor to confirm that their `user_roles` row has the expected role and client/worker/promoter connection.

The production records are still stored locally in the browser using IndexedDB while the app screens are being finalized. Authentication and roles now come from Supabase so the production tables can move over module by module.

The app uses these Supabase Edge Functions:

- `send-login-setup`: sends Auth invite/setup emails through saved SMTP routing.
- `send-smtp-test`: sends an SMTP test email.
- `save-smtp-route`: encrypts and saves SMTP app passwords/API keys entered in the UI.
- `create-event-access-link`: creates and optionally emails event-specific production team links.
- `public-event-access`: loads public event-link data and updates runner status for that event.
- `user-access-management`: lists scoped login users and lets ADMIN delete non-admin login accounts.
- `send-rental-photo-notification`: sends rental vehicle photo reminder and urgent follow-up emails.
- `trigger-novu-notification`: triggers Novu workflows from the app without exposing the Novu secret key.

Run `supabase-schema.sql` in Supabase SQL Editor before testing backend-backed settings. The project needs these Supabase secrets:

- `SMTP_ENCRYPTION_KEY`: one permanent encryption key for saved SMTP passwords/API keys.
- `PUBLIC_SITE_URL`: deployed app URL, for example `https://the-entertaintainment-dashboard.vercel.app`.
- `NOVU_SECRET_KEY`: Novu secret key for server-side workflow triggers.

Sendbird setup:

- Add the Sendbird Application ID to `SENDBIRD_APP_ID` in `app.js`.
- Keep Sendbird API tokens and user access-token generation server-side before production messaging rollout.

Quick deploy commands for all Edge Functions:

```bash
supabase login
supabase link --project-ref nnhqrhaltkmymnwxydwr
supabase functions deploy save-smtp-route
supabase functions deploy send-login-setup
supabase functions deploy send-smtp-test
supabase functions deploy create-event-access-link
supabase functions deploy public-event-access
supabase functions deploy user-access-management
supabase functions deploy send-rental-photo-notification
supabase functions deploy trigger-novu-notification
```

## Important next steps

Next, move payroll, profiles, events, timecards, reports, directories, and vehicle logs into Supabase tables with row-level security policies matching the role rules in `supabase-schema.sql`.
