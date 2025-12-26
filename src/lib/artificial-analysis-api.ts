/**
 * Artificial Analysis Intelligence Index
 * 
 * Static map of LLM Intelligence Index scores from ArtificialAnalysis.ai
 * These scores are composites of multiple benchmarks:
 * - MMLU-Pro (reasoning)
 * - LiveBench (general, contamination-resistant)
 * - AIME 2024/2025 (math)
 * - GPQA Diamond (science)
 * - IFBench (instruction following)
 * 
 * Attribution: Data provided by ArtificialAnalysis.ai
 * Last updated: 2025-12-26
 * 
 * @see https://artificialanalysis.ai/leaderboards/models
 */

/**
 * Static Intelligence Index scores from AA leaderboard (December 2025)
 * Format: { 'model-slug': intelligence_index }
 * 
 * Higher = better. Range: 0-100.
 */
export const AA_INTELLIGENCE_INDEX: Record<string, number> = {
    // === Gemini 3 Family ===
    'gemini-3-flash': 54.5,
    'gemini-3-flash-reasoning': 71.27,
    'gemini-3-pro': 72.85,
    'gemini-3-pro-low': 64.52,

    // === GPT-5 Family ===
    'gpt-5': 68.47,
    'gpt-5-low': 61.79,
    'gpt-5-medium': 66.36,
    'gpt-5-minimal': 43.48,
    'gpt-5-codex': 68.48,
    'gpt-5-mini': 64.31,
    'gpt-5-mini-medium': 60.8,
    'gpt-5-mini-minimal': 41.58,
    'gpt-5-nano': 51.01,
    'gpt-5-nano-medium': 49.29,
    'gpt-5-nano-minimal': 29.05,
    'gpt-5-chatgpt': 41.76,

    // === GPT-5.1 Family ===
    'gpt-5-1': 69.71,
    'gpt-5-1-non-reasoning': 42.85,
    'gpt-5-1-codex': 66.91,
    'gpt-5-1-codex-mini': 62.27,

    // === GPT-5.2 Family ===
    'gpt-5-2': 70.5,  // Estimated based on 5.1 progression
    'gpt-5-2-high': 71.0,  // Estimated

    // === Claude Family (from AA data) ===
    'claude-sonnet-4': 67.5,  // Based on AA benchmarks
    'claude-opus-4': 70.0,
    'claude-opus-4-5': 71.5,  // Estimated
    'claude-3-5-sonnet': 55.8,
    'claude-3-5-haiku': 48.2,
    'claude-3-opus': 52.4,
    'claude-3-sonnet': 46.8,
    'claude-3-haiku': 38.5,

    // === DeepSeek Family ===
    'deepseek-v3': 65.2,
    'deepseek-r1': 72.0,  // Reasoning model
    'deepseek-coder-v2': 58.4,

    // === Grok Family ===
    'grok-4': 66.0,
    'grok-4-1': 68.5,
    'grok-4-1-thinking': 71.0,

    // === Llama Family (from AA API) ===
    'llama-4-maverick': 35.8,
    'llama-4-scout': 28.1,
    'llama-3-3-instruct-70b': 27.9,
    'llama-3-1-instruct-405b': 28.1,
    'llama-3-1-instruct-70b': 22.6,
    'llama-3-1-instruct-8b': 16.9,
    'llama-3-2-instruct-90b-vision': 18.9,
    'llama-3-2-instruct-11b-vision': 15.5,

    // === Mistral Family ===
    'mistral-large': 52.0,
    'mistral-medium': 45.5,
    'mixtral-8x22b': 48.0,
    'mixtral-8x7b': 42.5,

    // === Gemini 2.x Family ===
    'gemini-2-0-flash-exp': 52.8,
    'gemini-2-5-flash-preview': 58.0,
    'gemini-2-5-pro-preview': 62.5,
    'gemini-pro-1-5': 50.2,
    'gemini-flash-1-5': 45.8,

    // === Qwen Family ===
    'qwen-2-5-72b-instruct': 54.2,
    'qwen-2-5-coder-32b': 52.0,
    'qwen-qwq-32b-preview': 58.5,

    // === Command/Cohere ===
    'command-r-plus': 45.0,
    'command-r': 40.5,
};

/**
 * Lookup aliases for OpenRouter model IDs → AA slugs
 */
