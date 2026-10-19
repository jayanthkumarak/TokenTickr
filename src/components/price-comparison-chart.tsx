"use client";

import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { ParentSize } from "@visx/responsive";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Layers } from "lucide-react";
import { PriceComparisonData, formatCostDisplay, getCostDisclaimer } from "@/lib/price-calculation";
import { SmartValueRanking } from "@/components/smart-value-ranking";
import { ContextComparisonChart } from "@/components/context-comparison-chart";
import { ModelTierList } from "@/components/model-tier-list";
import { SmartTradeoffs } from "@/components/smart-tradeoffs";
import { ImpactCalculator } from "@/components/budget-impact/impact-calculator";
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
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Cost rank mapped to chart tokens: cheapest (chart-1 teal) to priciest (chart-5)
  const getCostGradientColor = (rank: number, total: number) => {
    const tokens = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
    // t = 0 for cheapest (rank 1), t = 1 for most expensive
    const t = total > 1 ? (rank - 1) / (total - 1) : 0;
    const idx = Math.min(tokens.length - 1, Math.round(t * (tokens.length - 1)));

    return tokens[idx];
  };

  // Prepare chart data with gradient colors based on cost ranking
  const chartData = useMemo(() => {
    const totalModels = data.results.length;

    return data.results.map((item) => ({
      ...item,
      displayName: item.modelName.length > 35
        ? `${item.modelName.substring(0, 35)}...`
        : item.modelName,
      color: getCostGradientColor(item.ranking, totalModels),
    }));
  }, [data]);

  // Chart component
  const Chart = ({ width, height }: { width: number; height: number }) => {

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
      <svg width={width} height={height} role="img" aria-label={`Monthly cost comparison for ${chartData.length} models`}>
        <title>{`Monthly cost comparison for ${chartData.length} models`}</title>
        <defs>
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
            stroke="var(--border)"
            strokeOpacity={0.5}
          />

          {chartData.map((d, i) => {
            const rawBarWidth = xScale(d.totalCost);
            const barWidth = Math.max(0, rawBarWidth); // Ensure non-negative width
            const barHeight = yScale.bandwidth() || 0; // Ensure non-negative height
            const barY = yScale(d.displayName) || 0;

            return (
              <Group key={`bar-${i}`} tabIndex={0} role="button" aria-label={`${d.modelName}: ${formatCostDisplay(d.totalCost)} per month`} onFocus={() => setHoveredBar(d.modelName)} onBlur={() => setHoveredBar(null)}>
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
                      fill="var(--background)"
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
    <div className={cn("w-full space-y-8 animate-in fade-in duration-500", className)}>

      {/* 1. HERO: Smart Value Index - Lead with our differentiator */}
      <Card className="border-2 border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <SmartValueRanking results={data.results} className="border-0 shadow-none" />

          {/* Chart Section embedded in Hero card */}
          <div className="p-6 pt-0 space-y-4">
            <div className="flex flex-col space-y-1">
              <h3 className="flex items-center justify-between text-lg font-semibold">
                <span>Cost breakdown for {data.queryVolume.toLocaleString()} tasks/month</span>
                <Badge variant="secondary">
                  {data.results.length} models
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground">
                Estimated monthly costs based on standard usage patterns.
              </p>
            </div>

            <div className="h-[400px] w-full min-h-[300px] overflow-x-auto">
              <div className="min-w-[560px] h-full">
                <ParentSize>
                  {({ width, height }) => (
                    <Chart width={width} height={height} />
                  )}
                </ParentSize>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. THE STORY: Tier List & Tradeoffs */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Classification */}
        <ModelTierList results={data.results} className="h-full" />

        {/* Actionable Insights */}
        <SmartTradeoffs results={data.results} className="h-full" />
      </div>

      {/* 3. CONTEXT: Dedicated Capacity Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="h-5 w-5 text-indigo-500" />
          <div>
            <h3 className="font-semibold text-lg">Context Window Capacity</h3>
            <p className="text-sm text-muted-foreground">Working set each model can fit per agent turn without compaction.</p>
          </div>
        </div>
        <ContextComparisonChart results={data.results} />
      </Card>

      {/* 4. THE REAL WORLD: Impact Calculator */}
      <ImpactCalculator results={data.results} />

      {/* Footer: Disclaimer */}
      <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-3 text-xs text-muted-foreground">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        {getCostDisclaimer()}
      </div>

    </div>
  );
}
