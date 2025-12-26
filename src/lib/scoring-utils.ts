/**
 * Advanced Scoring Utilities
 * 
 * Provides multiple scoring algorithms for the Smart Value Index:
 * 1. Smart Score - Dynamic tier-based weighting (intelligence-first)
 * 2. Budget Score - Efficiency-focused (context capacity per dollar)
 * 
 * Philosophy:
 * - Smart Score: "Find the smart model that saves you 20-30% while sacrificing minimal intelligence"
 * - Budget Score: "What's the most efficient model that's smart enough?"
 */

export type ScoringMode = "geometric" | "utility";

/**
 * Tier classification for dynamic weighting.
 */
export type ModelTier = "frontier" | "pro" | "budget";

/**
 * Tier-specific weights for Smart Score.
 * 
 * Philosophy:
 * - Frontier: "Those that pay, will pay" — price barely matters
 * - Pro: "The deals zone" — balance intelligence with savings
 * - Budget: "Volume-first" — price matters significantly
 */
const TIER_WEIGHTS = {
    frontier: { intel: 0.60, context: 0.35, price: 0.05 },
    pro: { intel: 0.50, context: 0.30, price: 0.20 },
    budget: { intel: 0.35, context: 0.25, price: 0.40 },
} as const;

/**
 * Determine model tier based on relative performance.
 * Uses ratio to max performance in the set (future-proof as models evolve).
 */
export function getModelTier(perfScore: number, maxPerfScore: number): ModelTier {
    const ratio = perfScore / Math.max(maxPerfScore, 1);

    if (ratio >= 0.90) return "frontier";  // Top 10% of capability
    if (ratio >= 0.70) return "pro";       // 70-90% of capability
    return "budget";                        // Below 70%
}

/**
 * Calculate context gate.
 * Models with <64K context (contextScore ~50) are penalized.
 * Intelligence without context capacity is limited.
 */
export function getContextGate(contextScore: number): number {
    const CONTEXT_THRESHOLD = 50; // ~64K tokens
    if (contextScore >= CONTEXT_THRESHOLD) return 1.0;
    // Progressive penalty: 0.5 at ctx=0, 1.0 at ctx=50
    return 0.5 + (contextScore / 100);
}

/**
 * Calculate SMART SCORE using dynamic tier-based weighting.
 * 
 * Key features:
 * 1. Dynamic tier thresholds (relative to best model in set)
 * 2. Context gate (penalizes tiny context windows)
 * 3. Tier-appropriate price sensitivity
 * 
 * @param priceScore - 0-100 price score (higher = cheaper)
 * @param perfScore - 0-100 performance score (higher = smarter)
 * @param contextScore - 0-100 context score (higher = larger context)
 * @param maxPerfScore - Maximum perf score in the comparison set (for relative tier)
 */
export function calculateSmartScore(
    priceScore: number,
    perfScore: number,
    contextScore: number,
    maxPerfScore: number = 100
): number {
    // 1. Context gate: models with tiny context are penalized
    const contextGate = getContextGate(contextScore);

    // 2. Determine tier based on relative performance
    const tier = getModelTier(perfScore, maxPerfScore);
    const weights = TIER_WEIGHTS[tier];

    // 3. Calculate weighted sum
    const rawScore = (
        (weights.intel * perfScore) +
        (weights.context * contextScore) +
        (weights.price * priceScore)
    );

    // 4. Apply context gate
    const finalScore = contextGate * rawScore;

    return Math.min(100, Math.max(0, finalScore));
}

/**
 * Calculate BUDGET SCORE using efficiency model.
 * 
 * Philosophy: For high-volume workloads, what matters is:
 * 1. Context capacity per dollar (throughput efficiency)
 * 2. Acceptable intelligence (must clear a quality bar)
 * 3. Price as a major factor
 * 
 * This creates genuine differentiation from Smart Score:
 * - Smart Score: "What's the smartest model I can afford?"
 * - Budget Score: "What's the most efficient model that's smart enough?"
 */
export function calculateBudgetScore(
    priceScore: number,
    perfScore: number,
    contextScore: number
): number {
    // Quality gate: models must be "smart enough"
    const QUALITY_FLOOR = 55;
    let qualityMultiplier = 1;
    if (perfScore < QUALITY_FLOOR) {
        // Quadratic penalty for low-quality models
        qualityMultiplier = Math.pow(perfScore / QUALITY_FLOOR, 2);
    }

    // Efficiency metric: context per dollar
    const contextWeight = 0.6;  // Context highly valued for throughput
    const priceWeight = 0.4;    // Price matters but context matters more
    const efficiencyScore = (contextScore * contextWeight) + (priceScore * priceWeight);

    // Small intelligence bonus (not dominant)
    const INTEL_BONUS_WEIGHT = 0.15;
    const intelBonus = perfScore * INTEL_BONUS_WEIGHT;

    // Combine with quality gate
    const rawScore = (efficiencyScore * 0.85) + intelBonus;
    const finalScore = rawScore * qualityMultiplier;

    return Math.min(100, Math.max(0, finalScore));
}

// Legacy alias for backward compatibility
export const calculateGeometricMeanScore = (
    priceScore: number,
    perfScore: number,
    contextScore: number
): number => calculateSmartScore(priceScore, perfScore, contextScore, 100);

// Legacy alias for backward compatibility
export const calculateUtilityScore = calculateBudgetScore;

/**
 * Calculate value score based on selected mode.
 * 
 * @param maxPerfScore - For Smart Score, pass the max perf in the comparison set
 */
export function calculateValueScore(
    priceScore: number,
    perfScore: number,
    contextScore: number,
    mode: ScoringMode = "geometric",
    maxPerfScore: number = 100
): number {
    switch (mode) {
        case "utility":
            return calculateBudgetScore(priceScore, perfScore, contextScore);
        case "geometric":
        default:
            return calculateSmartScore(priceScore, perfScore, contextScore, maxPerfScore);
    }
}

/**
 * Get human-readable description of scoring mode.
 */
export function getScoringModeDescription(mode: ScoringMode): string {
    switch (mode) {
        case "utility":
            return "Efficiency-first with quality floor";
        case "geometric":
        default:
            return "Intelligence-first with dynamic tier weighting";
    }
}

/**
 * Get tier display info for UI.
 */
export function getTierDisplayInfo(tier: ModelTier): {
    label: string;
    color: string;
    bgColor: string;
    description: string;
} {
    switch (tier) {
        case "frontier":
            return {
                label: "Frontier",
                color: "text-purple-600 dark:text-purple-400",
                bgColor: "bg-purple-100 dark:bg-purple-900/30",
                description: "Top 10% — Premium tier, price barely matters",
            };
        case "pro":
            return {
                label: "Pro",
                color: "text-green-600 dark:text-green-400",
                bgColor: "bg-green-100 dark:bg-green-900/30",
                description: "70-90% — The deals zone, balance quality with savings",
            };
        case "budget":
            return {
                label: "Budget",
                color: "text-blue-600 dark:text-blue-400",
                bgColor: "bg-blue-100 dark:bg-blue-900/30",
                description: "Below 70% — Volume-first, price matters",
            };
    }
}
