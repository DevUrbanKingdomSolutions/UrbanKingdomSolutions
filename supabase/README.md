# Supabase Setup

## Deploy Edge Functions

The app uses seven Supabase Edge Functions:

- `send-login-setup`
- `send-smtp-test`
- `save-smtp-route`
- `create-event-access-link`
- `public-event-access`
- `user-access-management`
- `send-rental-photo-notification`

Run this from the project folder after installing the Supabase CLI and logging in:

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
```

The hosted Edge Function uses Supabase's private service role key on Supabase's server side. Do not place the service role key in `app.js`, `index.html`, Vercel environment variables exposed to the browser, or GitHub.

Required Supabase secrets:

- `SMTP_ENCRYPTION_KEY`
- `PUBLIC_SITE_URL`

After deployment:

1. Log in as `ADMIN` to send login setup to a new `CLIENT`.
2. Log in as `CLIENT` to send login setup to `CREW` and `PROMOTER_PRODUCTION_OFFICE`.
3. The profile's Supabase user ID will fill in after Supabase returns the invited user.

## Test SMTP

SMTP app passwords/API keys are entered from the Admin, Client Rep, or Promoter SMTP settings UI. The `save-smtp-route` function encrypts and stores them in Supabase using `SMTP_ENCRYPTION_KEY`.
