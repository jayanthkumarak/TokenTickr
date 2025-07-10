"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Target,
  Zap
} from "lucide-react";
import { PriceComparisonData, formatCostDisplay } from "@/lib/price-calculation";
import { SEMANTIC_COLORS, COLOR_UTILS } from "@/lib/colorblind-colors";

interface InsightsPanelProps {
  data: PriceComparisonData;
}

export function InsightsPanel({ data }: InsightsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { results, cheapestModel, mostExpensiveModel, queryVolume } = data;
  
  if (!cheapestModel || !mostExpensiveModel || results.length < 2) {
    return null;
  }

  // Calculate ROI metrics
  const costDifference = mostExpensiveModel.totalCost - cheapestModel.totalCost;
  const monthlyQueryCost = cheapestModel.totalCost; // totalCost is already for the full query volume
  const monthlySavings = costDifference; // costDifference is already for the full query volume
  
  // Safe ROI calculation to prevent division by zero
  const yearlyROI = monthlyQueryCost > 0 
    ? (monthlySavings * 12 / (monthlyQueryCost * 12)) * 100
    : monthlySavings > 0 ? 999999 : 0;

  // Risk assessment
  const getRiskLevel = (model: { totalCost: number }) => {
    if (model.totalCost < 0.0001) return "low";
    if (model.totalCost > 0.01) return "high";
    return "medium";
  };

  // Decision framework scoring
  const calculateDecisionScore = (model: { totalCost: number }) => {
    // Safe cost score calculation to prevent division by zero
    const costScore = mostExpensiveModel.totalCost > 0 
      ? (1 - (model.totalCost / mostExpensiveModel.totalCost)) * 40 
      : 40; // 40% weight
    const reliabilityScore = 30; // Placeholder - could be based on model metrics
    const performanceScore = 30; // Placeholder - could be based on benchmarks
    const totalScore = costScore + reliabilityScore + performanceScore;
    return Math.round(Math.max(0, Math.min(100, totalScore))); // Clamp between 0-100
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Strategic Analysis</CardTitle>
            <Badge variant="outline" className="text-xs">
              Advanced Insights
            </Badge>
          </div>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent className="pt-6">
                <Tabs defaultValue="roi" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="roi" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                      <Calculator className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">ROI Analysis</span>
                      <span className="sm:hidden">ROI</span>
                    </TabsTrigger>
                    <TabsTrigger value="risk" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                      <Shield className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Risk Assessment</span>
                      <span className="sm:hidden">Risk</span>
                    </TabsTrigger>
                    <TabsTrigger value="decision" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                      <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Decision Framework</span>
                      <span className="sm:hidden">Decision</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="roi" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card 
                        className="border"
                        style={{ 
                          backgroundColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.savings, 0.1),
                          borderColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.savings, 0.3)
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp 
                              className="w-4 h-4" 
                              style={{ color: SEMANTIC_COLORS.savings }}
                            />
                            <span className="text-sm font-medium">Monthly Savings</span>
                          </div>
                          <div 
                            className="text-2xl font-bold" 
                            style={{ color: SEMANTIC_COLORS.savings }}
                          >
                            {formatCostDisplay(monthlySavings)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            vs. most expensive option
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className="border"
                        style={{ 
                          backgroundColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.highlight, 0.1),
                          borderColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.highlight, 0.3)
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calculator 
                              className="w-4 h-4" 
                              style={{ color: SEMANTIC_COLORS.highlight }}
                            />
                            <span className="text-sm font-medium">Annual ROI</span>
                          </div>
                          <div 
                            className="text-2xl font-bold" 
                            style={{ color: SEMANTIC_COLORS.highlight }}
                          >
                            {yearlyROI >= 999999 ? '999,999%+' : `${yearlyROI.toFixed(1)}%`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            return on investment
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className="border"
                        style={{ 
                          backgroundColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.neutral, 0.1),
                          borderColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.neutral, 0.3)
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target 
                              className="w-4 h-4" 
                              style={{ color: SEMANTIC_COLORS.neutral }}
                            />
                            <span className="text-sm font-medium">Break-even</span>
                          </div>
                          <div 
                            className="text-2xl font-bold" 
                            style={{ color: SEMANTIC_COLORS.neutral }}
                          >
                            Day 1
                          </div>
                          <div className="text-xs text-muted-foreground">
                            immediate savings
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Scenario Planning</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>If usage grows 5x:</span>
                          <span className="font-medium">{formatCostDisplay(monthlySavings * 5)}/month savings</span>
                        </div>
                        <div className="flex justify-between">
                          <span>If usage grows 10x:</span>
                          <span className="font-medium">{formatCostDisplay(monthlySavings * 10)}/month savings</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="risk" className="space-y-4">
                    <div className="grid gap-4">
                      {results.map((model, index) => {
                        const riskLevel = getRiskLevel(model);
                        const riskColor = riskLevel === "low" ? SEMANTIC_COLORS.savings : 
                                        riskLevel === "medium" ? SEMANTIC_COLORS.neutral : 
                                        SEMANTIC_COLORS.cost;
                        const RiskIcon = riskLevel === "low" ? CheckCircle : riskLevel === "medium" ? Info : AlertTriangle;
                        
                        return (
                          <Card 
                            key={index} 
                            className="border"
                            style={{ 
                              backgroundColor: COLOR_UTILS.withOpacity(riskColor, 0.1),
                              borderColor: COLOR_UTILS.withOpacity(riskColor, 0.3)
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <RiskIcon 
                                    className="w-4 h-4" 
                                    style={{ color: riskColor }}
                                  />
                                  <span className="font-medium">{model.modelName}</span>
                                </div>
                                <Badge variant={riskLevel === "low" ? "default" : riskLevel === "medium" ? "secondary" : "destructive"}>
                                  {riskLevel} risk
                                </Badge>
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">
                                <div className="flex justify-between">
                                  <span>Cost predictability:</span>
                                  <span className="font-medium">{riskLevel === "low" ? "High" : riskLevel === "medium" ? "Medium" : "Low"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Budget impact:</span>
                                  <span className="font-medium">{formatCostDisplay(model.totalCost * queryVolume)}/month</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="decision" className="space-y-4">
                    <div className="space-y-4">
                      {results.map((model, index) => {
                        const score = calculateDecisionScore(model);
                        const scoreColor = score >= 80 ? "green" : score >= 60 ? "yellow" : "red";
                        
                        return (
                          <Card key={index} className="border-l-4 border-l-primary">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{model.modelName}</span>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full bg-${scoreColor}-500`}></div>
                                  <span className="text-sm font-medium">{score}/100</span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <div className="text-muted-foreground">Cost Efficiency</div>
                                  <div className="font-medium">
                                    {mostExpensiveModel.totalCost > 0 
                                      ? `${Math.round((1 - (model.totalCost / mostExpensiveModel.totalCost)) * 100)}%`
                                      : '100%'
                                    }
                                  </div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground">Reliability</div>
                                  <div className="font-medium">High</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground">Performance</div>
                                  <div className="font-medium">Good</div>
                                </div>
                              </div>
                              
                              {score >= 80 && (
                                <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                                  <strong>Recommended:</strong> Best overall value for your use case
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardHeader>
    </Card>
  );
}

export default InsightsPanel; 