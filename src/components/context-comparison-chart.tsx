"use client";

import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { ParentSize } from "@visx/responsive";
import { PriceCalculationResult, formatCostDisplay } from "@/lib/price-calculation";
import { cn } from "@/lib/utils";

interface ContextComparisonChartProps {
    results: PriceCalculationResult[];
    className?: string;
}

function formatShortContext(tokens: number): string {
    if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(1)}M`;
    return `${(tokens / 1000).toFixed(0)}k`;
}

const CHART_TOKENS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

// Rank color: largest context (rank 0) -> chart-1, smallest -> chart-5.
// Same interpolation as the price chart (cheapest -> chart-1).
function getRankColor(rank: number, total: number): string {
    const t = total > 1 ? rank / (total - 1) : 0;
    const idx = Math.min(CHART_TOKENS.length - 1, Math.round(t * (CHART_TOKENS.length - 1)));
    return CHART_TOKENS[idx];
}

const CHART_MARGIN = { top: 20, right: 60, bottom: 40, left: 220 };

export function ContextComparisonChart({ results, className }: ContextComparisonChartProps) {
    const [hoveredBar, setHoveredBar] = useState<string | null>(null);

    // Sort by Context Length (Descending) - More is Better
    const sortedData = useMemo(() => {
        return [...results]
            .sort((a, b) => b.contextLength - a.contextLength)
            .map((item, rank) => ({
                ...item,
                displayName: item.modelName.length > 35 ? item.modelName.substring(0, 35) + "..." : item.modelName,
                turns: item.agentTurnsCapacity ?? Math.max(0, Math.floor((item.contextLength - 4096) / 4000)),
                fillCost: formatCostDisplay(item.contextFillCost ?? 0),
                color: getRankColor(rank, results.length),
            }));
    }, [results]);

    const Chart = ({ width, height }: { width: number; height: number }) => {
        if (width < 100 || height < 100) return null;

        const xMax = width - CHART_MARGIN.left - CHART_MARGIN.right;
        const yMax = height - CHART_MARGIN.top - CHART_MARGIN.bottom;

        const maxContext = Math.max(...sortedData.map(d => d.contextLength));

        const xScale = scaleLinear({
            domain: [0, maxContext],
            range: [0, xMax],
        });

        const yScale = scaleBand({
            domain: sortedData.map(d => d.displayName),
            range: [0, yMax],
            padding: 0.3,
        });

        return (
            <svg width={width} height={height} role="img" aria-label={`Context window comparison for ${sortedData.length} models`}>
                <title>{`Context window comparison for ${sortedData.length} models`}</title>
                <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
                    <GridRows scale={yScale} width={xMax} stroke="var(--border)" strokeDasharray="3,3" />

                    {sortedData.map((d) => {
                        const barWidth = xScale(d.contextLength);
                        const barHeight = yScale.bandwidth();
                        const barY = yScale(d.displayName);

                        return (
                            <Group key={`bar-${d.modelId}`} tabIndex={0} role="button" aria-label={`${d.modelName}: ${d.contextLength.toLocaleString()} tokens context`} onFocus={() => setHoveredBar(d.modelId)} onBlur={() => setHoveredBar(null)}>
                                <Bar
                                    x={0}
                                    y={barY}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={d.color}
                                    rx={4}
                                    opacity={hoveredBar && hoveredBar !== d.modelId ? 0.5 : 1}
                                    onMouseEnter={() => setHoveredBar(d.modelId)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                    className="transition-all duration-200 cursor-pointer"
                                />

                                {/* Single outside label per bar */}
                                <text
                                    x={barWidth + 8}
                                    y={(barY || 0) + (barHeight || 0) / 2}
                                    dy="0.35em"
                                    fontSize={12}
                                    className="fill-foreground font-medium"
                                >
                                    {`${formatShortContext(d.contextLength)} · ~${d.turns} agent turns · ${d.fillCost}`}
                                </text>
                            </Group>
                        );
                    })}

                    <AxisLeft
                        scale={yScale}
                        tickLabelProps={() => ({
                            fill: "var(--muted-foreground)",
                            fontSize: 12,
                            textAnchor: "end",
                            dy: "0.33em"
                        })}
                    />
                </Group>
            </svg>
        );
    };

    return (
        <div className={cn("w-full overflow-x-auto", className)}>
            <div className="h-[300px] w-full min-w-[560px]">
                <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>
            </div>
        </div>
    );
}
