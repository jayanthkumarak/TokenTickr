/**
 * GET /api/pricing-history/[modelId] - Price history for a model
 */
export async function onRequestGet(context) {
    const { env, params, request } = context;
    const modelId = decodeURIComponent(params.modelId);

    const origin = getSameOrigin(request);
    const corsHeaders = buildCorsHeaders(origin, 'GET, OPTIONS');

    if (!origin) {
        return new Response(
            JSON.stringify({ error: 'Origin not allowed' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (!isValidModelId(modelId)) {
        return new Response(
            JSON.stringify({ error: 'Invalid model id' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
    }

    try {
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

function isValidModelId(value) {
    if (typeof value !== 'string') return false;
    if (value.length === 0 || value.length > 200) return false;
    return /^[a-zA-Z0-9._\\/-]+$/.test(value);
}
