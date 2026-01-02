/**
 * GET /api/pricing-history/[modelId] - Price history for a model
 */
export async function onRequestGet(context) {
    const { env, params } = context;
    const modelId = decodeURIComponent(params.modelId);

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

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

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
