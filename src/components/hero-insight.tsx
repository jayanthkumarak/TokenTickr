"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Lightbulb } from "lucide-react";
import { PriceComparisonData, formatCostDisplay } from "@/lib/price-calculation";
import { SEMANTIC_COLORS } from "@/lib/colorblind-colors";

interface HeroInsightProps {
  data: PriceComparisonData;
}

export function HeroInsight({ data }: HeroInsightProps) {
  const { cheapestModel, mostExpensiveModel, queryVolume } = data;
  
  if (!cheapestModel || !mostExpensiveModel) {
    return null;
  }

  const costDifference = mostExpensiveModel.totalCost - cheapestModel.totalCost;
  const percentageDifference = ((costDifference / cheapestModel.totalCost) * 100).toFixed(1);
  const yearlySavings = costDifference * 12;
  
  // Get volume context
  const volumeContext = queryVolume >= 1000000 ? "enterprise scale" :
                       queryVolume >= 10000 ? "production application" :
                       queryVolume >= 100 ? "small business" :
                       queryVolume >= 10 ? "personal project" : "testing";

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
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
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                For your {volumeContext}, choosing{" "}
                <span 
                  className="font-bold" 
                  style={{ color: SEMANTIC_COLORS.savings }}
                >
                  {cheapestModel.modelName}
                </span>{" "}
                over{" "}
                <span 
                  className="font-bold" 
                  style={{ color: SEMANTIC_COLORS.cost }}
                >
                  {mostExpensiveModel.modelName}
                </span>{" "}
                could save you{" "}
                <span 
                  className="font-bold" 
                  style={{ color: SEMANTIC_COLORS.highlight }}
                >
                  {formatCostDisplay(yearlySavings)}
                </span>{" "}
                annually
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingDown 
                    className="w-4 h-4 flex-shrink-0" 
                    style={{ color: SEMANTIC_COLORS.savings }}
                  />
                  <span>
                    <strong style={{ color: SEMANTIC_COLORS.savings }}>
                      ${cheapestModel.costPerQuery.toFixed(6)}
                    </strong> per query
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp 
                    className="w-4 h-4 flex-shrink-0" 
                    style={{ color: SEMANTIC_COLORS.cost }}
                  />
                  <span>
                    <strong style={{ color: SEMANTIC_COLORS.cost }}>
                      ${mostExpensiveModel.costPerQuery.toFixed(6)}
                    </strong> per query
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign 
                    className="w-4 h-4 flex-shrink-0" 
                    style={{ color: SEMANTIC_COLORS.highlight }}
                  />
                  <span>
                    <strong style={{ color: SEMANTIC_COLORS.highlight }}>
                      {percentageDifference}%
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