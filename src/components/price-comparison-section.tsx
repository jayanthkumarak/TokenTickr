"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign } from "lucide-react";
import { OpenRouterModel } from "@/types/models";
import { QueryVolumeSelector } from "./query-volume-selector";
import { PriceComparisonChart } from "./price-comparison-chart";
import { 
  calculatePriceComparison, 
  generateHeroText, 
  DEFAULT_QUERY_VOLUME,
  formatCostDisplay 
} from "@/lib/price-calculation";
import { cn } from "@/lib/utils";

interface PriceComparisonSectionProps {
  models: (OpenRouterModel | null)[];
  className?: string;
}

export function PriceComparisonSection({ 
  models, 
  className 
}: PriceComparisonSectionProps) {
  const [queryVolume, setQueryVolume] = useState(DEFAULT_QUERY_VOLUME);
  
  // Filter out null models and ensure we have at least 2 models
  const validModels = useMemo(() => {
    return models.filter((model): model is OpenRouterModel => model !== null);
  }, [models]);

  // Calculate price comparison data
  const comparisonData = useMemo(() => {
    if (validModels.length < 2) return null;
    return calculatePriceComparison(validModels, queryVolume);
  }, [validModels, queryVolume]);

  // Generate hero text
  const heroText = useMemo(() => {
    if (!comparisonData) return "";
    return generateHeroText(comparisonData);
  }, [comparisonData]);

  // Don't render if we don't have enough models
  if (validModels.length < 2) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Price Comparison</h2>
        </div>
        <p className="text-muted-foreground">
          Compare costs across different usage volumes
        </p>
      </div>

      {/* Query Volume Selector */}
      <div className="max-w-md mx-auto">
        <div className="mb-2">
          <label className="text-sm font-medium">Query Volume</label>
          <p className="text-xs text-muted-foreground">
            Select your expected usage to see cost differences
          </p>
        </div>
        <QueryVolumeSelector
          value={queryVolume}
          onValueChange={setQueryVolume}
        />
      </div>

      {/* Hero Text */}
      {heroText && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-lg font-semibold text-primary mb-1">
                  Key Insight
                </p>
                <p className="text-foreground">
                  {heroText}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Comparison Chart */}
      {comparisonData && (
        <PriceComparisonChart
          data={comparisonData}
        />
      )}

      {/* Cost Breakdown Summary */}
      {comparisonData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Cost breakdown for {queryVolume.toLocaleString()} queries per month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cheapest Model */}
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Most Cost-Effective</div>
                <div className="font-semibold text-green-700 dark:text-green-400">
                  {comparisonData.cheapestModel.modelName}
                </div>
                <div className="text-lg font-bold text-green-600 dark:text-green-500">
                  {formatCostDisplay(comparisonData.cheapestModel.totalCost)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCostDisplay(comparisonData.cheapestModel.costPerQuery)} per query
                </div>
              </div>

              {/* Most Expensive Model */}
              <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Most Expensive</div>
                <div className="font-semibold text-red-700 dark:text-red-400">
                  {comparisonData.mostExpensiveModel.modelName}
                </div>
                <div className="text-lg font-bold text-red-600 dark:text-red-500">
                  {formatCostDisplay(comparisonData.mostExpensiveModel.totalCost)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCostDisplay(comparisonData.mostExpensiveModel.costPerQuery)} per query
                </div>
              </div>

              {/* Cost Ratio */}
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Cost Difference</div>
                <div className="font-semibold text-blue-700 dark:text-blue-400">
                  {comparisonData.maxCostRatio.toFixed(1)}x
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-500">
                  {formatCostDisplay(
                    comparisonData.mostExpensiveModel.totalCost - 
                    comparisonData.cheapestModel.totalCost
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  potential savings
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technical Details */}
      <Card className="border-muted">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Calculation basis:</strong> 150 prompt tokens + 300 completion tokens per query
            </p>
            <p>
              <strong>Note:</strong> Actual costs may vary based on your specific prompts and model responses
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PriceComparisonSection; 