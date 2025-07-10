"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Info, TrendingUp, Calculator } from "lucide-react";
import { PriceComparisonData, formatCostDisplay, getCostDisclaimer } from "@/lib/price-calculation";
import { CHART_COLORS, COLOR_UTILS, SEMANTIC_COLORS } from "@/lib/colorblind-colors";
import { cn } from "@/lib/utils";

interface PriceComparisonChartProps {
  data: PriceComparisonData;
  className?: string;
}

export function PriceComparisonChart({ 
  data, 
  className 
}: PriceComparisonChartProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showComparisons, setShowComparisons] = useState(false);
  const [showYearlyProjections, setShowYearlyProjections] = useState(false);
  
  // Debug: Track when chart receives new data
  console.log(`📊 Chart updated: ${data.queryVolume.toLocaleString()} queries, ${data.results[0]?.modelName} = $${data.results[0]?.totalCost.toFixed(2)}`);

  // Prepare chart data with color-blind friendly colors
  const chartData = useMemo(() => {
    const colors = COLOR_UTILS.getDataPalette(data.results.length);
    
    return data.results.map((item, index) => ({
      ...item,
      displayName: item.modelName.length > 25 
        ? `${item.modelName.substring(0, 25)}...` 
        : item.modelName,
      color: colors[index] || CHART_COLORS.primary[0],
      fill: colors[index] || CHART_COLORS.primary[0],
    }));
  }, [data]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium">{data.modelName}</p>
          <p className="text-sm text-muted-foreground">
            Total Cost: {formatCostDisplay(data.totalCost)}
          </p>
          <p className="text-sm text-muted-foreground">
            Ranking: #{data.ranking}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.results.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No models selected for comparison
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if all costs are zero or negative (edge case)
  const hasValidCosts = data.results.some(r => r.totalCost > 0);
  if (!hasValidCosts) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <p>All selected models have zero or invalid costs</p>
            <p className="text-xs mt-2">This may indicate a pricing data issue</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state removed - chart renders immediately

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cost breakdown for {data.queryVolume.toLocaleString()} queries per month</span>
          <Badge variant="secondary">
            {data.results.length} models
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
                  {/* Main Chart */}
          <div className="h-[500px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                layout="horizontal" 
                margin={{ top: 20, right: 60, bottom: 20, left: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  tickFormatter={(value) => formatCostDisplay(value)}
                  stroke="#6b7280"
                />
                <YAxis 
                  type="category" 
                  dataKey="displayName"
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="totalCost" 
                  name="Total Cost"
                  radius={[0, 4, 4, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: CHART_COLORS.primary[0] }}
            ></div>
            <span className="text-muted-foreground">Most cost-effective</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: CHART_COLORS.secondary[0] }}
            ></div>
            <span className="text-muted-foreground">Most expensive</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div 
              className="text-2xl font-bold" 
              style={{ color: SEMANTIC_COLORS.savings }}
            >
              {formatCostDisplay(data.cheapestModel.totalCost)}
            </div>
            <div className="text-xs text-muted-foreground">Cheapest Option</div>
          </div>
          <div className="text-center">
            <div 
              className="text-2xl font-bold" 
              style={{ color: SEMANTIC_COLORS.cost }}
            >
              {formatCostDisplay(data.mostExpensiveModel.totalCost)}
            </div>
            <div className="text-xs text-muted-foreground">Most Expensive</div>
          </div>
          <div className="text-center">
            <div 
              className="text-2xl font-bold" 
              style={{ color: SEMANTIC_COLORS.highlight }}
            >
              {data.maxCostRatio.toFixed(1)}x
            </div>
            <div className="text-xs text-muted-foreground">Cost Ratio</div>
          </div>
          <div className="text-center">
            <div 
              className="text-2xl font-bold" 
              style={{ color: SEMANTIC_COLORS.neutral }}
            >
              {formatCostDisplay(data.averageCost)}
            </div>
            <div className="text-xs text-muted-foreground">Average Cost</div>
          </div>
        </div>

        {/* Detailed Analysis Sections */}
        <div className="space-y-4">
          {/* Model Details */}
          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Detailed Model Analysis
                </span>
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-4">
              <div className="grid gap-3">
                {data.results.map((model, index) => (
                  <div key={model.modelId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: chartData[index]?.color || CHART_COLORS.primary[0] }}
                      />
                      <div>
                        <div className="font-medium">{model.modelName}</div>
                        <div className="text-xs text-muted-foreground">
                          Rank #{model.ranking} • {model.percentageFromCheapest.toFixed(1)}% more than cheapest
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCostDisplay(model.totalCost)}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatCostDisplay(model.costPerQuery)} per query
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Model Comparisons */}
          <Collapsible open={showComparisons} onOpenChange={setShowComparisons}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Model-to-Model Comparisons
                </span>
                {showComparisons ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-4">
              <div className="grid gap-2 max-h-60 overflow-y-auto">
                {data.modelComparisons.slice(0, 10).map((comparison, index) => (
                  <div key={index} className="flex items-center justify-between p-2 text-sm bg-muted/20 rounded">
                    <div className="flex-1">
                      <span 
                        className="font-medium" 
                        style={{ color: SEMANTIC_COLORS.savings }}
                      >
                        {comparison.cheaperModel}
                      </span>
                      <span className="text-muted-foreground"> is </span>
                      <span className="font-medium">{comparison.percentageDifference.toFixed(1)}% cheaper</span>
                      <span className="text-muted-foreground"> than </span>
                      <span 
                        className="font-medium" 
                        style={{ color: SEMANTIC_COLORS.cost }}
                      >
                        {comparison.modelA === comparison.cheaperModel ? comparison.modelB : comparison.modelA}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCostDisplay(comparison.costDifference)}</div>
                      <div className="text-xs text-muted-foreground">{comparison.costRatio.toFixed(1)}x ratio</div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Yearly Projections */}
          <Collapsible open={showYearlyProjections} onOpenChange={setShowYearlyProjections}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Yearly Cost Projections
                </span>
                {showYearlyProjections ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.savings, 0.1),
                    borderColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.savings, 0.3),
                    borderWidth: '1px'
                  }}
                >
                  <div 
                    className="text-2xl font-bold" 
                    style={{ color: SEMANTIC_COLORS.savings }}
                  >
                    {formatCostDisplay(data.yearlyProjections.min)}
                  </div>
                  <div className="text-sm text-muted-foreground">Minimum Yearly Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {data.cheapestModel.modelName}
                  </div>
                </div>
                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.neutral, 0.1),
                    borderColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.neutral, 0.3),
                    borderWidth: '1px'
                  }}
                >
                  <div 
                    className="text-2xl font-bold" 
                    style={{ color: SEMANTIC_COLORS.neutral }}
                  >
                    {formatCostDisplay(data.yearlyProjections.average)}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Yearly Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Across all {data.results.length} models
                  </div>
                </div>
                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.cost, 0.1),
                    borderColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.cost, 0.3),
                    borderWidth: '1px'
                  }}
                >
                  <div 
                    className="text-2xl font-bold" 
                    style={{ color: SEMANTIC_COLORS.cost }}
                  >
                    {formatCostDisplay(data.yearlyProjections.max)}
                  </div>
                  <div className="text-sm text-muted-foreground">Maximum Yearly Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {data.mostExpensiveModel.modelName}
                  </div>
                </div>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.highlight, 0.1),
                  borderColor: COLOR_UTILS.withOpacity(SEMANTIC_COLORS.highlight, 0.3),
                  borderWidth: '1px'
                }}
              >
                <div 
                  className="text-lg font-bold" 
                  style={{ color: SEMANTIC_COLORS.highlight }}
                >
                  Annual Savings Potential: {formatCostDisplay(data.yearlyProjections.max - data.yearlyProjections.min)}
                </div>
                <div className="text-sm text-muted-foreground">
                  By choosing {data.cheapestModel.modelName} over {data.mostExpensiveModel.modelName}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Cost Disclaimer */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {getCostDisclaimer()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PriceComparisonChart; 