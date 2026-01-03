export interface ModelEval {
    elo: number;    // LMSYS Arena Elo or normalized Intelligence Index
    mmlu?: number;  // Approx MMLU (0-100)
    source: 'lmsys' | 'estimated' | 'heuristic' | 'artificial-analysis' | 'static-override';
    lastUpdated: string;
    /** Optional: raw AA Intelligence Index (0-100) */
    intelligenceIndex?: number;
}

/**
 * LMSYS Chatbot Arena Elo Scores
 * 
 * Data Sources:
 * - 'lmsys': Verified from LMSYS Chatbot Arena leaderboard (https://chat.lmsys.org)
 * - 'estimated': Educated guess based on model family and capabilities
 * - 'heuristic': Calculated from price, parameter count, and model characteristics
 * 
 * Last full sync: December 23, 2025
 * Reference: https://openlm.ai/chatbot-arena-leaderboard
 */

// Calibration (December 2025)
// SOTA Ceiling: ~1500 (Gemini 3 Pro)
// High Tier: ~1460+ (GPT-5.2, Opus 4.5, Grok 4)
// Mid Tier: ~1350-1450 (GPT-4o, Sonnet 3.5)
// Entry Tier: ~1100-1250 (GPT-3.5, older models)

export const MODEL_EVALS: Record<string, ModelEval> = {
    // === VERIFIED LMSYS ARENA (December 2025) ===

    // Frontier Tier (1460+)
    'google/gemini-3-pro': { elo: 1492, source: 'lmsys', lastUpdated: '2025-12-23' },
    'google/gemini-3-pro-preview': { elo: 1492, source: 'lmsys', lastUpdated: '2025-12-23' },
    'xai/grok-4.1-thinking': { elo: 1482, source: 'lmsys', lastUpdated: '2025-12-23' },
    'google/gemini-3-flash': { elo: 1470, source: 'lmsys', lastUpdated: '2025-12-23' },
    'anthropic/claude-opus-4.5-thinking': { elo: 1466, source: 'lmsys', lastUpdated: '2025-12-23' },
    'openai/gpt-5.2-high': { elo: 1465, source: 'lmsys', lastUpdated: '2025-12-23' },
    'openai/gpt-5.1-high': { elo: 1464, source: 'lmsys', lastUpdated: '2025-12-23' },
    'openai/gpt-5.2': { elo: 1464, source: 'lmsys', lastUpdated: '2025-12-23' },
    'xai/grok-4.1': { elo: 1463, source: 'lmsys', lastUpdated: '2025-12-23' },
    'xai/grok-4': { elo: 1463, source: 'lmsys', lastUpdated: '2025-12-23' },
    'anthropic/claude-opus-4.5': { elo: 1485, source: 'static-override', lastUpdated: '2026-01' }, // Override bad AA data (was ~1329)
    'google/gemini-2.5-pro': { elo: 1460, source: 'lmsys', lastUpdated: '2025-12-23' },

    // Pro Tier (1350-1459)
    'anthropic/claude-sonnet-4.5': { elo: 1475, source: 'static-override', lastUpdated: '2026-01' }, // Override potential missing data
    'anthropic/claude-3.5-sonnet': { elo: 1293, source: 'lmsys', lastUpdated: '2024-12' }, // Updated from stale 1271
    'xai/grok-4.1-fast': { elo: 1450, source: 'estimated', lastUpdated: '2026-01' }, // Estimated placement
    'google/gemini-exp-1114': { elo: 1360, source: 'lmsys', lastUpdated: '2025-12' },
    'openai/gpt-4o': { elo: 1287, source: 'lmsys', lastUpdated: '2024-05' },
    'openai/gpt-4o-mini': { elo: 1270, source: 'lmsys', lastUpdated: '2024-07' },
    'meta-llama/llama-3.1-405b-instruct': { elo: 1260, source: 'lmsys', lastUpdated: '2024-07' },
    'google/gemini-pro-1.5': { elo: 1260, source: 'lmsys', lastUpdated: '2025-12' },
    'openai/gpt-4-turbo': { elo: 1255, source: 'lmsys', lastUpdated: '2024-04' },
    'deepseek/deepseek-chat': { elo: 1250, source: 'estimated', lastUpdated: '2024-06' },
    'nousresearch/hermes-3-llama-3.1-405b': { elo: 1250, source: 'estimated', lastUpdated: '2024-08' },
    'anthropic/claude-3-opus': { elo: 1248, source: 'lmsys', lastUpdated: '2024-03' },
    'deepseek/deepseek-coder': { elo: 1240, source: 'estimated', lastUpdated: '2024-06' },
    'meta-llama/llama-3.1-70b-instruct': { elo: 1240, source: 'estimated', lastUpdated: '2024-07' },
    'google/gemini-flash-1.5': { elo: 1240, source: 'lmsys', lastUpdated: '2025-12' },
    'mistralai/mistral-large': { elo: 1230, source: 'lmsys', lastUpdated: '2024-02' },
    'perplexity/llama-3-sonar-large-32k-online': { elo: 1220, source: 'estimated', lastUpdated: '2024-05' },
    'qwen/qwen-2-72b-instruct': { elo: 1210, source: 'estimated', lastUpdated: '2024-06' },
    'meta-llama/llama-3-70b-instruct': { elo: 1205, source: 'lmsys', lastUpdated: '2024-04' },

    // Budget Tier (<1200)
    'anthropic/claude-3-haiku': { elo: 1180, source: 'lmsys', lastUpdated: '2024-03' },
    'microsoft/wizardlm-2-8x22b': { elo: 1180, source: 'estimated', lastUpdated: '2024-04' },
    'mistralai/mixtral-8x22b-instruct': { elo: 1160, source: 'estimated', lastUpdated: '2024-04' },
    'meta-llama/llama-3-8b-instruct': { elo: 1150, source: 'lmsys', lastUpdated: '2024-04' },
    'google/gemini-pro': { elo: 1150, source: 'lmsys', lastUpdated: '2024-01' },
    'mistralai/mistral-small': { elo: 1150, source: 'estimated', lastUpdated: '2024-02' },
    'openai/gpt-3.5-turbo': { elo: 1100, source: 'lmsys', lastUpdated: '2024-01' },
};

export const CONTEXT_FALLBACKS: Record<string, number> = {
    // DeepSeek typically 32k or 128k depending on specific version
    'deepseek/deepseek-chat': 32768,
    'deepseek/deepseek-coder': 128000,
    // Anthropic Opus 4.5 (200k standard)
    'anthropic/claude-opus-4.5': 200000,
    'anthropic/claude-opus-4.5-thinking': 200000,
    // Google Gemini 3 (1M context)
    'google/gemini-3-pro': 1000000,
    'google/gemini-3-pro-preview': 1000000,
    'google/gemini-3-flash': 1000000,
};

export const ELO_BOUNDARRIES = {
    MIN_RELEVANT: 1000,
    MAX_SOTA: 1550, // Ceiling to allow granularity between top models
};

export function getModelEval(modelId: string): ModelEval | null {
    // Direct match
    if (MODEL_EVALS[modelId]) return MODEL_EVALS[modelId];

    // Fuzzy match strategies (suffix stripping)
    // e.g., "anthropic/claude-3.5-sonnet:beta" -> "anthropic/claude-3.5-sonnet"
    const baseId = modelId.split(':')[0];
    if (MODEL_EVALS[baseId]) return MODEL_EVALS[baseId];

    return null;
}

export function getModelElo(modelId: string): number | null {
    const evalData = getModelEval(modelId);
    return evalData ? evalData.elo : null;
}