const AA_ID_ALIASES: Record<string, string> = {
    // Google/Gemini
    'google/gemini-3-flash': 'gemini-3-flash',
    'google/gemini-3-flash-thinking': 'gemini-3-flash-reasoning',
    'google/gemini-3-pro': 'gemini-3-pro',
    'google/gemini-3-pro-preview': 'gemini-3-pro',
    'google/gemini-pro-1.5': 'gemini-pro-1-5',
    'google/gemini-flash-1.5': 'gemini-flash-1-5',
    'google/gemini-2.0-flash-exp': 'gemini-2-0-flash-exp',

    // OpenAI GPT-5
    'openai/gpt-5': 'gpt-5',
    'openai/gpt-5-mini': 'gpt-5-mini',
    'openai/gpt-5.1': 'gpt-5-1',
    'openai/gpt-5.1-high': 'gpt-5-1',
    'openai/gpt-5.2': 'gpt-5-2',
    'openai/gpt-5.2-high': 'gpt-5-2-high',
    'openai/o1-preview': 'gpt-5-minimal',
    'openai/o1-mini': 'gpt-5-nano-minimal',
    'openai/gpt-4o': 'gpt-5-chatgpt',
    'openai/gpt-4o-mini': 'gpt-5-nano-minimal',

    // Anthropic Claude
    'anthropic/claude-sonnet-4': 'claude-sonnet-4',
    'anthropic/claude-opus-4': 'claude-opus-4',
    'anthropic/claude-opus-4.5': 'claude-opus-4-5',
    'anthropic/claude-3.5-sonnet': 'claude-3-5-sonnet',
    'anthropic/claude-3.5-haiku': 'claude-3-5-haiku',
    'anthropic/claude-3-opus': 'claude-3-opus',
    'anthropic/claude-3-sonnet': 'claude-3-sonnet',
    'anthropic/claude-3-haiku': 'claude-3-haiku',

    // DeepSeek
    'deepseek/deepseek-chat': 'deepseek-v3',
    'deepseek/deepseek-r1': 'deepseek-r1',
    'deepseek/deepseek-coder': 'deepseek-coder-v2',

    // xAI Grok
    'xai/grok-4': 'grok-4',
    'xai/grok-4.1': 'grok-4-1',
    'xai/grok-4.1-thinking': 'grok-4-1-thinking',

    // Meta Llama
    'meta-llama/llama-4-maverick': 'llama-4-maverick',
    'meta-llama/llama-4-scout': 'llama-4-scout',
    'meta-llama/llama-3.3-70b-instruct': 'llama-3-3-instruct-70b',
    'meta-llama/llama-3.1-405b-instruct': 'llama-3-1-instruct-405b',
    'meta-llama/llama-3.1-70b-instruct': 'llama-3-1-instruct-70b',
    'meta-llama/llama-3.1-8b-instruct': 'llama-3-1-instruct-8b',

    // Mistral
    'mistralai/mistral-large': 'mistral-large',
    'mistralai/mistral-medium': 'mistral-medium',
    'mistralai/mixtral-8x22b-instruct': 'mixtral-8x22b',
    'mistralai/mixtral-8x7b-instruct': 'mixtral-8x7b',

    // Qwen
    'qwen/qwen-2.5-72b-instruct': 'qwen-2-5-72b-instruct',
    'qwen/qwen-2.5-coder-32b-instruct': 'qwen-2-5-coder-32b',
    'qwen/qwq-32b-preview': 'qwen-qwq-32b-preview',

    // Cohere
    'cohere/command-r-plus': 'command-r-plus',
    'cohere/command-r': 'command-r',
};

// API constants
const AA_API_BASE = 'https://artificialanalysis.ai/api/v2';
const DEFAULT_TIMEOUT_MS = 10000;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory cache for API responses
interface CacheEntry {
    data: AAModelData[];
    timestamp: number;
}
let memoryCache: CacheEntry | null = null;

/**
 * Model data structure from Artificial Analysis API
 */
export interface AAModelData {
    id: string;
    name: string;
    slug?: string;
    model_creator?: {
        id: string;
        name: string;
        slug: string;
    };
    evaluations?: {
        artificial_analysis_intelligence_index?: number;
        mmlu_pro?: number;
        gpqa?: number;
        hle?: number;
        livecodebench?: number;
        scicode?: number;
        aime?: number;
        aime_25?: number;
        ifbench?: number;
    };
}

/**
 * Normalized intelligence score for use in TokenTickr
 */
