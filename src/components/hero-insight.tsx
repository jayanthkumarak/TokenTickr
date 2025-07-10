"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Lightbulb } from "lucide-react";
import { PriceComparisonData } from "@/lib/price-calculation";

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
  const yearlySavings = (costDifference * 12).toFixed(2);
  
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
                <span className="text-green-600 font-bold">{cheapestModel.modelName}</span>{" "}
                over{" "}
                <span className="text-red-600 font-bold">{mostExpensiveModel.modelName}</span>{" "}
                could save you{" "}
                <span className="text-primary font-bold">${yearlySavings}</span>{" "}
                annually
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>
                    <strong className="text-green-600">${cheapestModel.totalCost.toFixed(4)}</strong> per query
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>
                    <strong className="text-red-600">${mostExpensiveModel.totalCost.toFixed(4)}</strong> per query
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>
                    <strong className="text-primary">{percentageDifference}%</strong> cost difference
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