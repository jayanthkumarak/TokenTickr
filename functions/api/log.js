/**
 * POST /api/log - Log session or comparison event
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    const origin = getSameOrigin(request);
    const corsHeaders = buildCorsHeaders(origin, 'GET, POST, OPTIONS');

    if (!origin) {
        return new Response(
            JSON.stringify({ error: 'Origin not allowed' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (!isJsonRequest(request)) {
        return new Response(
            JSON.stringify({ error: 'Content-Type must be application/json' }),
            { status: 415, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
    }

    try {
        const body = await request.json();
        const { session_id, event_type, models } = body;

        const sessionId = typeof session_id === 'string' ? session_id.trim() : '';
        const eventType = typeof event_type === 'string' ? event_type.trim() : '';

        // Validate required fields
        if (!sessionId || !eventType) {
            return new Response(
                JSON.stringify({ error: 'Missing session_id or event_type' }),
                { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
        }

        // Validate event_type
        if (!['session_start', 'comparison'].includes(eventType)) {
            return new Response(
                JSON.stringify({ error: 'Invalid event_type' }),
                { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
        }

        // For comparison events, require at least 2 models
        if (eventType === 'comparison') {
            if (!Array.isArray(models) || models.length < 2 || models.length > MAX_MODELS) {
                return new Response(
                    JSON.stringify({ error: 'Comparison requires at least 2 models' }),
                    { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
                );
            }
            if (!models.every(model => isValidId(model, MAX_MODEL_ID_LENGTH))) {
                return new Response(
                    JSON.stringify({ error: 'Invalid model id in comparison' }),
                    { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
                );
            }
        }

        if (!isValidId(sessionId, MAX_SESSION_ID_LENGTH)) {
            return new Response(
                JSON.stringify({ error: 'Invalid session_id' }),
                { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
        }

        const userAgent = limitHeader(request.headers.get('User-Agent'), MAX_USER_AGENT_LENGTH);
        const referrer = limitHeader(request.headers.get('Referer'), MAX_REFERRER_LENGTH);
        const createdAt = new Date().toISOString();

        await env.DB.prepare(`
      INSERT INTO usage_logs (session_id, event_type, models, user_agent, referrer, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
            sessionId,
            eventType,
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
            JSON.stringify({ success: false, error: 'Logging failed' }),
            { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
    }
}

export async function onRequestOptions(context) {
    const origin = getSameOrigin(context.request);
    const corsHeaders = buildCorsHeaders(origin, 'GET, POST, OPTIONS');

    if (!origin) {
        return new Response(null, { status: 403 });
    }
    return new Response(null, {
        headers: corsHeaders,
    });
}

const MAX_SESSION_ID_LENGTH = 128;
const MAX_MODEL_ID_LENGTH = 200;
const MAX_USER_AGENT_LENGTH = 256;
const MAX_REFERRER_LENGTH = 512;
const MAX_MODELS = 10;

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

function isJsonRequest(request) {
    const contentType = request.headers.get('Content-Type') || '';
    return contentType.includes('application/json');
}

function isValidId(value, maxLength) {
    if (typeof value !== 'string') return false;
    if (value.length === 0 || value.length > maxLength) return false;
    return /^[a-zA-Z0-9._\\/-]+$/.test(value);
}

function limitHeader(value, maxLength) {
    if (!value) return null;
    return value.slice(0, maxLength);
}
