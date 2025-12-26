"use client";

import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Circle, LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { ParentSize } from "@visx/responsive";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface ParetoChartProps {
    results: PriceCalculationResult[];
    className?: string;
}

interface DataPoint {
    x: number;
    y: number;
    model: PriceCalculationResult;
    isPareto: boolean;
}

const CHART_MARGIN = { top: 20, right: 20, bottom: 50, left: 50 };

/**
 * Compute Pareto-optimal models.
 * A model is Pareto-optimal if no other model is better in both price AND performance.
 */
function computeParetoFrontier(results: PriceCalculationResult[]): Set<string> {
    const paretoOptimal = new Set<string>();

    for (const model of results) {
        const isDominated = results.some(other =>
            other.modelId !== model.modelId &&
            other.priceScore >= model.priceScore &&
            other.perfScore >= model.perfScore &&
            (other.priceScore > model.priceScore || other.perfScore > model.perfScore)
        );

        if (!isDominated) {
            paretoOptimal.add(model.modelId);
        }
    }

    return paretoOptimal;
}

export function ParetoChart({ results, className }: ParetoChartProps) {
    const [hoveredModel, setHoveredModel] = useState<string | null>(null);

    const paretoSet = useMemo(() => computeParetoFrontier(results), [results]);

    const dataPoints: DataPoint[] = useMemo(() => {
        return results.map(model => ({
            x: model.priceScore,
            y: model.perfScore,
            model,
            isPareto: paretoSet.has(model.modelId),
        }));
    }, [results, paretoSet]);

    // Sort Pareto points by x for the frontier line
    const paretoLine = useMemo(() => {
        return dataPoints
            .filter(d => d.isPareto)
            .sort((a, b) => a.x - b.x);
    }, [dataPoints]);

    const hoveredPoint = hoveredModel
        ? dataPoints.find(d => d.model.modelId === hoveredModel)
        : null;

    if (results.length < 2) return null;

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <div>
                        <CardTitle className="text-base">Value Frontier</CardTitle>
                        <CardDescription className="text-xs">
                            Pareto-optimal models offer the best price/performance trade-offs
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-2">
                <div className="w-full h-[250px] relative">
                    <ParentSize>
                        {({ width, height }) => {
                            if (width < 100 || height < 100) return null;

                            const xMax = width - CHART_MARGIN.left - CHART_MARGIN.right;
                            const yMax = height - CHART_MARGIN.top - CHART_MARGIN.bottom;

                            const xScale = scaleLinear({
                                domain: [0, 100],
                                range: [0, xMax],
                            });

                            const yScale = scaleLinear({
                                domain: [0, 100],
                                range: [yMax, 0],
                            });

                            return (
                                <svg width={width} height={height}>
                                    <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
                                        {/* Grid */}
                                        <GridRows
                                            scale={yScale}
                                            width={xMax}
                                            stroke="hsl(var(--border))"
                                            strokeOpacity={0.5}
                                            strokeDasharray="2,3"
                                        />
                                        <GridColumns
                                            scale={xScale}
                                            height={yMax}
                                            stroke="hsl(var(--border))"
                                            strokeOpacity={0.5}
                                            strokeDasharray="2,3"
                                        />

                                        {/* Pareto frontier line */}
                                        {paretoLine.length > 1 && (
                                            <LinePath
                                                data={paretoLine}
                                                x={d => xScale(d.x)}
                                                y={d => yScale(d.y)}
                                                stroke="hsl(var(--primary))"
                                                strokeWidth={2}
                                                strokeOpacity={0.6}
                                                strokeDasharray="4,4"
                                            />
                                        )}

                                        {/* Data points */}
                                        {dataPoints.map((point) => (
                                            <Circle
                                                key={point.model.modelId}
                                                cx={xScale(point.x)}
                                                cy={yScale(point.y)}
                                                r={point.isPareto ? 8 : 5}
                                                fill={point.isPareto ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                                                fillOpacity={
                                                    hoveredModel === null || hoveredModel === point.model.modelId
                                                        ? (point.isPareto ? 0.8 : 0.4)
                                                        : 0.15
                                                }
                                                stroke={point.isPareto ? "hsl(var(--primary))" : "transparent"}
                                                strokeWidth={2}
                                                style={{ cursor: "pointer", transition: "all 0.2s" }}
                                                onMouseEnter={() => setHoveredModel(point.model.modelId)}
                                                onMouseLeave={() => setHoveredModel(null)}
                                            />
                                        ))}

                                        {/* Axes */}
                                        <AxisBottom
                                            top={yMax}
                                            scale={xScale}
                                            label="Cost Efficiency →"
                                            labelOffset={30}
                                            tickLabelProps={{
                                                fill: "hsl(var(--muted-foreground))",
                                                fontSize: 10,
                                                textAnchor: "middle"
                                            }}
                                            labelProps={{
                                                fill: "hsl(var(--foreground))",
                                                fontSize: 11,
                                                textAnchor: "middle",
                                            }}
                                            stroke="hsl(var(--border))"
                                            tickStroke="hsl(var(--border))"
                                        />
                                        <AxisLeft
                                            scale={yScale}
                                            label="Intelligence ↑"
                                            labelOffset={35}
                                            tickLabelProps={{
                                                fill: "hsl(var(--muted-foreground))",
                                                fontSize: 10,
                                                textAnchor: "end"
                                            }}
                                            labelProps={{
                                                fill: "hsl(var(--foreground))",
                                                fontSize: 11,
                                                textAnchor: "middle",
                                                transform: "rotate(-90)",
                                            }}
                                            stroke="hsl(var(--border))"
                                            tickStroke="hsl(var(--border))"
                                        />
                                    </Group>
                                </svg>
                            );
                        }}
                    </ParentSize>

                    {/* Simple hover tooltip */}
                    {hoveredPoint && (
                        <div className="absolute top-2 right-2 bg-popover border rounded-md p-2 shadow-md text-xs">
                            <div className="font-semibold">{hoveredPoint.model.modelName}</div>
                            <div className="text-muted-foreground">
                                Price: {hoveredPoint.model.priceScore} | Intel: {hoveredPoint.model.perfScore}
                            </div>
                            {hoveredPoint.isPareto && (
                                <div className="text-primary font-medium">✓ Pareto Optimal</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground justify-center">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span>Pareto Optimal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground opacity-50" />
                        <span>Sub-optimal</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
