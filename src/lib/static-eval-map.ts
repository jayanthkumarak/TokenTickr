export interface ModelEval {
    elo: number;    // LMSYS Arena Elo
    mmlu?: number;  // Approx MMLU (0-100)
    source: 'lmsys' | 'estimated';
    lastUpdated: string;
}

// Baseline and Calibration (December 2025)
// SOTA Ceiling: ~1500 (Gemini 3 Pro)
// High Tier: ~1400 (GPT-5, Sonnet 4.5)
// Mid Tier: ~1250 (GPT-4o, Sonnet 3.5)
// Entry Tier: ~1000 (GPT-3.5)

export const MODEL_EVALS: Record<string, ModelEval> = {
    // --- TOP TIER (The ~1450+ Club) ---
    'google/gemini-pro-1.5': { elo: 1260, source: 'lmsys', lastUpdated: '2025-12' }, // Older
    'google/gemini-flash-1.5': { elo: 1240, source: 'lmsys', lastUpdated: '2025-12' },
    'google/gemini-exp-1114': { elo: 1360, source: 'lmsys', lastUpdated: '2025-12' }, // Approx for recent

    // Future/Hypothetical Estimations (Projected)
    'google/gemini-3-pro-preview': { elo: 1450, source: 'estimated', lastUpdated: '2025-12' },
    'openai/gpt-5.2': { elo: 1480, source: 'estimated', lastUpdated: '2025-12' },
    'xai/grok-4': { elo: 1350, source: 'estimated', lastUpdated: '2025-12' },
    'anthropic/claude-opus-4.5': { elo: 1460, source: 'estimated', lastUpdated: '2025-12' },

    // Existing Placeholders
    'openai/gpt-4o': { elo: 1287, source: 'lmsys', lastUpdated: '2024-05' },
    'openai/gpt-4o-mini': { elo: 1270, source: 'lmsys', lastUpdated: '2024-07' },
    'openai/gpt-4-turbo': { elo: 1255, source: 'lmsys', lastUpdated: '2024-04' },
    'anthropic/claude-3.5-sonnet': { elo: 1271, source: 'lmsys', lastUpdated: '2024-06' },
    'anthropic/claude-3-opus': { elo: 1248, source: 'lmsys', lastUpdated: '2024-03' },
    'anthropic/claude-3-haiku': { elo: 1180, source: 'lmsys', lastUpdated: '2024-03' },

    // Open Source / Meta
    'meta-llama/llama-3.1-405b-instruct': { elo: 1260, source: 'lmsys', lastUpdated: '2024-07' }, // Approx high
    'meta-llama/llama-3.1-70b-instruct': { elo: 1240, source: 'estimated', lastUpdated: '2024-07' },
    'meta-llama/llama-3-70b-instruct': { elo: 1205, source: 'lmsys', lastUpdated: '2024-04' },
    'meta-llama/llama-3-8b-instruct': { elo: 1150, source: 'lmsys', lastUpdated: '2024-04' },

    // Mistral
    'mistralai/mistral-large': { elo: 1230, source: 'lmsys', lastUpdated: '2024-02' },
    'mistralai/mixtral-8x22b-instruct': { elo: 1160, source: 'estimated', lastUpdated: '2024-04' },

    // Other popular on OpenRouter
    'nousresearch/hermes-3-llama-3.1-405b': { elo: 1250, source: 'estimated', lastUpdated: '2024-08' },
    'microsoft/wizardlm-2-8x22b': { elo: 1180, source: 'estimated', lastUpdated: '2024-04' },
    'qwen/qwen-2-72b-instruct': { elo: 1210, source: 'estimated', lastUpdated: '2024-06' },
    // DeepSeek (Correction for missing data)
    'deepseek/deepseek-chat': { elo: 1250, source: 'estimated', lastUpdated: '2024-06' }, // Approx Llama3 70b level
    'deepseek/deepseek-coder': { elo: 1240, source: 'estimated', lastUpdated: '2024-06' },
};

export const CONTEXT_FALLBACKS: Record<string, number> = {
    // DeepSeek typically 32k or 128k depending on specific version, safe bet 32k for "chat"
    'deepseek/deepseek-chat': 32768,
    'deepseek/deepseek-coder': 128000,
    // Anthropic Opus 4.5 (Estimated 200k standard or higher)
    'anthropic/claude-opus-4.5': 200000,
};

export const ELO_BOUNDARRIES = {
    MIN_RELEVANT: 1000,
    MAX_SOTA: 1350, // Adjusted current realistic top for widely available API models
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
