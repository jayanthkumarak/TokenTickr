
import { OpenRouterModel } from '@/types/models';
import { getModelEval, ELO_BOUNDARRIES, CONTEXT_FALLBACKS } from './static-eval-map';
import { calculateHeuristicElo } from './heuristic-engine';
import { calculateCapabilityBonus, getCapabilityFlags } from './capability-bonus';

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
  totalCost: number;
  costPerQuery: number;
  promptCost: number;
  completionCost: number;
  yearlyProjection: number;
  ranking: number;
  percentageFromCheapest: number;
  costRatioFromCheapest: number;
  // New scoring fields
  contextLength: number;
  valueScore: number;
  contextScore: number;
  priceScore: number;
  /** Normalized performance score (0-100, based on Elo + capability bonuses) */
  perfScore: number;
  /** Raw Elo score if available */
  eloScore: number | null;
  /** Source of the Elo score ('lmsys', 'estimated', or 'heuristic') */
  eloSource: string | null;
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
    eloScore: null,
    eloSource: null,
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
        console.warn(`Error calculating cost for model ${model.id}:`, error);
        // Return a safe fallback result
        return {
          modelId: model.id,
          modelName: model.name,
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
          eloScore: null,
          eloSource: null,
        };
      }
    })
    .sort((a, b) => a.totalCost - b.totalCost); // Sort by total cost (ascending)

  // --- SCORING LOGIC (The "Better Math") ---

  // Find min/max for normalization
  const minCost = results[0].totalCost; // Already sorted
  const maxContext = Math.max(...results.map(r => r.contextLength));
  const minContext = Math.min(...results.map(r => r.contextLength));
  // Use a sensible minimum for log scale (e.g., 1024 or 4096) to prevent 0 or negative logs from bad data
  const logMaxContext = Math.log10(Math.max(maxContext, 2048));
  const logMinContext = Math.log10(Math.max(minContext, 2048));

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

    // 1. Price Score (Inverse Cost Ratio)
    let priceScore = 0;
    if (result.totalCost <= 0.000001) {
      priceScore = 100;
    } else {
      // If minCost is 0 (effectively free), we can't do inverse ratio properly against non-zero.
      // But if minCost > 0, we do min/current.
      // If result.totalCost is huge, ratio -> 0.
      priceScore = (Math.max(minCost, 0.000001) / result.totalCost) * 100;
    }

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

    // 3. Performance Score (Elo Normalized)
    const evalData = getModelEval(result.modelId);
    let elo: number | null = evalData?.elo || null;
    let eloSource: string | null = evalData?.source || null;

    // If no curated Elo, use heuristic engine
    if (!elo) {
      // Find the original model for heuristic calculation
      const originalModel = models.find(m => m.id === result.modelId);
      if (originalModel) {
        const heuristic = calculateHeuristicElo(originalModel);
        elo = heuristic.elo;
        eloSource = heuristic.source;
      }
    }

    let perfScore = 0;
    if (elo) {
      // Normalize: (Elo - Min) / (Max - Min) * 100
      // Clamp to 0-100 range
      const normalized = ((elo - ELO_BOUNDARRIES.MIN_RELEVANT) / (ELO_BOUNDARRIES.MAX_SOTA - ELO_BOUNDARRIES.MIN_RELEVANT)) * 100;
      perfScore = Math.max(0, Math.min(100, normalized));
      result.eloSource = eloSource; // Store source for UI
      result.eloScore = elo; // Store elo for display
    } else {
      // Ultimate fallback (should rarely happen now)
      perfScore = 50;
      result.eloSource = null;
    }

    // 3b. Apply capability bonuses to perfScore (thinking, multimodal, tools)
    // Find the original model to check capabilities
    const originalModel = models.find(m => m.id === result.modelId);
    if (originalModel) {
      const capabilityBonus = calculateCapabilityBonus(originalModel);
      perfScore = Math.min(100, perfScore + capabilityBonus);
      // Store capability flags for UI display
      result.capabilityFlags = getCapabilityFlags(originalModel);
    }

    // 4. Composite Value Score (Geometric Mean)
    // Philosophy: Balanced excellence - weak in any dimension drags down overall score
    // Geometric mean naturally handles the "5x context" problem via cube root scaling

    // Add epsilon to prevent 0s from completely zeroing the score
    const epsilon = 1;
    const pNorm = (priceScore + epsilon) / 100;
    const perfNorm = (perfScore + epsilon) / 100;
    const ctxNorm = (contextScore + epsilon) / 100;

    // Geometric mean: cube root of product, then scale back to 0-100
    const geometricMean = Math.pow(pNorm * perfNorm * ctxNorm, 1 / 3) * 100;
    const valueScore = Math.min(100, geometricMean);

    // Assign to result object
    result.priceScore = Math.round(Math.max(0, Math.min(100, priceScore)));
    result.contextScore = Math.round(Math.max(0, Math.min(100, contextScore)));
    result.perfScore = Math.round(Math.max(0, Math.min(100, perfScore)));
    result.eloScore = elo;
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