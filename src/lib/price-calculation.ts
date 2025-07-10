import { OpenRouterModel } from '@/types/models';

/**
 * Safe division function that handles division by zero and infinite values
 */
export function safeDivision(numerator: number, denominator: number, fallback: number = 0): number {
  if (denominator === 0) return fallback;
  if (!isFinite(numerator) || !isFinite(denominator)) return fallback;
  const result = numerator / denominator;
  return isFinite(result) ? result : fallback;
}

/**
 * Safe percentage calculation that handles division by zero
 */
function safePercentageDifference(expensive: number, cheap: number): number {
  if (cheap === 0) {
    return expensive === 0 ? 0 : 999999; // Cap at 999,999% for display purposes
  }
  const percentage = ((expensive - cheap) / cheap) * 100;
  return isFinite(percentage) ? percentage : 999999;
}

/**
 * Safe cost ratio calculation that handles division by zero
 */
function safeCostRatio(expensive: number, cheap: number): number {
  if (cheap === 0) {
    return expensive === 0 ? 1 : 999999; // Cap at 999,999x for display purposes
  }
  const ratio = expensive / cheap;
  return isFinite(ratio) ? ratio : 999999;
}

/**
 * Check if a model is effectively free (cost less than $0.000001)
 */
function isEffectivelyFree(cost: number): boolean {
  return cost < 0.000001;
}

// Token estimation constants based on realistic usage patterns
export const TOKEN_ESTIMATES = {
  // Average mixed usage: simple + elaborate + complex queries
  PROMPT_TOKENS: 150,
  // Average AI response length
  COMPLETION_TOKENS: 300,
} as const;

// Query volume options with user-friendly contextual descriptions
export const QUERY_VOLUMES = [
  { 
    value: 1, 
    label: "Single Query", 
    description: "Testing a model",
    context: "Perfect for trying out different models before committing"
  },
  { 
    value: 10, 
    label: "10 Queries", 
    description: "Personal project",
    context: "Ideal for hobby projects or small experiments"
  },
  { 
    value: 100, 
    label: "100 Queries", 
    description: "Small business",
    context: "Great for small businesses with moderate AI usage"
  },
  { 
    value: 10000, 
    label: "10,000 Queries", 
    description: "Production application",
    context: "Suitable for live apps serving customers daily"
  },
  { 
    value: 1000000, 
    label: "1,000,000 Queries", 
    description: "Enterprise scale",
    context: "High-volume applications with millions of users"
  },
] as const;

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
}

export interface ModelComparison {
  modelA: string;
  modelB: string;
  costDifference: number;
  percentageDifference: number;
  costRatio: number;
  cheaperModel: string;
}

export interface PriceComparisonData {
  queryVolume: number;
  results: PriceCalculationResult[];
  cheapestModel: PriceCalculationResult;
  mostExpensiveModel: PriceCalculationResult;
  maxCostRatio: number;
  modelComparisons: ModelComparison[];
  averageCost: number;
  costSpread: number;
  yearlyProjections: {
    min: number;
    max: number;
    average: number;
  };
}

/**
 * Calculate the cost for a single query (prompt + completion) for a given model
 */
