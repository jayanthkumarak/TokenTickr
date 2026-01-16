const AA_MODELS_URL = 'https://artificialanalysis.ai/api/v2/data/llms/models';

export async function onRequestGet(context) {
    const { request, env } = context;

    const origin = getSameOrigin(request);
    const corsHeaders = buildCorsHeaders(origin, 'GET, OPTIONS');

    if (!origin) {
        return new Response(
            JSON.stringify({ error: 'Origin not allowed' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (!env.AA_API_KEY) {
        return new Response(
            JSON.stringify({ error: 'AA_API_KEY not configured' }),
            { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
    }

    const response = await fetch(AA_MODELS_URL, {
        method: 'GET',
        headers: {
            'x-api-key': env.AA_API_KEY,
            'Content-Type': 'application/json',
        },
    });

    const body = await response.text();

    if (!response.ok) {
        return new Response(body, {
            status: response.status,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    }

    return new Response(body, {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
}

export async function onRequestOptions(context) {
    const origin = getSameOrigin(context.request);
    const corsHeaders = buildCorsHeaders(origin, 'GET, OPTIONS');

    if (!origin) {
        return new Response(null, { status: 403 });
    }

    return new Response(null, { headers: corsHeaders });
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
