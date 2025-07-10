import { OpenRouterModel } from '@/types/models';

// Token estimation constants based on realistic usage patterns
export const TOKEN_ESTIMATES = {
  // Average mixed usage: simple + elaborate + complex queries
  PROMPT_TOKENS: 150,
  // Average AI response length
  COMPLETION_TOKENS: 300,
} as const;

// Query volume options with contextual descriptions
export const QUERY_VOLUMES = [
  { value: 1, label: "1 Query", description: "Single test" },
  { value: 10, label: "10 Queries", description: "Light usage" },
  { value: 100, label: "100 Queries", description: "Regular usage" },
  { value: 10000, label: "10K Queries", description: "Production app" },
  { value: 1000000, label: "1M Queries", description: "Enterprise scale" },
] as const;

export const DEFAULT_QUERY_VOLUME = 100;

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
  const promptPricePerToken = parseFloat(model.pricing.prompt);
  const completionPricePerToken = parseFloat(model.pricing.completion);
  
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
  };
}

/**
 * Generate detailed model-to-model comparisons
 */
function generateModelComparisons(results: PriceCalculationResult[]): ModelComparison[] {
  const comparisons: ModelComparison[] = [];
  
  // Generate all pairwise comparisons
  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      const modelA = results[i];
      const modelB = results[j];
      
      const costDifference = Math.abs(modelA.totalCost - modelB.totalCost);
      const cheaperModel = modelA.totalCost < modelB.totalCost ? modelA.modelName : modelB.modelName;
      const cheaperCost = Math.min(modelA.totalCost, modelB.totalCost);
      const expensiveCost = Math.max(modelA.totalCost, modelB.totalCost);
      
      const percentageDifference = ((expensiveCost - cheaperCost) / cheaperCost) * 100;
      const costRatio = expensiveCost / cheaperCost;
      
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
  return comparisons.sort((a, b) => b.costDifference - a.costDifference);
}

/**
 * Calculate yearly projections based on different scaling scenarios
 */
function calculateYearlyProjections(costPerQuery: number, currentQueryVolume: number) {
  // Estimate yearly queries based on current volume
  const dailyQueries = currentQueryVolume;
  const yearlyQueries = dailyQueries * 365;
  
  return costPerQuery * yearlyQueries;
}

/**
 * Calculate price comparison data for multiple models at a given query volume
 */
export function calculatePriceComparison(
  models: OpenRouterModel[],
  queryVolume: number = DEFAULT_QUERY_VOLUME
): PriceComparisonData {
  // Calculate costs for each model
  const results = models
    .map(model => {
      const queryCost = calculateQueryCost(model);
      return {
        ...queryCost,
        totalCost: queryCost.costPerQuery * queryVolume,
        yearlyProjection: calculateYearlyProjections(queryCost.costPerQuery, queryVolume),
      };
    })
    .sort((a, b) => a.totalCost - b.totalCost); // Sort by total cost (ascending)
  
  // Calculate rankings and percentages from cheapest
  const cheapestCost = results[0].totalCost;
  results.forEach((result, index) => {
    result.ranking = index + 1;
    result.percentageFromCheapest = ((result.totalCost - cheapestCost) / cheapestCost) * 100;
    result.costRatioFromCheapest = result.totalCost / cheapestCost;
  });
  
  const cheapestModel = results[0];
  const mostExpensiveModel = results[results.length - 1];
  const maxCostRatio = mostExpensiveModel.totalCost / cheapestModel.totalCost;
  
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
 * Format cost for display with appropriate precision
 */
export function formatCostDisplay(cost: number): string {
  if (cost < 0.001) return `$${(cost * 1000000).toFixed(2)}µ`; // Micro dollars
  if (cost < 0.01) return `$${(cost * 1000).toFixed(2)}‰`; // Per mille
  if (cost < 1) return `$${cost.toFixed(3)}`;
  if (cost < 100) return `$${cost.toFixed(2)}`;
  return `$${cost.toFixed(0)}`;
}

/**
 * Get cost ratio between two models
 */
export function getCostRatio(expensiveModel: PriceCalculationResult, cheapModel: PriceCalculationResult): number {
  return expensiveModel.totalCost / cheapModel.totalCost;
}

/**
 * Generate cost disclaimer text
 */
export function getCostDisclaimer(): string {
  return "💡 Cost estimates are based on OpenRouter pricing for API calls only. This does not include compute costs for web app hosting, database operations, CDN delivery, or additional infrastructure required to support LLM integration in production environments.";
} 