export function calculateQueryCost(model: OpenRouterModel): PriceCalculationResult {
  // Debug: Log raw API values to understand the format
  console.log(`🔍 RAW API VALUES for ${model.name}:`);
  console.log(`   Raw prompt string: "${model.pricing.prompt}"`);
  console.log(`   Raw completion string: "${model.pricing.completion}"`);
  console.log(`   parseFloat(prompt): ${parseFloat(model.pricing.prompt)}`);
  console.log(`   parseFloat(completion): ${parseFloat(model.pricing.completion)}`);
  
  // Test both interpretations
  const rawPromptPrice = parseFloat(model.pricing.prompt);
  const rawCompletionPrice = parseFloat(model.pricing.completion);
  
  // If API returns price per million tokens (expected format)
  const promptPricePerToken_v1 = rawPromptPrice / 1000000;
  const completionPricePerToken_v1 = rawCompletionPrice / 1000000;
  
  // If API returns price per token (alternative format)
  const promptPricePerToken_v2 = rawPromptPrice;
  const completionPricePerToken_v2 = rawCompletionPrice;
  
  console.log(`   Interpretation 1 (divide by 1M): prompt=${promptPricePerToken_v1.toFixed(8)}, completion=${completionPricePerToken_v1.toFixed(8)}`);
  console.log(`   Interpretation 2 (use as-is): prompt=${promptPricePerToken_v2.toFixed(8)}, completion=${completionPricePerToken_v2.toFixed(8)}`);
  
  // Based on analysis: OpenRouter API returns prices per token, not per million tokens
  // So we use the raw values directly (they're already per token)
  const promptPricePerToken = rawPromptPrice;
  const completionPricePerToken = rawCompletionPrice;
  
  const promptCost = promptPricePerToken * TOKEN_ESTIMATES.PROMPT_TOKENS;
  const completionCost = completionPricePerToken * TOKEN_ESTIMATES.COMPLETION_TOKENS;
  const costPerQuery = promptCost + completionCost;
  
  // Debug: Show calculation for verification (limited to avoid spam)
  if (Math.random() < 0.1) { // Show ~10% of calculations
    console.log(`💡 ${model.name}: $${model.pricing.prompt}/$${model.pricing.completion} per 1M tokens → $${costPerQuery.toFixed(6)} per query`);
  }
  
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
      const modelA = results[i];
      const modelB = results[j];
      
      const costDifference = Math.abs(modelA.totalCost - modelB.totalCost);
      const cheaperModel = modelA.totalCost < modelB.totalCost ? modelA.modelName : modelB.modelName;
      const cheaperCost = Math.min(modelA.totalCost, modelB.totalCost);
      const expensiveCost = Math.max(modelA.totalCost, modelB.totalCost);
      
      const percentageDifference = safePercentageDifference(expensiveCost, cheaperCost);
      const costRatio = safeCostRatio(expensiveCost, cheaperCost);
      
      comparisons.push({
        modelA: modelA.modelName,
        modelB: modelB.modelName,
        costDifference,
        percentageDifference,
        costRatio,
        cheaperModel,
      });
    }
  }
  
  // Sort by cost difference (descending) to show most significant differences first
  const sortedComparisons = comparisons.sort((a, b) => b.costDifference - a.costDifference);
  
  // For 4+ models, limit to most meaningful comparisons to prevent UI overload
  if (results.length >= 4) {
    const topComparisons = sortedComparisons.slice(0, MAX_COMPARISONS);
    
    // Always include comparison between cheapest and most expensive if not already included
    const cheapestModel = results[0];
    const mostExpensiveModel = results[results.length - 1];
    const hasMinMaxComparison = topComparisons.some(comp => 
      (comp.modelA === cheapestModel.modelName && comp.modelB === mostExpensiveModel.modelName) ||
      (comp.modelA === mostExpensiveModel.modelName && comp.modelB === cheapestModel.modelName)
    );
    
    if (!hasMinMaxComparison && topComparisons.length > 0) {
      // Replace the last comparison with the min-max comparison
      const costDifference = Math.abs(mostExpensiveModel.totalCost - cheapestModel.totalCost);
      const percentageDifference = safePercentageDifference(mostExpensiveModel.totalCost, cheapestModel.totalCost);
      const costRatio = safeCostRatio(mostExpensiveModel.totalCost, cheapestModel.totalCost);
      
      topComparisons[topComparisons.length - 1] = {
        modelA: cheapestModel.modelName,
        modelB: mostExpensiveModel.modelName,
        costDifference,
        percentageDifference,
        costRatio,
        cheaperModel: cheapestModel.modelName,
      };
    }
    
    return topComparisons;
  }
  
  return sortedComparisons;
}

/**
 * Calculate yearly projections based on monthly query volume
 */
function calculateYearlyProjections(costPerQuery: number, monthlyQueryVolume: number) {
  // Calculate yearly cost based on monthly volume
  const yearlyQueries = monthlyQueryVolume * 12;
  
  return costPerQuery * yearlyQueries;
}

/**
 * Calculate price comparison data for multiple models at a given query volume
 */
