# Supabase Setup

## Make the Send Login Setup button live

The app button calls the Edge Function at `supabase/functions/send-login-setup`.

Run this from the project folder after installing the Supabase CLI and logging in:

```bash
supabase login
supabase link --project-ref nnhqrhaltkmymnwxydwr
supabase functions deploy send-login-setup
```

The hosted Edge Function uses Supabase's private service role key on Supabase's server side. Do not place the service role key in `app.js`, `index.html`, Vercel environment variables exposed to the browser, or GitHub.

After deployment:

1. Log in as `ADMIN` to send login setup to a new `CLIENT`.
2. Log in as `CLIENT` to send login setup to `CREW` and `PROMOTER_PRODUCTION_OFFICE`.
3. The profile's Supabase user ID will fill in after Supabase returns the invited user.
