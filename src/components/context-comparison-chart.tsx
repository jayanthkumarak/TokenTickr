"use client";

import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { ParentSize } from "@visx/responsive";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { getWittyAnalogy } from "@/lib/witty-context";
import { cn } from "@/lib/utils";

interface ContextComparisonChartProps {
    results: PriceCalculationResult[];
    className?: string;
}

// Helper to get real world stats
function getContextStats(tokens: number) {
    const books = (tokens / 100000).toFixed(1); // 100k tokens per book
    const pages = Math.floor(tokens / 500).toLocaleString(); // 500 tokens per page
    return { books, pages };
}

const CHART_MARGIN = { top: 20, right: 60, bottom: 40, left: 220 };

export function ContextComparisonChart({ results, className }: ContextComparisonChartProps) {
    const [hoveredBar, setHoveredBar] = useState<string | null>(null);

    // Sort by Context Length (Descending) - More is Better
    const sortedData = useMemo(() => {
        return [...results]
            .sort((a, b) => b.contextLength - a.contextLength)
            .map(item => ({
                ...item,
                displayName: item.modelName.length > 35 ? item.modelName.substring(0, 35) + "..." : item.modelName,
                stats: getContextStats(item.contextLength)
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
            <svg width={width} height={height}>
                <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
                    <GridRows scale={yScale} width={xMax} stroke="var(--border)" strokeDasharray="3,3" />

                    {sortedData.map((d) => {
                        const barWidth = xScale(d.contextLength);
                        const barHeight = yScale.bandwidth();
                        const barY = yScale(d.displayName);

                        // Use Indigo/Purple for context
                        const color = "#6366f1"; // Indigo 500

                        // Conditional Text Positioning
                        const isBarWideEnough = barWidth > 450; // Threshold for text inside (increased for long strings)
                        const textX = isBarWideEnough ? barWidth - 10 : barWidth + 50; // Move outside if small
                        const textAnchor = isBarWideEnough ? "end" : "start";
                        const textColor = isBarWideEnough ? "fill-white opacity-90" : "fill-muted-foreground";

                        return (
                            <Group key={`bar-${d.modelId}`}>
                                <Bar
                                    x={0}
                                    y={barY}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={color}
                                    rx={4}
                                    opacity={hoveredBar && hoveredBar !== d.modelId ? 0.5 : 1}
                                    onMouseEnter={() => setHoveredBar(d.modelId)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                    className="transition-all duration-200 cursor-pointer"
                                />

                                {/* Value Label (Always outside, shifted if analogy is outside) */}
                                <text
                                    x={barWidth + 8}
                                    y={(barY || 0) + (barHeight || 0) / 2}
                                    dy="0.35em"
                                    fontSize={12}
                                    className="fill-foreground font-medium"
                                >
                                    {d.contextLength >= 1000000
                                        ? `${(d.contextLength / 1000000).toFixed(1)}M`
                                        : `${(d.contextLength / 1000).toFixed(0)}k`}
                                </text>

                                {/* Witty Analogy (Conditional Position) */}
                                <text
                                    x={textX} // Used calculated position
                                    y={(barY || 0) + (barHeight || 0) / 2}
                                    dy="0.35em"
                                    fontSize={11}
                                    textAnchor={textAnchor}
                                    className={cn("font-medium italic", textColor)}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    &quot;{getWittyAnalogy(d.contextLength)}&quot;
                                </text>
                            </Group>
                        );
                    })}

                    <AxisLeft
                        scale={yScale}
                        tickLabelProps={() => ({
                            fill: "var(--muted-foreground)",
                            fontSize: 11,
                            textAnchor: "end",
                            dy: "0.33em"
                        })}
                    />
                </Group>
            </svg>
        );
    };

    return (
        <div className={cn("w-full", className)}>
            <div className="h-[300px] w-full">
                <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>
            </div>
        </div>
    );
}
