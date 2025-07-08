# Webhook Worker

This Cloudflare Worker receives webhook events from the subscription service and stores the raw JSON payloads in Supabase.

## Setup

1. Set up a table named `webhook_events` in your Supabase database. The table should contain at least one JSONB column called `payload` to store the webhook payload.
2. Provide `SUPABASE_URL` and `SUPABASE_KEY` to the worker. These can be defined in `wrangler.toml` or set as secrets using `wrangler secret put`.
3. Deploy the worker using [`wrangler`](https://developers.cloudflare.com/workers/wrangler/).

```bash
wrangler deploy
```

The worker accepts `POST` requests at the root path and inserts the received JSON body into Supabase.
