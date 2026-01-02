import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

/**
 * TokenTickr Cloudflare Worker
 * 
 * Serves static assets from Next.js export and handles API routes for usage logging.
 * Uses module format to access D1 database binding.
 */

const DEBUG = false;

/**
 * Environment bindings type definition
 * @typedef {Object} Env
 * @property {D1Database} DB - D1 database binding
 * @property {KVNamespace} __STATIC_CONTENT - Static asset KV namespace
 */

/**
 * Handle API routes for usage logging
 * @param {Request} request
 * @param {Env} env
 * @returns {Promise<Response>}
 */
async function handleApiRoute(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS headers for API routes
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // POST /api/log - Log session or comparison event
  if (path === '/api/log' && request.method === 'POST') {
    try {
      const body = await request.json();
      const { session_id, event_type, models } = body;

      // Validate required fields
      if (!session_id || !event_type) {
        return new Response(
          JSON.stringify({ error: 'Missing session_id or event_type' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // Validate event_type
      if (!['session_start', 'comparison'].includes(event_type)) {
        return new Response(
          JSON.stringify({ error: 'Invalid event_type' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      // For comparison events, require at least 2 models
      if (event_type === 'comparison') {
        if (!Array.isArray(models) || models.length < 2) {
          return new Response(
            JSON.stringify({ error: 'Comparison requires at least 2 models' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }
      }

      const userAgent = request.headers.get('User-Agent') || null;
      const referrer = request.headers.get('Referer') || null;
      const createdAt = new Date().toISOString();

      await env.DB.prepare(`
        INSERT INTO usage_logs (session_id, event_type, models, user_agent, referrer, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        session_id,
        event_type,
        models ? JSON.stringify(models) : null,
        userAgent,
        referrer,
        createdAt
      ).run();

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    } catch (error) {
      console.error('Log error:', error);
      // Don't fail the request - logging should be fire-and-forget
      return new Response(
        JSON.stringify({ success: false, error: DEBUG ? error.message : 'Logging failed' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  }

  // GET /api/stats - Basic usage stats (could be protected in production)
  if (path === '/api/stats' && request.method === 'GET') {
    try {
      const stats = await env.DB.prepare(`
        SELECT 
          event_type,
          COUNT(*) as count,
          DATE(created_at) as date
        FROM usage_logs
        WHERE created_at > datetime('now', '-7 days')
        GROUP BY event_type, DATE(created_at)
        ORDER BY date DESC
      `).all();

      return new Response(
        JSON.stringify({ stats: stats.results }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch stats' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  }

  // GET /api/pricing-history/:modelId - Price history for a model
  if (path.startsWith('/api/pricing-history/') && request.method === 'GET') {
    try {
      const modelId = decodeURIComponent(path.replace('/api/pricing-history/', ''));

      const history = await env.DB.prepare(`
        SELECT 
          snapshot_id,
          prompt_price,
          completion_price,
          context_length,
          captured_at
        FROM pricing_snapshots
        WHERE model_id = ?
        ORDER BY captured_at DESC
        LIMIT 5
      `).bind(modelId).all();

      return new Response(
        JSON.stringify({ model_id: modelId, history: history.results }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch pricing history' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  }

  return null; // Not an API route
}

/**
 * Main request handler
 */
async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);

  // Handle API routes first
  if (url.pathname.startsWith('/api/')) {
    const apiResponse = await handleApiRoute(request, env);
    if (apiResponse) return apiResponse;

    // Unknown API route
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Serve static assets
  let options = {};

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      };
    }

    // Create a fake event object for kv-asset-handler compatibility
    const event = {
      request,
      waitUntil: ctx.waitUntil.bind(ctx),
    };

    const page = await getAssetFromKV(event, options);

    const response = new Response(page.body, page);

    // Security headers
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'unsafe-url');
    response.headers.set('Feature-Policy', 'none');

    return response;
  } catch (e) {
    // Try to serve 404.html for not found assets
    if (!DEBUG) {
      try {
        const event = {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        };

        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        });

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 });
      } catch (e) { }
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}

// Module format export for D1 binding access
export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env, ctx);
  },
};