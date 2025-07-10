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
import { CHART_COLORS, COLOR_UTILS, SEMANTIC_COLORS } from "@/lib/colorblind-colors";
import { cn } from "@/lib/utils";

interface PriceComparisonChartProps {
  data: PriceComparisonData;
  className?: string;
}

// Color-blind friendly palette - using imported CHART_COLORS from colorblind-colors.ts

// Chart dimensions - reduced margins to prevent negative width
const CHART_MARGIN = { top: 20, right: 60, bottom: 60, left: 120 };

export function PriceComparisonChart({ 
  data, 
  className 
}: PriceComparisonChartProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showComparisons, setShowComparisons] = useState(false);
  const [showYearlyProjections, setShowYearlyProjections] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  
  // Debug: Track when chart receives new data
  console.log(`📊 Chart updated: ${data.queryVolume.toLocaleString()} queries, ${data.results[0]?.modelName} = $${data.results[0]?.totalCost.toFixed(2)}`);

  // Prepare chart data with color-blind friendly colors and patterns
  const chartData = useMemo(() => {
    const colors = COLOR_UTILS.getDataPalette(data.results.length);
    const patterns = ['solid', 'diagonal', 'dots', 'vertical', 'horizontal', 'cross', 'diamond', 'wave'];
    
    // Chart data prepared for visualization
    
    return data.results.map((item, index) => ({
      ...item,
      displayName: item.modelName.length > 25 
        ? `${item.modelName.substring(0, 25)}...` 
        : item.modelName,
      color: colors[index] || CHART_COLORS.primary[0],
      pattern: patterns[index % patterns.length],
      patternId: `pattern-${index}`,
    }));
  }, [data]);

  // Chart component
  const Chart = ({ width, height }: { width: number; height: number }) => {
    // Ensure minimum dimensions to prevent negative values
    const minWidth = CHART_MARGIN.left + CHART_MARGIN.right + 100; // Minimum 100px for chart area
    const minHeight = CHART_MARGIN.top + CHART_MARGIN.bottom + 200; // Minimum 200px for chart area
    
    if (width < minWidth || height < minHeight) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
          Chart area too small. Please resize or expand the window.
        </div>
      );
    }

    const xMax = width - CHART_MARGIN.left - CHART_MARGIN.right;
    const yMax = height - CHART_MARGIN.top - CHART_MARGIN.bottom;

    // Scales with safe domain handling
    const maxCost = Math.max(...chartData.map(d => d.totalCost));
    const safeDomain = maxCost > 0 ? maxCost : 1; // Prevent division by zero
    
    const xScale = scaleLinear({
      domain: [0, safeDomain],
      range: [0, Math.max(xMax, 1)], // Ensure positive range
    });

    const yScale = scaleBand({
      domain: chartData.map(d => d.displayName),
      range: [0, Math.max(yMax, 1)], // Ensure positive range
      padding: 0.2,
    });

    return (
      <svg width={width} height={height}>
        <defs>
          {/* Pattern definitions for accessibility */}
          <pattern id="pattern-0" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill={chartData[0]?.color} />
          </pattern>
          <pattern id="pattern-1" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill={chartData[1]?.color} />
            <path d="M 0,4 L 4,0 M -1,1 L 1,-1 M 3,5 L 5,3" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          </pattern>
          <pattern id="pattern-2" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill={chartData[2]?.color} />
            <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.3" />
          </pattern>
          <pattern id="pattern-3" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill={chartData[3]?.color} />
            <path d="M 2,0 L 2,4" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          </pattern>
          <pattern id="pattern-4" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill={chartData[4]?.color} />
            <path d="M 0,2 L 4,2" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          </pattern>
          <pattern id="pattern-5" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill={chartData[5]?.color} />
            <path d="M 2,0 L 2,4 M 0,2 L 4,2" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          </pattern>
          <pattern id="pattern-6" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill={chartData[6]?.color} />
            <path d="M 0,0 L 2,2 L 4,0 L 2,2 L 0,4" stroke="#ffffff" strokeWidth="1" opacity="0.3" fill="none" />
          </pattern>
          <pattern id="pattern-7" patternUnits="userSpaceOnUse" width="8" height="4">
            <rect width="8" height="4" fill={chartData[7]?.color} />
            <path d="M 0,2 Q 2,0 4,2 Q 6,4 8,2" stroke="#ffffff" strokeWidth="1" opacity="0.3" fill="none" />
          </pattern>
        </defs>
        
        <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
          <GridRows
            scale={yScale}
            width={xMax}
            stroke="#e5e7eb"
            strokeOpacity={0.5}
          />
          
          {chartData.map((d, i) => {
            const rawBarWidth = xScale(d.totalCost);
            const barWidth = Math.max(0, rawBarWidth); // Ensure non-negative width
            const barHeight = yScale.bandwidth() || 0; // Ensure non-negative height
            const barY = yScale(d.displayName) || 0;
            
            // Ensure safe rendering with non-negative dimensions
            
            return (
              <Group key={`bar-${i}`}>
                <Bar
                  x={0}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={d.pattern === 'solid' ? d.color : `url(#${d.patternId})`}
                  rx={4}
                  opacity={hoveredBar && hoveredBar !== d.modelName ? 0.4 : 1}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                  }}
                  onMouseEnter={() => setHoveredBar(d.modelName)}
                  onMouseLeave={() => setHoveredBar(null)}
                />
                
                {/* Value label on bar */}
                <text
                  x={Math.max(barWidth + 8, 8)} // Ensure text is visible even for zero-width bars
                  y={barY + barHeight / 2}
                  dy="0.35em"
                  fontSize={12}
                  fill="#374151"
                  fontWeight="medium"
                >
                  {formatCostDisplay(d.totalCost)}
                </text>
                
                {/* Ranking badge - only show if bar has meaningful width */}
                {barWidth > 40 && (
                  <>
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
                  </>
                )}
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
          <ParentSize>
            {({ width, height }) => (
              <Chart width={width} height={height} />
            )}
          </ParentSize>
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