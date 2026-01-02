/**
 * GET /api/stats - Usage statistics (last 7 days)
 */
export async function onRequestGet(context) {
    const { env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

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

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
