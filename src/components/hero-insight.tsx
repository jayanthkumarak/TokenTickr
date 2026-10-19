"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Lightbulb } from "lucide-react";
import { PriceComparisonData, formatCostDisplay } from "@/lib/price-calculation";

interface HeroInsightProps {
  data: PriceComparisonData;
  workloadLabel?: string;
  tokensPerTaskTotal?: number;
}

export function HeroInsight({ data, workloadLabel, tokensPerTaskTotal }: HeroInsightProps) {
  const { cheapestModel, mostExpensiveModel, queryVolume } = data;

  if (!cheapestModel || !mostExpensiveModel) {
    return null;
  }

  const costDifference = mostExpensiveModel.totalCost - cheapestModel.totalCost;
  const percentageDifference = cheapestModel.totalCost > 0
    ? ((costDifference / cheapestModel.totalCost) * 100).toFixed(1)
    : null;
  const yearlySavings = costDifference * 12;

  // Get volume context
  const volumeContext = queryVolume >= 1000000 ? "enterprise scale" :
                       queryVolume >= 10000 ? "production application" :
                       queryVolume >= 100 ? "small business" :
                       queryVolume >= 10 ? "personal project" : "testing";

  const compactVolume = queryVolume >= 1000000
    ? `${queryVolume / 1000000}M`
    : `${queryVolume / 1000}k`;
  const compactTokens = tokensPerTaskTotal !== undefined && tokensPerTaskTotal > 0
    ? tokensPerTaskTotal >= 1000
      ? `${Math.round(tokensPerTaskTotal / 1000)}k-token`
      : `${tokensPerTaskTotal}-token`
    : null;
  const headlineContext = workloadLabel
    ? `At ${compactVolume} × ${compactTokens ?? "mixed-token"} ${workloadLabel} tasks/mo`
    : `For your ${volumeContext}`;

  // Only meaningful when the cheapest trails the priciest (0 < pct <= 100)
  const rawRetention = mostExpensiveModel.perfScore > 0
    ? Math.round((cheapestModel.perfScore / mostExpensiveModel.perfScore) * 100)
    : null;
  const retentionPct = rawRetention !== null && rawRetention > 0 && rawRetention <= 100 ? rawRetention : null;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-chart-1/10 to-chart-2/10">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="font-medium">
                Key Insight
              </Badge>
              <Badge variant="outline" className="text-xs">
                {volumeContext}
              </Badge>
              {workloadLabel && (
                <Badge variant="outline" className="text-xs">
                  {workloadLabel}
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                {headlineContext}, choosing{" "}
                <span
                  className="font-bold text-chart-1"
                >
                  {cheapestModel.modelName}
                </span>{" "}
                over{" "}
                <span
                  className="font-bold text-chart-2"
                >
                  {mostExpensiveModel.modelName}
                </span>{" "}
                could save you{" "}
                <span
                  className="font-bold text-chart-3"
                >
                  {formatCostDisplay(yearlySavings)}
                </span>{" "}
                annually
                {retentionPct !== null && (
                  <> while retaining {retentionPct}% of its intelligence score</>
                )}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingDown
                    className="w-4 h-4 flex-shrink-0 text-chart-1"
                  />
                  <span>
                    <strong className="text-chart-1">
                      {formatCostDisplay(cheapestModel.costPerQuery)}
                    </strong> per task
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp
                    className="w-4 h-4 flex-shrink-0 text-chart-2"
                  />
                  <span>
                    <strong className="text-chart-2">
                      {formatCostDisplay(mostExpensiveModel.costPerQuery)}
                    </strong> per task
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign
                    className="w-4 h-4 flex-shrink-0 text-chart-3"
                  />
                  <span>
                    <strong className="text-chart-3">
                      {percentageDifference ? `${percentageDifference}%` : "N/A"}
                    </strong> cost difference
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeroInsight;
