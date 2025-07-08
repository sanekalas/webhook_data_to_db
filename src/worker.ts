export interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Not found', { status: 404 });
    }

    let payload: any;
    try {
      payload = await request.json();
    } catch (err) {
      return new Response('Invalid JSON', { status: 400 });
    }

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/webhook_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_KEY,
        Authorization: `Bearer ${env.SUPABASE_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ payload }),
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(`Supabase error: ${text}`, { status: 500 });
    }

    return new Response('ok');
  },
};
