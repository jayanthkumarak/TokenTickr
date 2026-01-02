/**
 * POST /api/log - Log session or comparison event
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

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
            JSON.stringify({ success: false, error: 'Logging failed' }),
            { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