export function calculatePriceComparison(
  models: OpenRouterModel[],
  queryVolume: number = DEFAULT_QUERY_VOLUME
): PriceComparisonData {
  // Input validation
  if (!Array.isArray(models) || models.length === 0) {
    throw new Error('Models array must be provided and not empty');
  }
  
  if (typeof queryVolume !== 'number' || queryVolume < 0 || !isFinite(queryVolume)) {
    queryVolume = DEFAULT_QUERY_VOLUME;
  }
  
  // Calculate costs for each model
  const results = models
    .map(model => {
      try {
        const queryCost = calculateQueryCost(model);
        const totalCost = queryCost.costPerQuery * queryVolume;
        const yearlyProjection = calculateYearlyProjections(queryCost.costPerQuery, queryVolume);
        
        // Calculation verification (first model only) - always log to verify query volume changes
        if (model.id === models[0].id) {
          console.log(`💰 ${model.name}: $${queryCost.costPerQuery.toFixed(6)}/query × ${queryVolume.toLocaleString()} = $${totalCost.toFixed(2)} total`);
          console.log(`🔍 Pricing: $${(parseFloat(model.pricing.prompt) * 1000000).toFixed(2)}/$${(parseFloat(model.pricing.completion) * 1000000).toFixed(2)} per 1M tokens, ${TOKEN_ESTIMATES.PROMPT_TOKENS + TOKEN_ESTIMATES.COMPLETION_TOKENS} tokens/query`);
        }
        
        // Validate calculated values
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
        };
      }
    })
    .sort((a, b) => a.totalCost - b.totalCost); // Sort by total cost (ascending)
  
  // Calculate rankings and percentages from cheapest
  const cheapestCost = results[0].totalCost;
  results.forEach((result, index) => {
    result.ranking = index + 1;
    result.percentageFromCheapest = safePercentageDifference(result.totalCost, cheapestCost);
    result.costRatioFromCheapest = safeCostRatio(result.totalCost, cheapestCost);
  });
  
  const cheapestModel = results[0];
  const mostExpensiveModel = results[results.length - 1];
  const maxCostRatio = safeCostRatio(mostExpensiveModel.totalCost, cheapestModel.totalCost);
  
  // Calculate statistics
  const totalCosts = results.map(r => r.totalCost);
  const averageCost = totalCosts.reduce((sum, cost) => sum + cost, 0) / totalCosts.length;
  const costSpread = mostExpensiveModel.totalCost - cheapestModel.totalCost;
  
  // Generate model comparisons
  const modelComparisons = generateModelComparisons(results);
  
  // Calculate yearly projections
  const yearlyProjections = {
    min: Math.min(...results.map(r => r.yearlyProjection)),
    max: Math.max(...results.map(r => r.yearlyProjection)),
    average: results.reduce((sum, r) => sum + r.yearlyProjection, 0) / results.length,
  };
  
  return {
    queryVolume,
    results,
    cheapestModel,
    mostExpensiveModel,
    maxCostRatio,
    modelComparisons,
    averageCost,
    costSpread,
    yearlyProjections,
  };
}

/**
 * Generate enhanced hero text with more detailed insights
 */
