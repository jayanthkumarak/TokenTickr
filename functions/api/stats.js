/**
 * GET /api/stats - Usage statistics (last 7 days)
 */
export async function onRequestGet(context) {
    const { env, request } = context;

    const origin = getSameOrigin(request);
    const corsHeaders = buildCorsHeaders(origin, 'GET, OPTIONS');

    if (!origin) {
        return new Response(
            JSON.stringify({ error: 'Origin not allowed' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

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

export async function onRequestOptions(context) {
    const origin = getSameOrigin(context.request);
    const corsHeaders = buildCorsHeaders(origin, 'GET, OPTIONS');

    if (!origin) {
        return new Response(null, { status: 403 });
    }
    return new Response(null, {
        headers: corsHeaders,
    });
}

function getSameOrigin(request) {
    const requestOrigin = new URL(request.url).origin;
    const originHeader = request.headers.get('Origin');
    if (originHeader && originHeader === requestOrigin) {
        return originHeader;
    }
    const referer = request.headers.get('Referer');
    if (referer) {
        try {
            const refererOrigin = new URL(referer).origin;
            return refererOrigin === requestOrigin ? refererOrigin : null;
        } catch {
            return null;
        }
    }
    return null;
}

function buildCorsHeaders(origin, methods) {
    const headers = {
        'Access-Control-Allow-Methods': methods,
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (origin) {
        headers['Access-Control-Allow-Origin'] = origin;
    }
    return headers;
}