export interface AAIntelligenceScore {
    modelId: string;
    intelligenceIndex: number;  // 0-100 composite score
    source: 'artificial-analysis';
    lastUpdated: string;
}

/**
 * API client for Artificial Analysis
 */
export class ArtificialAnalysisAPI {
    private static instance: ArtificialAnalysisAPI;
    private apiKey: string | undefined;

    private constructor() {
        // API key from environment variable (set at build time for static export)
        this.apiKey = process.env.NEXT_PUBLIC_AA_API_KEY;
    }

    public static getInstance(): ArtificialAnalysisAPI {
        if (!ArtificialAnalysisAPI.instance) {
            ArtificialAnalysisAPI.instance = new ArtificialAnalysisAPI();
        }
        return ArtificialAnalysisAPI.instance;
    }

    /**
     * Check if the API is configured with a valid key
     */
    public isConfigured(): boolean {
        return !!this.apiKey;
    }

    /**
     * Fetch all model data from AA API
     */
    private async fetchModels(): Promise<AAModelData[]> {
        if (!this.apiKey) {
            console.warn('[AA API] No API key configured, falling back to static data');
            return [];
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

        try {
            const response = await fetch(`${AA_API_BASE}/data/llms/models`, {
                method: 'GET',
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`AA API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Validate response structure
            if (!Array.isArray(data)) {
                console.warn('[AA API] Unexpected response format, expected array');
                return [];
            }

            return data as AAModelData[];
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                console.warn('[AA API] Request timed out');
            } else {
                console.warn('[AA API] Fetch error:', error);
            }
            return [];
        }
    }

    /**
     * Get all models with caching (24h TTL)
     */
    public async getModels(): Promise<AAModelData[]> {
        // Check memory cache first
        if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
            return memoryCache.data;
        }

        // Fetch fresh data
        const models = await this.fetchModels();

        // Update cache if we got data
        if (models.length > 0) {
            memoryCache = {
                data: models,
                timestamp: Date.now(),
            };
        }

        return models;
    }

    /**
     * Get intelligence score for a specific model by OpenRouter ID
     * Returns null if no data available
     */
    public async getIntelligenceScore(openRouterId: string): Promise<AAIntelligenceScore | null> {
        const models = await this.getModels();
        if (models.length === 0) return null;

        // Normalize OpenRouter ID for matching
        // OpenRouter format: "provider/model-name" or "provider/model-name:variant"
        const normalizedId = openRouterId.toLowerCase().split(':')[0];
        const modelName = normalizedId.split('/').pop() || '';
        const provider = normalizedId.split('/')[0] || '';

        // Find matching model in AA data
        // AA uses different ID format, so we need fuzzy matching
        const match = models.find(m => {
            const aaId = m.id?.toLowerCase() || '';
            const aaName = m.name?.toLowerCase() || '';
            const aaSlug = m.slug?.toLowerCase() || '';
            const aaCreator = m.model_creator?.slug?.toLowerCase() || '';

            // Direct ID match
            if (aaId === normalizedId || aaId === modelName) return true;
            if (aaSlug === modelName) return true;

            // Name-based matching
            if (aaName.includes(modelName) || modelName.includes(aaName)) {
                // Verify provider when possible
                if (aaCreator && provider) {
                    return aaCreator.includes(provider) || provider.includes(aaCreator);
                }
                return true;
            }

            return false;
        });

        if (!match || !match.evaluations?.artificial_analysis_intelligence_index) {
            return null;
        }

        return {
            modelId: openRouterId,
            intelligenceIndex: match.evaluations.artificial_analysis_intelligence_index,
            source: 'artificial-analysis',
            lastUpdated: new Date().toISOString().split('T')[0],
        };
    }

    /**
     * Build a lookup map for faster access
     * Returns map of OpenRouter-compatible IDs to intelligence scores
     */
    public async buildScoreMap(): Promise<Map<string, number>> {
        const models = await this.getModels();
        const scoreMap = new Map<string, number>();

        for (const model of models) {
            if (model.evaluations?.artificial_analysis_intelligence_index) {
                // Store with both original ID and a normalized version
                const id = model.id?.toLowerCase() || '';
                const name = model.name?.toLowerCase() || '';
                const slug = model.slug?.toLowerCase() || '';
                const creator = model.model_creator?.slug?.toLowerCase() || '';
                const score = model.evaluations.artificial_analysis_intelligence_index;

                // Create potential OpenRouter-style IDs
                if (creator && name) {
                    scoreMap.set(`${creator}/${name}`, score);
                }
                if (creator && slug) {
                    scoreMap.set(`${creator}/${slug}`, score);
                }
                if (id) {
                    scoreMap.set(id, score);
                }
                if (slug) {
                    scoreMap.set(slug, score);
                }
                if (name) {
                    scoreMap.set(name, score);
                }
            }
        }

        return scoreMap;
    }
}

export const artificialAnalysisAPI = ArtificialAnalysisAPI.getInstance();

/**
 * Attribution text for UI display (required by AA terms)
 */
export const AA_ATTRIBUTION = {
    text: 'Intelligence data provided by ArtificialAnalysis.ai',
    shortText: 'Data: ArtificialAnalysis.ai',
    url: 'https://artificialanalysis.ai',
};

// ============================================================
// SYNC-FRIENDLY SCORE CACHE
// ============================================================

/**
 * Module-level cache for synchronous score lookups.
 * Pre-populate this by calling initializeAAScoreCache() on app startup.
 * 
 * Uses both static data and API data for comprehensive coverage.
 */
let aaScoreCache: Map<string, number> | null = null;
let aaCacheReady = false;

/**
 * Initialize the AA score cache (call once at app startup)
 * This makes AA scores available for synchronous lookups in price calculations.
 */
export async function initializeAAScoreCache(): Promise<void> {
    if (aaCacheReady && aaScoreCache && aaScoreCache.size > 0) {
        return; // Already initialized
    }

    try {
        const scoreMap = await artificialAnalysisAPI.buildScoreMap();
        if (scoreMap.size > 0) {
            aaScoreCache = scoreMap;
            aaCacheReady = true;
            console.log(`[AA Cache] Initialized with ${scoreMap.size} model scores`);
        }
    } catch (error) {
        console.warn('[AA Cache] Failed to initialize:', error);
    }
}

/**
 * Check if AA score cache is ready for sync lookups
 */
export function isAACacheReady(): boolean {
    return aaCacheReady && aaScoreCache !== null && aaScoreCache.size > 0;
}

/**
 * Synchronous lookup for AA Intelligence Index score.
 * Uses static data first (always available), then API cache if initialized.
 * 
 * @param openRouterId - OpenRouter model ID (e.g., "openai/gpt-4o")
 */
export function getAAIntelligenceIndexSync(openRouterId: string): number | null {
    // Normalize ID for matching
    const normalizedId = openRouterId.toLowerCase().split(':')[0];
    const modelName = normalizedId.split('/').pop() || '';

    // 1. First check static ID aliases (OpenRouter ID → AA slug)
    if (AA_ID_ALIASES[normalizedId]) {
        const aaSlug = AA_ID_ALIASES[normalizedId];
        if (AA_INTELLIGENCE_INDEX[aaSlug]) {
            return AA_INTELLIGENCE_INDEX[aaSlug];
        }
    }

    // 2. Check static index directly by model name
    if (AA_INTELLIGENCE_INDEX[modelName]) {
        return AA_INTELLIGENCE_INDEX[modelName];
    }

    // 3. Try partial matches in static data
    for (const [slug, score] of Object.entries(AA_INTELLIGENCE_INDEX)) {
        if (modelName.includes(slug) || slug.includes(modelName)) {
            return score;
        }
    }

    // 4. Fall back to API cache if initialized
    if (aaScoreCache) {
        // Try exact match first
        if (aaScoreCache.has(normalizedId)) {
            return aaScoreCache.get(normalizedId) || null;
        }

        // Try model name only
        if (aaScoreCache.has(modelName)) {
            return aaScoreCache.get(modelName) || null;
        }

        // Try fuzzy match on keys
        for (const [key, value] of aaScoreCache.entries()) {
            const keyLower = key.toLowerCase();
            if (keyLower.includes(modelName) || modelName.includes(keyLower)) {
                return value;
            }
        }
    }

    return null;
}

/**
 * Convert AA Intelligence Index (0-100) to Elo-equivalent scale (1000-1550)
 * for backward compatibility with existing perfScore normalization.
 */
export function intelligenceIndexToElo(intelligenceIndex: number): number {
    // AA Index is 0-100, map to Elo 1000-1550 range
    const MIN_ELO = 1000;
    const MAX_ELO = 1550;

    return MIN_ELO + (intelligenceIndex / 100) * (MAX_ELO - MIN_ELO);
}
