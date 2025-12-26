/**
 * Advanced Scoring Utilities
 * 
 * Provides multiple scoring algorithms for the Smart Value Index:
 * 1. Geometric Mean - Balanced excellence, weak dimension drags down score
 * 2. Utility Function - Economic utility with configurable diminishing returns
 */

export type ScoringMode = "geometric" | "utility";

/**
 * Calculate composite value score using geometric mean - SMART MODE.
 * Performance-weighted: (perf² × price × context)^(1/4)
 * Performance has 50% weight (2x), price and context 25% each.
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

    // Weighted: perf² × price × context, then 4th root
    const weightedProduct = Math.pow(perf, 2) * p * ctx;
    const geometric = Math.pow(weightedProduct, 1 / 4) * 100;
    return Math.min(100, geometric);
}

/**
 * Calculate composite value score using EFFICIENCY model - BUDGET MODE.
 * 
 * Philosophy: For high-volume workloads, what matters is:
 * 1. Context capacity per dollar (throughput efficiency)
 * 2. Acceptable intelligence (must clear a quality bar)
 * 3. Price as a tie-breaker
 * 
 * This creates genuine differentiation from Smart Score:
 * - Smart Score: "What's the smartest model I can afford?"
 * - Budget Score: "What's the most efficient model that's smart enough?"
 */
export function calculateUtilityScore(
    priceScore: number,
    perfScore: number,
    contextScore: number
): number {
    // STEP 1: Quality gate - models must be "smart enough"
    // Below this threshold, models are progressively penalized
    const QUALITY_FLOOR = 55;
    let qualityMultiplier = 1;
    if (perfScore < QUALITY_FLOOR) {
        // Quadratic penalty for low-quality models
        qualityMultiplier = Math.pow(perfScore / QUALITY_FLOOR, 2);
    }

    // STEP 2: Calculate efficiency bonus
    // High context + low price = great efficiency
    // This creates a "tokens per dollar" vibe
    const contextWeight = 0.6;  // Context is highly valued for throughput
    const priceWeight = 0.4;    // Price matters but context matters more

    // Combine context and price into an efficiency metric
    // Both are already 0-100 normalized scores
    const efficiencyScore = (contextScore * contextWeight) + (priceScore * priceWeight);

    // STEP 3: Add a small intelligence bonus (but not dominant)
    // Smart models get a boost, but it's not the main factor
    const INTEL_BONUS_WEIGHT = 0.15;
    const intelBonus = perfScore * INTEL_BONUS_WEIGHT;

    // STEP 4: Combine with quality gate
    const rawScore = (efficiencyScore * 0.85) + intelBonus;
    const finalScore = rawScore * qualityMultiplier;

    return Math.min(100, Math.max(0, finalScore));
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
