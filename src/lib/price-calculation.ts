

import { OpenRouterModel } from '@/types/models';
import { getModelEval, CONTEXT_FALLBACKS } from './static-eval-map';

import { calculateCapabilityBonus, getCapabilityFlags } from './capability-bonus';
import {
  AA_ATTRIBUTION,
  getMMLUProSync
} from './artificial-analysis-api';

// Re-export AA attribution for UI components
export { AA_ATTRIBUTION };


/**
 * Safe division function that handles division by zero and infinite values
 */
export function safeCostRatio(costA: number, costB: number): number {
  if (costB === 0) {
    if (costA === 0) return 1; // Both free = 1x
    return 0; // If B is free and A is not, ratio is undefined/infinite, return 0 as "infinite" symbol
  }
  const ratio = costA / costB;
  return isFinite(ratio) ? ratio : 0;
}

/**
 * Safe percentage calculation
 */
export function safePercentageDifference(costA: number, costB: number): number {
  if (costB === 0) return 0;
  const percentage = ((costA - costB) / costB) * 100;
  return isFinite(percentage) ? percentage : 0;
}

/**
 * Formats a cost value for display
 * - Shows $0.00 for very small values but not zero
 * - Shows <$0.01 for values between 0 and 0.01
 */
export function formatCostDisplay(cost: number): string {
  if (cost === 0) return "$0.00";
  if (cost < 0.01) return "<$0.01";
  return `$${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Gets a cost disclaimer message
 */
export function getCostDisclaimer(): string {
  return "Cost estimates based on public API pricing. Actual costs may vary due to provider differences, volume discounts, or pricing updates.";
}

// Default constants for calculations
export const TOKEN_ESTIMATES = {
  // Average tokens per "query" (prompt + completion)
  // Assumes a mix of short/long tasks. 
  // 1k input + 500 output is a reasonable average for complex tasks
  PROMPT_TOKENS: 1000,
  COMPLETION_TOKENS: 500
} as const;

export const USAGE_SCENARIOS = [
  {
    id: 'light',
    label: 'Light Use',
    value: 10000,
    description: "Personal projects, testing",
    context: "Occasional API calls"
  },
  {
    id: 'moderate',
    label: 'Moderate Use',
    value: 100000,
    description: "Production apps, small teams",
    context: "Regular daily usage"
  },
  {
    id: 'heavy',
    label: 'Heavy Use',
    value: 1000000,
    description: "High-traffic services",
    context: "SaaS platforms, data processing"
  },
  {
    id: 'enterprise',
    label: 'Enterprise Scale',
    value: 10000000,
    description: "Enterprise scale",
    context: "High-volume applications with millions of users"
  },
] as const;

// Alias for backward compatibility if needed
export const QUERY_VOLUMES = USAGE_SCENARIOS;

export const DEFAULT_QUERY_VOLUME = 1000000;

export interface PriceCalculationResult {
  modelId: string;
  modelName: string;
  provider: string;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  costPerQuery: number;
  promptCost: number;
  completionCost: number;
  yearlyProjection: number;
  ranking: number;
  percentageFromCheapest: number;
  costRatioFromCheapest: number;
  contextLength: number;
  priceScore: number;
  perfScore: number;
  contextScore: number;
  valueScore: number;
  eloScore?: number;
  eloSource?: 'lmsys' | 'estimated' | 'heuristic' | 'artificial-analysis' | 'mmlu-pro' | 'static-override' | 'insufficient-data';
  mmluPro?: number;
  tier?: 'sota' | 'pro' | 'standard' | 'basic'; // Added for UI display
  /** Detected capabilities (e.g., ['Thinking', 'Multimodal', 'Tools']) */
  capabilityFlags?: string[];
}

export interface ModelComparison {
  modelA: string;
  modelB: string;
  costDifference: number;
  percentageDifference: number;
  costRatio: number;
}

export interface PriceComparisonData {
  results: PriceCalculationResult[];
  cheapestModel: PriceCalculationResult;
  mostExpensiveModel: PriceCalculationResult;
  comparisons: ModelComparison[];
  queryVolume: number;
  yearlyProjections: {
    min: number;
    max: number;
    average: number;
  };
}

/**
 * Calculate cost for a single query using a specific model
 */
export function calculateQueryCost(model: OpenRouterModel): PriceCalculationResult {
  // Parse pricing strings to numbers (handle "0" and various formats)
  const parsePrice = (priceStr: string | undefined): number => {
    if (!priceStr) return 0;
    // Handle "-1" which OpenRouter sometimes returns for unknown prices? 
    // Usually it's just "0" or "0.0000..."
    const parsed = parseFloat(priceStr);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  };

  const rawPromptPrice = parsePrice(model.pricing.prompt);
  const rawCompletionPrice = parsePrice(model.pricing.completion);

  // OpenRouter pricing is typically per 1M tokens, but the string is usually raw per-token value?
  // Let's verify standard OpenRouter API format.
  // Actually, OpenRouter API returns pricing per token as a string, e.g. "0.0000005"
  // So we use the raw values directly (they're already per token)
  const promptPricePerToken = rawPromptPrice;
  const completionPricePerToken = rawCompletionPrice;

  const promptCost = promptPricePerToken * TOKEN_ESTIMATES.PROMPT_TOKENS;
  const completionCost = completionPricePerToken * TOKEN_ESTIMATES.COMPLETION_TOKENS;
  const costPerQuery = promptCost + completionCost;

  return {
    modelId: model.id,
    modelName: model.name,
    provider: model.id.split('/')[0] || 'Unknown',
    inputCost: promptCost,
    outputCost: completionCost,
    totalCost: costPerQuery, // Will be multiplied by query volume later
    costPerQuery,
    promptCost,
    completionCost,
    yearlyProjection: 0, // Will be calculated later
    ranking: 0, // Will be assigned later
    percentageFromCheapest: 0, // Will be calculated later
    costRatioFromCheapest: 0, // Will be calculated later
    // Initialize new fields
    contextLength: model.context_length,
    valueScore: 0,
    contextScore: 0,
    priceScore: 0,
    perfScore: 0,
    eloScore: undefined,
    eloSource: undefined,
  };
}

/**
 * Generate detailed model-to-model comparisons (optimized for 4+ models)
 */
function generateModelComparisons(results: PriceCalculationResult[]): ModelComparison[] {
  const comparisons: ModelComparison[] = [];

  // For performance, limit comparisons for large model sets
  const MAX_COMPARISONS = 10;

  // Generate all pairwise comparisons
  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      if (comparisons.length >= MAX_COMPARISONS) break;

      const modelA = results[i];
      const modelB = results[j];

      comparisons.push({
        modelA: modelA.modelName,
        modelB: modelB.modelName,
        costDifference: Math.abs(modelA.totalCost - modelB.totalCost),
        percentageDifference: safePercentageDifference(modelA.totalCost, modelB.totalCost),
        costRatio: safeCostRatio(modelA.totalCost, modelB.totalCost),
      });
    }
  }

  return comparisons;
}

/**
 * Main calculation function suitable for server-side or client-side use
 */
export function calculatePriceComparison(
  models: OpenRouterModel[],
  queryVolume: number = DEFAULT_QUERY_VOLUME
): PriceComparisonData {
  if (!models || models.length === 0) {
    return {
      results: [],
      cheapestModel: {} as PriceCalculationResult,
      mostExpensiveModel: {} as PriceCalculationResult,
      comparisons: [],
      queryVolume,
      yearlyProjections: { min: 0, max: 0, average: 0 }
    };
  }

  // Calculate base costs for all models
  const results = models
    .map(model => {
      try {
        const queryCost = calculateQueryCost(model);
        const totalCost = queryCost.costPerQuery * queryVolume;
        const yearlyProjection = totalCost * 12;

        return {
          ...queryCost,
          totalCost: isFinite(totalCost) ? totalCost : 0,
          yearlyProjection: isFinite(yearlyProjection) ? yearlyProjection : 0,
        };
      } catch (error) {
        console.warn(`Error calculating cost for model ${model.id}: `, error);
        // Return a safe fallback result
        return {
          modelId: model.id,
          modelName: model.name,
          provider: model.id.split('/')[0] || 'Unknown',
          inputCost: 0,
          outputCost: 0,
          totalCost: 0,
          costPerQuery: 0,
          promptCost: 0,
          completionCost: 0,
          yearlyProjection: 0,
          ranking: 0,
          percentageFromCheapest: 0,
          costRatioFromCheapest: 1,
          contextLength: 0,
          valueScore: 0,
          contextScore: 0,
          priceScore: 0,
          perfScore: 0,
          eloScore: undefined,
          eloSource: undefined,
        };
      }
    })
    .sort((a, b) => a.totalCost - b.totalCost); // Sort by total cost (ascending)

  // --- SCORING LOGIC (The "Better Math") ---

  // Find min/max for normalization
  const minCost = results[0].totalCost; // Already sorted
  const maxContext = Math.max(...results.map(r => r.contextLength));
  const minContext = Math.min(...results.map(r => r.contextLength));
  // Note: minContext and maxContext are kept for potential future dynamic scaling
  void maxContext; void minContext; // Silence unused warnings

  // Calculate specific scores for each model
  results.forEach((result) => {
    // Determine effective context length (Use fallbacks for API errors like DeepSeek = 0)
    let effectiveContext = result.contextLength;
    if (effectiveContext === 0 && CONTEXT_FALLBACKS[result.modelId]) {
      effectiveContext = CONTEXT_FALLBACKS[result.modelId];
    } else if (effectiveContext === 0) {
      effectiveContext = 4096; // Safe minimum fallback
    }
    // Update the result object so charts show the corrected value
    result.contextLength = effectiveContext;

    // 1. Price Score (Inverse Cost Ratio with Anti-Gaming Dampening)
    // Problem: Ultra-cheap/free models can game the index with perfect price scores
    // Solution: Log dampening + intelligence weighting
    let rawPriceScore = 0;
    if (result.totalCost <= 0.000001) {
      rawPriceScore = 100;
    } else {
      // If minCost is 0 (effectively free), we can't do inverse ratio properly against non-zero.
      // But if minCost > 0, we do min/current.
      // If result.totalCost is huge, ratio -> 0.
      rawPriceScore = (Math.max(minCost, 0.000001) / result.totalCost) * 100;
    }

    // Anti-gaming: Log dampening to prevent extreme price scores
    // Maps 0-100 to ~10-90 range with diminishing returns
    // Formula: 90 * log10(1 + rawScore/10) / log10(11) 
    // At rawScore=100: result ≈ 90, at rawScore=50: result ≈ 69, at rawScore=10: result ≈ 38
    const LOG_CEILING = 90; // Maximum dampened price score
    const LOG_BASE = Math.log10(11); // Normalizer so score=100 → ~90
    const priceScore = LOG_CEILING * Math.log10(1 + rawPriceScore / 10) / LOG_BASE;

    // 2. Context Score (Enhanced with Diminishing Returns)
    // Sweet spot: 128k = 75 points, 256k+ has slower gains
    let contextScore = 0;
    const MIN_USEFUL = 4096;
    const SWEET_SPOT = 128000;
    const DIMINISHING_THRESHOLD = 256000;
    const MAX_CONTEXT = 2000000; // 2M ceiling

    const effectiveLength = Math.max(result.contextLength, MIN_USEFUL);
    const logContext = Math.log10(effectiveLength);
    const logMin = Math.log10(MIN_USEFUL);
    const logSweet = Math.log10(SWEET_SPOT);
    const logMax = Math.log10(MAX_CONTEXT);

    if (result.contextLength <= MIN_USEFUL) {
      contextScore = 0;
    } else if (result.contextLength <= DIMINISHING_THRESHOLD) {
      // Normal log scaling up to 256k (0-85 range)
      contextScore = ((logContext - logMin) / (logSweet - logMin)) * 75;
      contextScore = Math.min(85, contextScore);
    } else {
      // Diminishing returns after 256k (85-100 range)
      const logDim = Math.log10(DIMINISHING_THRESHOLD);
      const baseScore = 85;
      const bonus = ((logContext - logDim) / (logMax - logDim)) * 15;
      contextScore = Math.min(100, baseScore + bonus);
    }

    // 3. Performance Score (Cascading: MMLU-Pro (AA) → Static Override → Insufficient Data)
    // We strictly avoid "estimating" or "hallucinating" data for missing models.

    let elo = 0;
    const mmluPro = getMMLUProSync(result.modelId);
    let eloSource: 'mmlu-pro' | 'lmsys' | 'estimated' | 'heuristic' | 'artificial-analysis' | 'static-override' | 'insufficient-data' = 'insufficient-data';

    const staticEval = getModelEval(result.modelId);

    // Check for explicit overrides logic first (e.g. for brand new models where we manually entered data)
    // Or if MMLU data is missing but we have a trusted static eval
    if (staticEval?.source === 'static-override') {
      elo = staticEval.elo;
      eloSource = 'static-override';
    } else if (mmluPro !== null) {
      // Primary Path: Use MMLU-Pro from Artificial Analysis
      // Map 0-100 MMLU to 1000-1550 Elo scale
      // Formula: 1000 + (MMLU/100)^1.2 * 700? 
      // Simpler Linear Mapping for Transparency:
      // <50 -> 1000-1200
      // 50-70 -> 1200-1350
      // 70-85 -> 1350-1480
      // >85 -> 1480-1550+

      // Power curve to separate top end: 
      // 1000 + (score/100)^1.5 * 600
      // 90 -> 1000 + 0.85 * 600 = 1510
      // 88.9 (Opus 4.5) -> 1000 + 0.83 * 600 = ~1500
      // 75 (GPT-4o) -> 1000 + 0.65 * 600 = ~1390
      // 50 -> 1000 + 0.35 * 600 = ~1210

      // Let's use the plan's formula: 1000 + (MMLU/100)^1.2 * 700 (Wait, plan said 700 span)
      // 1000 + (88.9/100)^1.2 * 700 = 1000 + 0.86 * 700 = 1602 (Too high?)
      // Let's tune to: 1000 + (MMLU/100)^1.5 * 650
      // 88.9 -> 1000 + 0.838 * 650 = 1544 (Perfect for SOTA)
      // 74.8 (GPT-4o) -> 1000 + 0.647 * 650 = 1420 (Solid Pro Tier)
      // 50 -> 1000 + 0.35 * 650 = 1229 (Entry Tier)

      elo = 1000 + Math.pow(mmluPro / 100, 1.5) * 650;
      eloSource = 'mmlu-pro';

    } else {
      // Insufficient Data
      // We do NOT fall back to heuristics or estimates.
      // Effectively score is 0, will be filtered out or shown as "N/A"
      elo = 0;
      eloSource = 'insufficient-data';
    }

    // Apply capability bonuses only if we have a valid base score
    let perfScore = 0;

    // Normalize Elo (1000-1650 range) to 0-100 base score
    // 1000 -> 0
    // 1650 -> 100
    // Formula: (Elo - 1000) / 6.5
    if (elo > 0) {
      perfScore = Math.max(0, Math.min(100, (elo - 1000) / 6.5));
    }

    // 3b. Apply capability bonuses to perfScore (thinking, multimodal, tools)
    // Find the original model to check capabilities
    const originalModel = models.find(m => m.id === result.modelId);
    if (originalModel) {
      const capabilityBonus = calculateCapabilityBonus(originalModel);
      // Add bonus but cap at 100
      perfScore = Math.min(100, perfScore + capabilityBonus);
      // Store capability flags for UI display
      result.capabilityFlags = getCapabilityFlags(originalModel);
    }

    // 4. Composite Value Score (WEIGHTED Geometric Mean)
    // Philosophy: Intelligence is KING - a smarter model should almost always win
    // Weights: Performance 2x, Price 1x, Context 1x → (perf² × price × context)^(1/4)
    // This ensures a 100 intel model beats a 73 intel model even with price disadvantage

    // Add epsilon to prevent 0s from completely zeroing the score
    const epsilon = 1;
    const pNorm = (priceScore + epsilon) / 100;
    const perfNorm = (perfScore + epsilon) / 100;
    const ctxNorm = (contextScore + epsilon) / 100;

    // Weighted geometric mean: performance counts DOUBLE (50% weight vs 25% each for price/context)
    // Formula: (perf² × price × context)^(1/4) - the 4th root normalizes total weight of 4
    const weightedProduct = Math.pow(perfNorm, 2) * pNorm * ctxNorm;
    const geometricMean = Math.pow(weightedProduct, 1 / 4) * 100;
    const valueScore = Math.min(100, geometricMean);

    // Assign to result object
    result.priceScore = Math.round(Math.max(0, Math.min(100, priceScore)));
    result.contextScore = Math.round(Math.max(0, Math.min(100, contextScore)));
    result.perfScore = Math.round(Math.max(0, Math.min(100, perfScore)));
    result.eloScore = elo;
    result.eloSource = eloSource;
    result.valueScore = Math.round(Math.max(0, Math.min(100, valueScore)) * 10) / 10; // 1 decimal place

    // Standard rankings & metrics
    result.ranking = 0; // Set in next loop
    result.percentageFromCheapest = safePercentageDifference(result.totalCost, minCost);
    result.costRatioFromCheapest = safeCostRatio(result.totalCost, minCost);
  });

  // Calculate rankings based on Cost (standard behavior)
  results.forEach((result, index) => {
    result.ranking = index + 1;
  });

  const cheapestModel = results[0];
  const mostExpensiveModel = results[results.length - 1];
  // const maxCostRatio = safeCostRatio(mostExpensiveModel.totalCost, cheapestModel.totalCost); // Unused

  // Calculate aggregate stats
  const totalYearly = results.reduce((sum, r) => sum + r.yearlyProjection, 0);
  const averageYearly = totalYearly / results.length;

  return {
    results,
    cheapestModel,
    mostExpensiveModel,
    comparisons: generateModelComparisons(results),
    queryVolume,
    yearlyProjections: {
      min: cheapestModel.yearlyProjection,
      max: mostExpensiveModel.yearlyProjection,
      average: averageYearly
    }
  };
}