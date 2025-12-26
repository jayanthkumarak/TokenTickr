/**
 * Heuristic Intelligence Engine for TokenTickr
 * 
 * Provides "educated guess" Elo scores for models not in the curated static map.
 * Uses multi-signal analysis: price, parameter count, name keywords, and context.
 * 
 * Philosophy: A fair approximation beats an unfair static fallback.
 */

import { OpenRouterModel } from '@/types/models';

export interface HeuristicEloResult {
    elo: number;
    source: 'heuristic';
    signals: {
        base: number;
        priceBoost: number;
        paramBoost: number;
        keywordBoost: number;
        contextBoost: number;
    };
}

// Elo boundaries for heuristic estimation
// IMPORTANT: Heuristic is now a FALLBACK only. Ceiling lowered to prevent
// heuristic models from ranking as "Pro" tier (which requires reliable data).
const HEURISTIC_BOUNDS = {
    BASE: 1150,        // "Competent but unproven" starting point
    FLOOR: 1050,       // Minimum (prevents ultra-cheap from going too low)
    CAP: 1280,         // Maximum (well below "Pro" tier threshold of ~1350)
} as const;

// Price thresholds - documented for reference but calculations use log scale directly
// Reference: GPT-4o is ~$5/1M input = $0.000005/token
// CHEAP: <$0.50/1M, MID: $0.50-$2/1M, PREMIUM: $2-$10/1M, FLAGSHIP: >$10/1M

// Parameter count patterns - extraction uses simpler regex in extractParamCount()
// Reference: 405B+ = 100pt, 70-100B = 60-80pt, 7-8B = 20pt, 1-3B = -10pt

// Keyword boosts/penalties
const KEYWORD_MODIFIERS: Record<string, number> = {
    // Premium indicators
    'pro': 40,
    'ultra': 50,
    'opus': 45,
    'sonnet': 30,
    'large': 25,
    'turbo': 15,

    // Budget indicators
    'mini': -30,
    'flash': -20,
    'haiku': -25,
    'lite': -35,
    'nano': -40,
    'tiny': -50,
    'small': -15,

    // Specialty (neutral-ish)
    'coder': 10,
    'chat': 0,
    'instruct': 5,
};

/**
 * Extract numeric parameter count from model name/ID
 * e.g., "llama-3.1-70b-instruct" -> 70
 */
function extractParamCount(modelId: string, modelName: string): number | null {
    const combined = `${modelId} ${modelName}`.toLowerCase();

    // Look for patterns like "70b", "405b", "7b"
    const match = combined.match(/\b(\d{1,3})b\b/);
    if (match) {
        return parseInt(match[1], 10);
    }
    return null;
}

/**
 * Calculate price-based Elo boost using logarithmic scale.
 * More expensive models generally indicate higher capability investment.
 */
function calculatePriceBoost(promptPrice: number): number {
    if (promptPrice <= 0) return 0;

    // Log scale normalization
    // Reference: log10($0.000001) ≈ -6, log10($0.00003) ≈ -4.5
    const logPrice = Math.log10(promptPrice);

    // Map from approximately -7 (ultra cheap) to -4 (flagship) onto 0-150 boost
    // Formula: (logPrice + 7) / 3 * 150, clamped
    const normalized = (logPrice + 7) / 3;
    const boost = Math.round(normalized * 150);

    return Math.max(0, Math.min(150, boost));
}

/**
 * Calculate parameter count boost.
 * Larger models generally correlate with higher capability.
 */
function calculateParamBoost(paramCount: number | null): number {
    if (!paramCount) return 0;

    // Logarithmic scale for params
    // 7B -> ~20, 70B -> ~60, 405B -> ~100
    if (paramCount >= 400) return 100;
    if (paramCount >= 100) return 80;
    if (paramCount >= 65) return 60;
    if (paramCount >= 30) return 45;
    if (paramCount >= 13) return 30;
    if (paramCount >= 7) return 20;
    if (paramCount >= 3) return 5;
    return -10; // Tiny models
}

/**
 * Calculate keyword-based boost from model name/ID.
 * Uses word boundary matching to avoid false positives (e.g., 'pro' in 'provider').
 */
function calculateKeywordBoost(modelId: string, modelName: string): number {
    const combined = `${modelId} ${modelName}`.toLowerCase();
    let boost = 0;

    for (const [keyword, modifier] of Object.entries(KEYWORD_MODIFIERS)) {
        // Use word boundary regex to match whole words only
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(combined)) {
            boost += modifier;
        }
    }

    // Clamp to reasonable range
    return Math.max(-50, Math.min(50, boost));
}

/**
 * Calculate context length boost.
 * Very long context (100k+) indicates more sophisticated architecture.
 */
function calculateContextBoost(contextLength: number): number {
    if (contextLength >= 1000000) return 30;  // 1M+ (Gemini class)
    if (contextLength >= 200000) return 25;   // 200k+ 
    if (contextLength >= 128000) return 20;   // 128k
    if (contextLength >= 32000) return 10;    // 32k
    return 0;
}

/**
 * Main heuristic function: Estimate Elo for unranked models.
 * 
 * @param model - OpenRouter model object
 * @returns HeuristicEloResult with estimated Elo and signal breakdown
 */
export function calculateHeuristicElo(model: OpenRouterModel): HeuristicEloResult {
    // Parse prompt price
    const promptPrice = parseFloat(model.pricing.prompt) || 0;

    // Extract signals
    const paramCount = extractParamCount(model.id, model.name);
    const priceBoost = calculatePriceBoost(promptPrice);
    const paramBoost = calculateParamBoost(paramCount);
    const keywordBoost = calculateKeywordBoost(model.id, model.name);
    const contextBoost = calculateContextBoost(model.context_length);

    // Calculate raw Elo
    const rawElo = HEURISTIC_BOUNDS.BASE + priceBoost + paramBoost + keywordBoost + contextBoost;

    // Clamp to bounds
    const finalElo = Math.max(
        HEURISTIC_BOUNDS.FLOOR,
        Math.min(HEURISTIC_BOUNDS.CAP, Math.round(rawElo))
    );

    return {
        elo: finalElo,
        source: 'heuristic',
        signals: {
            base: HEURISTIC_BOUNDS.BASE,
            priceBoost,
            paramBoost,
            keywordBoost,
            contextBoost,
        },
    };
}

/**
 * Debug utility: Get human-readable breakdown of heuristic calculation.
 */
export function explainHeuristicElo(model: OpenRouterModel): string {
    const result = calculateHeuristicElo(model);
    const { signals } = result;

    return [
        `Heuristic Elo for ${model.name}: ${result.elo}`,
        `  Base: ${signals.base}`,
        `  + Price boost: ${signals.priceBoost}`,
        `  + Param boost: ${signals.paramBoost}`,
        `  + Keyword boost: ${signals.keywordBoost}`,
        `  + Context boost: ${signals.contextBoost}`,
        `  = Raw: ${signals.base + signals.priceBoost + signals.paramBoost + signals.keywordBoost + signals.contextBoost}`,
        `  → Clamped: ${result.elo}`,
    ].join('\n');
}
