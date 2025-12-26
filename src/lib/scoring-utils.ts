/**
 * Advanced Scoring Utilities
 * 
 * Provides multiple scoring algorithms for the Smart Value Index:
 * 1. Geometric Mean - Balanced excellence, weak dimension drags down score
 * 2. Utility Function - Economic utility with configurable diminishing returns
 */

export type ScoringMode = "geometric" | "utility";

/**
 * Calculate composite value score using geometric mean.
 * Cube root of product - rewards balanced models, penalizes extreme weaknesses.
 */
export function calculateGeometricMeanScore(
    priceScore: number,
    perfScore: number,
    contextScore: number
): number {
    const epsilon = 1;
    const p = (priceScore + epsilon) / 100;
    const perf = (perfScore + epsilon) / 100;
    const ctx = (contextScore + epsilon) / 100;

    const geometric = Math.pow(p * perf * ctx, 1 / 3) * 100;
    return Math.min(100, geometric);
}

/**
 * Calculate composite value score using utility function with diminishing returns.
 * Each dimension has its own elasticity coefficient.
 */
export function calculateUtilityScore(
    priceScore: number,
    perfScore: number,
    contextScore: number
): number {
    // Elasticity coefficients (< 1 = diminishing returns)
    const PRICE_ELASTICITY = 0.7;    // Price has good returns
    const PERF_ELASTICITY = 0.9;     // Performance is nearly linear
    const CONTEXT_ELASTICITY = 0.5;  // Context has strong diminishing returns

    // Importance weights (sum to 1)
    const PRICE_WEIGHT = 0.35;
    const PERF_WEIGHT = 0.40;
    const CONTEXT_WEIGHT = 0.25;

    // Calculate utility for each dimension
    const priceUtility = Math.pow(priceScore / 100, PRICE_ELASTICITY);
    const perfUtility = Math.pow(perfScore / 100, PERF_ELASTICITY);
    const contextUtility = Math.pow(contextScore / 100, CONTEXT_ELASTICITY);

    // Weighted sum of utilities
    const totalUtility =
        (PRICE_WEIGHT * priceUtility) +
        (PERF_WEIGHT * perfUtility) +
        (CONTEXT_WEIGHT * contextUtility);

    // Scale back to 0-100
    return Math.min(100, totalUtility * 100);
}

/**
 * Calculate value score based on selected mode.
 */
export function calculateValueScore(
    priceScore: number,
    perfScore: number,
    contextScore: number,
    mode: ScoringMode = "geometric"
): number {
    switch (mode) {
        case "utility":
            return calculateUtilityScore(priceScore, perfScore, contextScore);
        case "geometric":
        default:
            return calculateGeometricMeanScore(priceScore, perfScore, contextScore);
    }
}

/**
 * Get human-readable description of scoring mode.
 */
export function getScoringModeDescription(mode: ScoringMode): string {
    switch (mode) {
        case "utility":
            return "Utility function with diminishing returns";
        case "geometric":
        default:
            return "Geometric mean for balanced excellence";
    }
}
