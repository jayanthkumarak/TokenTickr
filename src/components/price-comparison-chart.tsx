"use client";

import { useMemo, useState, useEffect } from "react";
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
import { ChevronDown, ChevronUp, Info, TrendingUp, Calculator, Layers } from "lucide-react";
import { PriceComparisonData, formatCostDisplay, getCostDisclaimer } from "@/lib/price-calculation";
import { CHART_COLORS, COLOR_UTILS, SEMANTIC_COLORS } from "@/lib/colorblind-colors";
import { SmartValueRanking } from "@/components/smart-value-ranking";
import { ContextComparisonChart } from "@/components/context-comparison-chart";
import { cn } from "@/lib/utils";

interface PriceComparisonChartProps {
  data: PriceComparisonData;
  className?: string;
}

// Chart dimensions - increased margin for long model names
const CHART_MARGIN = { top: 20, right: 60, bottom: 60, left: 200 };

export function PriceComparisonChart({
  data,
  className
}: PriceComparisonChartProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [showComparisons, setShowComparisons] = useState(true);
  const [showYearlyProjections, setShowYearlyProjections] = useState(true);
  const [showGlow, setShowGlow] = useState(true);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Handle glow effect - vanish on scroll or after delay
  useEffect(() => {
    const handleScroll = () => {
      setShowGlow(false);
    };

    // Remove glow after 4 seconds automatically
    const timer = setTimeout(() => {
      setShowGlow(false);
    }, 4000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Debug: Track when chart receives new data
  console.log(`📊 Chart updated: ${data.queryVolume.toLocaleString()} queries, ${data.results[0]?.modelName || 'No Data'} = $${data.results[0]?.totalCost?.toFixed(2) || '0.00'}`);

  // Prepare chart data with color-blind friendly colors and patterns
  const chartData = useMemo(() => {
    const colors = COLOR_UTILS.getDataPalette(data.results.length);
    const patterns = ['solid', 'diagonal', 'dots', 'vertical', 'horizontal', 'cross', 'diamond', 'wave'];

    return data.results.map((item, index) => ({
      ...item,
      displayName: item.modelName.length > 35
        ? `${item.modelName.substring(0, 35)}...`
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
          {/* Add more patterns as defined in original code if needed, keeping simple for now */}
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

            return (
              <Group key={`bar-${i}`}>
                <Bar
                  x={0}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={d.color} // Simplified to solid color for reliability
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
                  className="fill-foreground font-medium"
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
                      fill="white" // Keep white for contrast against colored bar
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
            stroke="var(--muted-foreground)"
            tickStroke="var(--muted-foreground)"
            tickLabelProps={() => ({
              fill: "var(--muted-foreground)",
              fontSize: 12,
              textAnchor: "end",
              dy: "0.35em",
            })}
          />

          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="var(--muted-foreground)"
            tickStroke="var(--muted-foreground)"
            tickFormat={(value) => formatCostDisplay(Number(value))}
            tickLabelProps={() => ({
              fill: "var(--muted-foreground)",
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

  return (
    <Card className={cn("w-full border-2 border-border/50", className)}>
      <CardContent className="space-y-6 pt-6">
        {/* HERO: Smart Value Index - Lead with our differentiator */}
        <SmartValueRanking results={data.results} />

        {/* Cost Breakdown Section */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="flex items-center justify-between text-lg font-semibold">
              <span>Cost breakdown for {data.queryVolume.toLocaleString()} queries/month</span>
              <Badge variant="secondary">
                {data.results.length} models
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">
              Estimated monthly costs based on standard usage patterns.
            </p>
          </div>

          {/* Main Price Chart */}
          <div className="h-[500px] w-full min-h-[300px]">
            <ParentSize>
              {({ width, height }) => (
                <Chart width={width} height={height} />
              )}
            </ParentSize>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              {data.cheapestModel.totalCost > 0
                ? (data.mostExpensiveModel.totalCost / data.cheapestModel.totalCost).toFixed(1)
                : "∞"}x
            </div>
            <div className="text-xs text-muted-foreground">Cost Ratio</div>
          </div>
        </div>

        {/* Detailed Analysis Sections */}
        <div className="space-y-4">
          {/* Model Details */}
          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between transition-all duration-500",
                  showGlow && "shadow-[0_0_15px_rgba(59,130,246,0.5)] border-blue-400 dark:border-blue-500"
                )}
              >
                <span className="flex items-center gap-2">
                  <Info className={cn("h-4 w-4", showGlow && "animate-pulse text-blue-500")} />
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
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between transition-all duration-500",
                  showGlow && "shadow-[0_0_15px_rgba(59,130,246,0.5)] border-blue-400 dark:border-blue-500"
                )}
              >
                <span className="flex items-center gap-2">
                  <Calculator className={cn("h-4 w-4", showGlow && "animate-pulse text-blue-500")} />
                  Model-to-Model Comparisons
                </span>
                {showComparisons ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-4">
              <div className="grid gap-2 max-h-60 overflow-y-auto">
                {data.comparisons && data.comparisons.slice(0, 10).map((comparison, index) => (
                  <div key={index} className="flex items-center justify-between p-2 text-sm bg-muted/20 rounded">
                    <div className="flex-1">
                      <span className="font-medium">{comparison.modelA}</span>
                      <span className="text-muted-foreground mx-1">vs</span>
                      <span className="font-medium">{comparison.modelB}</span>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="text-muted-foreground">
                        Diff: {formatCostDisplay(comparison.costDifference)}
                      </span>
                      <Badge variant="secondary">{comparison.costRatio.toFixed(1)}x</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Yearly Projections */}
          <Collapsible open={showYearlyProjections} onOpenChange={setShowYearlyProjections}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between transition-all duration-500",
                  showGlow && "shadow-[0_0_15px_rgba(59,130,246,0.5)] border-blue-400 dark:border-blue-500"
                )}
              >
                <span className="flex items-center gap-2">
                  <TrendingUp className={cn("h-4 w-4", showGlow && "animate-pulse text-blue-500")} />
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

        {/* New Context Comparison Section */}
        <div className="space-y-4">
          <Collapsible defaultOpen={true}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between transition-all duration-500",
                  showGlow && "shadow-[0_0_15px_rgba(59,130,246,0.5)] border-blue-400 dark:border-blue-500"
                )}
              >
                <span className="flex items-center gap-2">
                  <Layers className={cn("h-4 w-4", showGlow && "animate-pulse text-blue-500")} />
                  Context Size Comparison (Capacity)
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <ContextComparisonChart results={data.results} />
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Cost Disclaimer */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              {getCostDisclaimer()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}