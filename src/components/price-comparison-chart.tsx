"use client";

import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { ParentSize } from "@visx/responsive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Info, TrendingUp, Calculator } from "lucide-react";
import { PriceComparisonData, formatCostDisplay, getCostDisclaimer } from "@/lib/price-calculation";
import { cn } from "@/lib/utils";

interface PriceComparisonChartProps {
  data: PriceComparisonData;
  className?: string;
}

// Enhanced color palette for better gradient visualization
const CHART_COLORS = [
  "#10b981", // Green (cheapest)
  "#22c55e", 
  "#65a30d",
  "#84cc16",
  "#eab308", // Yellow (middle)
  "#f59e0b",
  "#f97316",
  "#ef4444", // Red (most expensive)
];

// Chart dimensions
const CHART_MARGIN = { top: 20, right: 40, bottom: 60, left: 160 };

export function PriceComparisonChart({ 
  data, 
  className 
}: PriceComparisonChartProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showComparisons, setShowComparisons] = useState(false);
  const [showYearlyProjections, setShowYearlyProjections] = useState(false);

  // Prepare chart data
  const chartData = useMemo(() => {
    return data.results.map((item, index) => ({
      ...item,
      displayName: item.modelName.length > 25 
        ? `${item.modelName.substring(0, 25)}...` 
        : item.modelName,
      color: CHART_COLORS[Math.min(index, CHART_COLORS.length - 1)],
    }));
  }, [data]);

  // Chart component
  const Chart = ({ width, height }: { width: number; height: number }) => {
    const xMax = width - CHART_MARGIN.left - CHART_MARGIN.right;
    const yMax = height - CHART_MARGIN.top - CHART_MARGIN.bottom;

    // Scales
    const xScale = scaleLinear({
      domain: [0, Math.max(...chartData.map(d => d.totalCost))],
      range: [0, xMax],
    });

    const yScale = scaleBand({
      domain: chartData.map(d => d.displayName),
      range: [0, yMax],
      padding: 0.2,
    });

    return (
      <svg width={width} height={height}>
        <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
          <GridRows
            scale={yScale}
            width={xMax}
            stroke="#e5e7eb"
            strokeOpacity={0.5}
          />
          
          {chartData.map((d, i) => {
            const barWidth = xScale(d.totalCost);
            const barHeight = yScale.bandwidth();
            const barY = yScale(d.displayName);
            
            return (
              <Group key={`bar-${i}`}>
                <Bar
                  x={0}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={d.color}
                  rx={4}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
                
                {/* Value label on bar */}
                <text
                  x={barWidth + 8}
                  y={barY + barHeight / 2}
                  dy="0.35em"
                  fontSize={12}
                  fill="#374151"
                  fontWeight="medium"
                >
                  {formatCostDisplay(d.totalCost)}
                </text>
                
                {/* Ranking badge */}
                <circle
                  cx={barWidth - 20}
                  cy={barY + barHeight / 2}
                  r={10}
                  fill="white"
                  stroke={d.color}
                  strokeWidth={2}
                />
                <text
                  x={barWidth - 20}
                  y={barY + barHeight / 2}
                  dy="0.35em"
                  fontSize={10}
                  fill={d.color}
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  #{d.ranking}
                </text>
              </Group>
            );
          })}
          
          <AxisLeft
            scale={yScale}
            stroke="#6b7280"
            tickStroke="#6b7280"
            tickLabelProps={() => ({
              fill: "#6b7280",
              fontSize: 12,
              textAnchor: "end",
              dy: "0.35em",
            })}
          />
          
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="#6b7280"
            tickStroke="#6b7280"
            tickFormat={(value) => formatCostDisplay(Number(value))}
            tickLabelProps={() => ({
              fill: "#6b7280",
              fontSize: 12,
              textAnchor: "middle",
            })}
          />
        </Group>
      </svg>
    );
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
        <div className="h-[500px] w-full">
          <ParentSize>
            {({ width, height }) => (
              <Chart width={width} height={height} />
            )}
          </ParentSize>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Most cost-effective</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-muted-foreground">Most expensive</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCostDisplay(data.cheapestModel.totalCost)}
            </div>
            <div className="text-xs text-muted-foreground">Cheapest Option</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {formatCostDisplay(data.mostExpensiveModel.totalCost)}
            </div>
            <div className="text-xs text-muted-foreground">Most Expensive</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {data.maxCostRatio.toFixed(1)}x
            </div>
            <div className="text-xs text-muted-foreground">Cost Ratio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
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
                        style={{ backgroundColor: CHART_COLORS[Math.min(index, CHART_COLORS.length - 1)] }}
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
                      <span className="font-medium text-green-600">{comparison.cheaperModel}</span>
                      <span className="text-muted-foreground"> is </span>
                      <span className="font-medium">{comparison.percentageDifference.toFixed(1)}% cheaper</span>
                      <span className="text-muted-foreground"> than </span>
                      <span className="font-medium text-red-600">{comparison.modelA === comparison.cheaperModel ? comparison.modelB : comparison.modelA}</span>
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
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCostDisplay(data.yearlyProjections.min)}
                  </div>
                  <div className="text-sm text-muted-foreground">Minimum Yearly Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {data.cheapestModel.modelName}
                  </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCostDisplay(data.yearlyProjections.average)}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Yearly Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Across all {data.results.length} models
                  </div>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {formatCostDisplay(data.yearlyProjections.max)}
                  </div>
                  <div className="text-sm text-muted-foreground">Maximum Yearly Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {data.mostExpensiveModel.modelName}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
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