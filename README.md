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
- Three access views for planning permissions: Client / Owner, Promoter / Production Office, and Crew / Runner.

## How to open it

Open `index.html` in a browser. The data is stored in the browser using IndexedDB, so it persists on the same computer and browser.

## Important next steps

For one-company internal use, this is a good local prototype. The access view selectors are planning tools, not real security, because there is no login yet. For multiple people sharing the same live data, the next version should move the database to AppSheet, PostgreSQL, or Supabase and add user accounts, permissions, audit logs, and cloud backups.
