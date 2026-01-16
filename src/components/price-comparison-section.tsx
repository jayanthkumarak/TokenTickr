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
import { TOKEN_ESTIMATES } from "@/lib/token-estimates";
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
  const handleQueryVolumeChange = (newVolume: number) => {
    setQueryVolume(newVolume);
  };
  const promptTokens = TOKEN_ESTIMATES.PROMPT_TOKENS;
  const completionTokens = TOKEN_ESTIMATES.COMPLETION_TOKENS;
  const totalTokens = promptTokens + completionTokens;

  // Filter out null models and ensure we have at least 2 models
  const validModels = useMemo(() => {
    return models.filter((model): model is OpenRouterModel => model !== null);
  }, [models]);

  // Calculate price comparison data
  const comparisonData = useMemo(() => {
    if (validModels.length < 2) return null;
    const data = calculatePriceComparison(validModels, queryVolume);
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
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <section className="rounded-lg border border-border/50 bg-background/50 p-4">
              <div className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Cost Calculation Details</p>
                  <p className="text-xs text-muted-foreground">How the monthly totals are derived.</p>
                </div>
              </div>
              <div className="mt-3 space-y-3 text-xs text-muted-foreground">
                <div className="border-l-2 border-border/60 pl-3">
                  <p className="text-muted-foreground">Token assumptions</p>
                  <p className="font-medium text-foreground">
                    {promptTokens.toLocaleString()} prompt + {completionTokens.toLocaleString()} completion
                    <span className="text-muted-foreground"> ({totalTokens.toLocaleString()} total)</span>
                  </p>
                </div>
                <div className="border-l-2 border-border/60 pl-3">
                  <p className="text-muted-foreground">Pricing unit</p>
                  <p className="text-foreground/90">OpenRouter prices per token, displayed per million.</p>
                </div>
                <div className="rounded-md border border-border/50 bg-muted/30 px-3 py-2 font-mono text-[11px] text-foreground/90">
                  (prompt price × {promptTokens.toLocaleString()} + completion price × {completionTokens.toLocaleString()}) × query volume
                </div>
                <div className="space-y-1">
                  <p>Actual costs vary with prompt length and response size.</p>
                  <p>Prices track the latest API data and may change.</p>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-border/50 bg-background/50 p-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Important Disclaimers</p>
                  <p className="text-xs text-muted-foreground">Costs not included in this view.</p>
                </div>
              </div>
              <div className="mt-3 divide-y divide-border/50 text-xs text-muted-foreground">
                <div className="flex items-start justify-between gap-4 py-2">
                  <span className="font-medium text-foreground/80">Infrastructure</span>
                  <span>Server hosting, databases, monitoring</span>
                </div>
                <div className="flex items-start justify-between gap-4 py-2">
                  <span className="font-medium text-foreground/80">Development</span>
                  <span>Engineering time, testing, deployment</span>
                </div>
                <div className="flex items-start justify-between gap-4 py-2">
                  <span className="font-medium text-foreground/80">Operations</span>
                  <span>Support, maintenance, scaling</span>
                </div>
                <div className="flex items-start justify-between gap-4 py-2">
                  <span className="font-medium text-foreground/80">Additional services</span>
                  <span>Rate limiting, caching, load balancing</span>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PriceComparisonSection; 
