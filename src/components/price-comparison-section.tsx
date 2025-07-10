"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign } from "lucide-react";
import { OpenRouterModel } from "@/types/models";
import { QueryVolumeSelector } from "./query-volume-selector";
import { PriceComparisonChart } from "./price-comparison-chart";
import { HeroInsight } from "./hero-insight";
// import { InsightsPanel } from "./insights-panel";
import { 
  calculatePriceComparison, 
  DEFAULT_QUERY_VOLUME
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
  
  // Debug: Track state changes
  console.log(`🔄 PriceComparisonSection render: queryVolume = ${queryVolume.toLocaleString()}`);
  
  // Custom setter with logging
  const handleQueryVolumeChange = (newVolume: number) => {
    console.log(`🎯 State update: ${queryVolume.toLocaleString()} → ${newVolume.toLocaleString()}`);
    setQueryVolume(newVolume);
  };
  
  // Filter out null models and ensure we have at least 2 models
  const validModels = useMemo(() => {
    return models.filter((model): model is OpenRouterModel => model !== null);
  }, [models]);

  // Calculate price comparison data
  const comparisonData = useMemo(() => {
    if (validModels.length < 2) return null;
    console.log(`🧮 Calculating costs for ${validModels.length} models at ${queryVolume.toLocaleString()} queries`);
    const data = calculatePriceComparison(validModels, queryVolume);
    console.log(`📊 Results: ${data.results[0]?.modelName} = $${data.results[0]?.totalCost.toFixed(2)} total`);
    return data;
  }, [validModels, queryVolume]);

  // Generate hero text (removed unused variable)

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
        <QueryVolumeSelector
          value={queryVolume}
          onValueChange={handleQueryVolumeChange}
        />
      </div>

      {/* Hero Insight */}
      {comparisonData && (
        <HeroInsight data={comparisonData} />
      )}

      {/* Price Comparison Chart */}
      {comparisonData && (
        <PriceComparisonChart
          data={comparisonData}
        />
      )}

      {/* Strategic Insights Panel - Hidden for now but code retained 
      {false && comparisonData && comparisonData !== null && (
        <InsightsPanel data={comparisonData} />
      )} */}

      {/* Cost Disclaimers */}
      <Card className="border-muted bg-muted/20">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-start gap-2">
              <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground mb-1">Cost Calculation Details</p>
                <ul className="space-y-1 text-xs">
                  <li>• Based on 150 prompt tokens + 300 completion tokens per query (450 total tokens)</li>
                  <li>• OpenRouter API provides prices per token, converted to per-million display</li>
                  <li>• Formula: (prompt price per token × 150 + completion price per token × 300) × query volume</li>
                  <li>• Actual costs may vary based on your specific prompts and model responses</li>
                  <li>• Prices are current as of the latest API data and may change</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground mb-1">Important Disclaimers</p>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Infrastructure costs not included:</strong> Server hosting, databases, monitoring</li>
                  <li>• <strong>Development costs not included:</strong> Engineering time, testing, deployment</li>
                  <li>• <strong>Operational costs not included:</strong> Support, maintenance, scaling</li>
                  <li>• <strong>Additional services:</strong> Rate limiting, caching, load balancing may be required</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PriceComparisonSection; 