export function generateHeroText(comparisonData: PriceComparisonData): string {
  const { queryVolume, results, cheapestModel, mostExpensiveModel, maxCostRatio, costSpread } = comparisonData;
  
  if (results.length < 2) {
    return `Cost analysis for ${queryVolume.toLocaleString()} queries per month`;
  }
  
  const volumeDescription = QUERY_VOLUMES.find(v => v.value === queryVolume)?.description || 'queries';
  const cheapestIsFree = isEffectivelyFree(cheapestModel.totalCost);
  const mostExpensiveIsFree = isEffectivelyFree(mostExpensiveModel.totalCost);
  
  // Handle all models being free
  if (cheapestIsFree && mostExpensiveIsFree) {
    return `Great news! All selected models are essentially free for ${volumeDescription.toLowerCase()} (${queryVolume.toLocaleString()} queries/month).`;
  }
  
  // Handle cheapest model being free
  if (cheapestIsFree) {
    return `For ${volumeDescription.toLowerCase()} (${queryVolume.toLocaleString()} queries/month), ${cheapestModel.modelName} is essentially free while ${mostExpensiveModel.modelName} costs ${formatCostDisplay(mostExpensiveModel.totalCost)}/month. Annual savings potential: ${formatCostDisplay(mostExpensiveModel.totalCost * 12)}.`;
  }
  
  // Handle capped ratios (very large differences)
  if (maxCostRatio >= 999999) {
    return `For ${volumeDescription.toLowerCase()} (${queryVolume.toLocaleString()} queries/month), there's an extreme cost difference between models. ${mostExpensiveModel.modelName} costs ${formatCostDisplay(costSpread)} more than ${cheapestModel.modelName}. Choose wisely to save ${formatCostDisplay(costSpread * 12)} annually.`;
  }
  
  // Generate contextual hero text with more insights
  if (maxCostRatio >= 10) {
    return `For ${volumeDescription.toLowerCase()} (${queryVolume.toLocaleString()} queries/month), ${mostExpensiveModel.modelName} costs ${formatCostDisplay(costSpread)} more than ${cheapestModel.modelName} — that's ${maxCostRatio.toFixed(1)}x more expensive! Choosing wisely could save ${formatCostDisplay(costSpread * 12)} annually.`;
  } else if (maxCostRatio >= 2) {
    return `For ${volumeDescription.toLowerCase()} (${queryVolume.toLocaleString()} queries/month), ${mostExpensiveModel.modelName} is ${maxCostRatio.toFixed(1)}x more expensive than ${cheapestModel.modelName}. Annual savings potential: ${formatCostDisplay(costSpread * 12)}.`;
  } else {
    return `For ${volumeDescription.toLowerCase()} (${queryVolume.toLocaleString()} queries/month), model costs are relatively similar with ${formatCostDisplay(costSpread)} monthly difference.`;
  }
}

/**
 * Format cost for display with appropriate precision and comma separators
 */
export function formatCostDisplay(cost: number): string {
  // Handle invalid inputs
  if (typeof cost !== 'number' || isNaN(cost)) {
    return '$0.00';
  }
  
  // Handle infinite values
  if (!isFinite(cost)) {
    return cost > 0 ? '$999,999+' : '$0.00';
  }
  
  // Handle negative values
  if (cost < 0) return `-${formatCostDisplay(Math.abs(cost))}`;
  
  // Handle zero and effectively free
  if (cost === 0 || isEffectivelyFree(cost)) return '$0.00';
  
  // For very small amounts, show more decimal places
  if (cost < 0.0001) {
    return `$${cost.toFixed(6)}`; // e.g., $0.000001
  }
  
  // For small amounts under a cent
  if (cost < 0.01) {
    return `$${cost.toFixed(4)}`; // e.g., $0.0012
  }
  
  // For amounts under a dollar
  if (cost < 1) {
    return `$${cost.toFixed(3)}`; // e.g., $0.123
  }
  
  // For amounts under $100
  if (cost < 100) {
    return `$${cost.toFixed(2)}`; // e.g., $12.34
  }
  
  // For larger amounts with comma separators
  if (cost < 1000) {
    return `$${cost.toFixed(0)}`; // e.g., $123
  }
  
  // Handle very large amounts
  if (cost >= 999999) {
    return '$999,999+';
  }
  
  return `$${cost.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`; // e.g., $1,234.56
}

/**
 * Format cost for per-query display
 */
export function formatCostPerQuery(cost: number): string {
  return `${formatCostDisplay(cost)} per query`;
}

/**
 * Format cost for monthly display
 */
export function formatMonthlyCost(cost: number): string {
  return `${formatCostDisplay(cost)}/month`;
}

/**
 * Format cost for yearly display
 */
export function formatYearlyCost(cost: number): string {
  return `${formatCostDisplay(cost)}/year`;
}

/**
 * Get cost ratio between two models
 */
export function getCostRatio(expensiveModel: PriceCalculationResult, cheapModel: PriceCalculationResult): number {
  return safeCostRatio(expensiveModel.totalCost, cheapModel.totalCost);
}

/**
 * Generate cost disclaimer text
 */
export function getCostDisclaimer(): string {
  return "💡 Cost estimates are based on OpenRouter pricing for API calls only. This does not include compute costs for web app hosting, database operations, CDN delivery, or additional infrastructure required to support LLM integration in production environments.";
} 