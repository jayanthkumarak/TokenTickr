/**
 * Artificial Analysis Intelligence Index
 * 
 * Provides LLM Intelligence Index scores from ArtificialAnalysis.ai
 * These scores are composites of multiple benchmarks:
 * - MMLU-Pro (reasoning)
 * - LiveBench (general, contamination-resistant)
 * - AIME 2024/2025 (math)
 * - GPQA Diamond (science)
 * - IFBench (instruction following)
 * 
 * Attribution: Data provided by ArtificialAnalysis.ai
 * 
 * @see https://artificialanalysis.ai/leaderboards/models
 */

// Import auto-generated static data (361 models)
// Run 'npm run generate:aa-data' to update
import { AA_INTELLIGENCE_INDEX, AA_MMLU_PRO, AA_ID_ALIASES, AA_DATA_META } from './aa-static-scores';

// Helper to strip all non-alphanumeric characters for "ultra-fuzzy" matching
// e.g. "claude-3.5-sonnet" -> "claude35sonnet" matches "claude-35-sonnet"
function simplify(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Helper to tokenize model names for fuzzy matching
function tokenize(str: string): Set<string> {
    return new Set(
        str.toLowerCase()
            .replace(/[^a-z0-9]/g, ' ')
            .split(/\s+/)
            .filter(t => t.length > 0)
    );
}

// Helper to check if two token sets are equal
function areTokenSetsEqual(setA: Set<string>, setB: Set<string>): boolean {
    if (setA.size !== setB.size) return false;
    for (const elem of setA) {
        if (!setB.has(elem)) return false;
    }
    return true;
}

// Re-export for use in other modules
export { AA_INTELLIGENCE_INDEX, AA_MMLU_PRO, AA_ID_ALIASES, AA_DATA_META };

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

            // Token-based fuzzy matching (handles "claude-sonnet-4.5" vs "claude-4-5-sonnet")
            const modelTokens = tokenize(modelName);
            const aaSlugTokens = tokenize(aaSlug);
            if (areTokenSetsEqual(modelTokens, aaSlugTokens)) return true;

            const aaNameTokens = tokenize(aaName);
            if (areTokenSetsEqual(modelTokens, aaNameTokens)) return true;

            // Also try with provider in the name for loose matching
            // e.g. "anthropic/claude-sonnet-4.5" -> tokens: anthropic, claude, sonnet, 4, 5
            // AA name: "Anthropic Claude 3.5 Sonnet" -> tokens: anthropic, claude, 3, 5, sonnet
            if (provider) {
                const fullIdTokens = tokenize(normalizedId); // includes provider
                if (areTokenSetsEqual(fullIdTokens, aaNameTokens)) return true;
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
    url: 'https://artificialanalysis.ai?utm_source=tokentickr',
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

        // Try token match on keys
        const modelTokens = tokenize(modelName);
        for (const [key, value] of aaScoreCache.entries()) {
            const keyTokens = tokenize(key);
            if (areTokenSetsEqual(modelTokens, keyTokens)) {
                return value;
            }
        }
    }

    // 5. Try token-based fuzzy matching on static data
    const fuzzyScore = fuzzyMatchStaticData(modelName);
    if (fuzzyScore !== null) {
        return fuzzyScore;
    }

    return null;
}

/**
 * Fallback: Token-based fuzzy matching (step 5)
 * Handles cases like "claude-sonnet-4.5" vs "claude-4-5-sonnet"
 * This converts both strings to sets of tokens (words/numbers) and checks for equality.
 */
function fuzzyMatchStaticData(modelName: string): number | null {
    const modelTokens = tokenize(modelName);

    for (const [slug, score] of Object.entries(AA_INTELLIGENCE_INDEX)) {
        const slugTokens = tokenize(slug);

        if (areTokenSetsEqual(modelTokens, slugTokens)) {
            return score;
        }
    }
    return null;
}

/**
 * Synchronous lookup for AA MMLU-Pro score (0-100).
 * Uses static data first (always available), then API cache if initialized.
 */
export function getMMLUProSync(openRouterId: string): number | null {
    // Normalize ID for matching
    const normalizedId = openRouterId.toLowerCase().split(':')[0];
    const modelName = normalizedId.split('/').pop() || '';

    // 1. First check static ID aliases (OpenRouter ID → AA slug)
    if (AA_ID_ALIASES[normalizedId]) {
        const aaSlug = AA_ID_ALIASES[normalizedId];
        if (AA_MMLU_PRO[aaSlug]) {
            return AA_MMLU_PRO[aaSlug];
        }
    }

    // 2. Check static index directly by model name
    if (AA_MMLU_PRO[modelName]) {
        return AA_MMLU_PRO[modelName];
    }

    // 3. Try partial matches in static data
    for (const [slug, score] of Object.entries(AA_MMLU_PRO)) {
        if (modelName.includes(slug) || slug.includes(modelName)) {
            return score;
        }
    }

    // 4. Fall back to API cache if initialized
    if (aaScoreCache) {
        // Note: Currently aaScoreCache only stores intelligence index.
        // If we need MMLU from API cache, we'd need to update the cache structure.
        // For now, rely on static MMLU data as it's comprehensive.
    }

    // 5. Try token-based fuzzy matching on static data
    const fuzzyScore = fuzzyMatchStaticMMLU(modelName);
    if (fuzzyScore !== null) {
        return fuzzyScore;
    }

    return null;
}

/**
 * Fallback: Token-based fuzzy matching for MMLU
 */
function fuzzyMatchStaticMMLU(modelName: string): number | null {
    // 1. Try simplified string matching (ignores dots, dashes, spaces)
    const simpleName = simplify(modelName);
    for (const [slug, score] of Object.entries(AA_MMLU_PRO)) {
        if (simplify(slug) === simpleName) {
            return score;
        }
    }

    // 2. Token-based matching
    const modelTokens = tokenize(modelName);

    for (const [slug, score] of Object.entries(AA_MMLU_PRO)) {
        const slugTokens = tokenize(slug);

        if (areTokenSetsEqual(modelTokens, slugTokens)) {
            return score;
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
