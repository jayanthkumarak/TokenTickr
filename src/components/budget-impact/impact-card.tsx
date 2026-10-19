import React from "react";
import { ImpactMetric, IMPACT_ARCHETYPES } from "./metric-selector";
import { cn } from "../../lib/utils";
import { Badge } from "@/components/ui/badge";

interface ImpactCardProps {
    modelName: string;
    modelColor: string;
    metric: ImpactMetric;
    count: number;
    budget: number;
    taskCost: number;
    reasoningTax: number;
    contextLength?: number;
    isBestValue?: boolean;
    exceedsContext?: boolean;
}

function formatMoney(n: number): string {
    if (!isFinite(n) || n <= 0) return "$0.00";
    if (n < 0.01) return "<$0.01";
    if (n < 1000) {
        return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function ImpactCard({ modelName, modelColor, metric, count, budget, taskCost, reasoningTax, contextLength, isBestValue, exceedsContext }: ImpactCardProps) {
    const arch = IMPACT_ARCHETYPES[metric];

    // Single signature gradient for "Best Value" (chart tokens, one direction)
    const bestValueGradient = "bg-gradient-to-br from-chart-1 to-chart-2 shadow-xl";

    return (
        <div className={cn(
            "relative flex flex-col p-5 rounded-2xl border transition-all duration-300 min-h-[220px]",
            isBestValue
                ? cn(
                    "text-primary-foreground border-transparent md:col-span-2 z-10",
                    bestValueGradient
                )
                : "bg-card hover:bg-accent/50 text-card-foreground border-border/60 hover:border-border hover:shadow-lg"
        )}>
            {/* Best Value Badge */}
            {isBestValue && (
                <Badge className="absolute -top-3 -right-3 shadow-lg">Best Value</Badge>
            )}

            {/* Header: Model Name + Context Fit */}
            <div className={cn("flex items-center gap-2 mb-3", isBestValue ? "opacity-90" : "opacity-70")}>
                <div
                    className="w-2 h-2 rounded-full ring-2 ring-current ring-opacity-20"
                    style={{ backgroundColor: isBestValue ? 'white' : modelColor }}
                />
                <span className="text-xs font-medium tracking-wide truncate max-w-[140px]" title={modelName}>
                    {modelName}
                </span>
                <span className="ml-auto">
                    {exceedsContext ? (
                        <Badge variant="destructive" className="text-[10px]">Tight context fit</Badge>
                    ) : (
                        <Badge variant="outline" className="text-[10px]">Fits context</Badge>
                    )}
                </span>
            </div>

            {/* Content: Tasks per budget */}
            <div className="flex-1 w-full relative z-0">
                <div className="flex items-baseline gap-1.5">
                    <span className={cn(
                        "font-bold tracking-tighter tabular-nums leading-none",
                        isBestValue ? "text-3xl drop-shadow-sm" : "text-2xl"
                    )}>
                        {count.toLocaleString()}
                    </span>
                    <span className={cn(
                        "text-xs font-medium uppercase tracking-wider",
                        isBestValue ? "opacity-90" : "opacity-60"
                    )}>
                        {arch.label}
                    </span>
                </div>
                <div className={cn(
                    "mt-1 text-xs",
                    isBestValue ? "opacity-90" : "text-muted-foreground"
                )}>
                    Tasks per ${budget} budget
                </div>

                <dl className={cn(
                    "mt-4 grid grid-cols-2 gap-3 text-xs",
                    isBestValue ? "opacity-95" : ""
                )}>
                    <div>
                        <dt className={cn("uppercase tracking-wider text-[10px]", isBestValue ? "opacity-80" : "text-muted-foreground")}>
                            Cost per 1k tasks
                        </dt>
                        <dd className="font-semibold tabular-nums mt-0.5">
                            {formatMoney(taskCost * 1000)}
                        </dd>
                    </div>
                    <div>
                        <dt className={cn("uppercase tracking-wider text-[10px]", isBestValue ? "opacity-80" : "text-muted-foreground")}>
                            Reasoning tax
                        </dt>
                        <dd className="font-semibold tabular-nums mt-0.5">
                            {reasoningTax > 0 ? `${reasoningTax.toFixed(1)}x` : "—"}
                        </dd>
                    </div>
                </dl>
            </div>

            {/* Footer layout */}
            <div className="flex-none flex flex-col justify-end space-y-2 mt-4 pt-4 border-t border-dashed border-opacity-20 border-current">
                <div className="flex items-baseline justify-between gap-1.5 flex-wrap">
                    <div className={cn(
                        "text-[10px] opacity-60 font-medium",
                        isBestValue ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                        {arch.description} · {formatMoney(taskCost)}/task
                    </div>
                    {typeof contextLength === "number" && contextLength > 0 && (
                        <div className={cn(
                            "text-[10px] opacity-60 font-medium tabular-nums",
                            isBestValue ? "text-primary-foreground" : "text-muted-foreground"
                        )}>
                            {(contextLength / 1000).toLocaleString()}k ctx
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
