"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { PriceCalculationResult } from "../../lib/price-calculation";
import { TOKEN_ESTIMATES } from "../../lib/token-estimates";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import { MetricSelector, ImpactMetric, IMPACT_ARCHETYPES } from "./metric-selector";
import { ImpactCard } from "./impact-card";
import { cn } from "../../lib/utils";
import { CHART_COLORS } from "../../lib/colorblind-colors";

interface ImpactCalculatorProps {
    results: PriceCalculationResult[];
    className?: string;
}

export function ImpactCalculator({ results, className }: ImpactCalculatorProps) {
    const [budget, setBudget] = useState(10);
    const [metric, setMetric] = useState<ImpactMetric>("coding");

    const PRESETS = [1, 5, 10, 50];

    const impactData = useMemo(() => {
        const arch = IMPACT_ARCHETYPES[metric];
        const standardTokens = TOKEN_ESTIMATES.PROMPT_TOKENS + TOKEN_ESTIMATES.COMPLETION_TOKENS;
        return results.map((model) => {
            // Per-token prices recovered from the standard-query cost split so the
            // task cost stays consistent with the price comparison view.
            const promptPrice = (model.promptCost || 0) / TOKEN_ESTIMATES.PROMPT_TOKENS;
            const completionPrice = (model.completionCost || 0) / TOKEN_ESTIMATES.COMPLETION_TOKENS;

            // Per-model task cost for the selected agent archetype.
            let taskCost = arch.promptTokens * promptPrice + arch.completionTokens * completionPrice;
            if (!(taskCost > 0)) {
                const costPerQuery = model.costPerQuery || 0;
                taskCost = costPerQuery > 0
                    ? costPerQuery * (arch.totalTokens / standardTokens)
                    : 0.000001;
            }

            // Tasks purchasable with the budget; guard against zero/negative cost.
            const safeTaskCost = taskCost > 0 ? taskCost : 0.000001;
            const tasksForBudget = budget / safeTaskCost;

            // Reasoning tax: completion-to-prompt price ratio from the result,
            // falling back to the prompt/completion cost split.
            const reasoningTax = model.outputPremiumRatio > 0
                ? model.outputPremiumRatio
                : (promptPrice > 0 ? completionPrice / promptPrice : 0);

            // Context fit: warn when the task peak working set exceeds 80% of
            // the model's context window (single-session fit is unlikely).
            const ctx = model.contextLength || 0;
            const exceedsContext = ctx > 0 && arch.totalTokens > 0.8 * ctx;

            return {
                ...model,
                taskCost: safeTaskCost,
                reasoningTax,
                impactCount: Math.floor(tasksForBudget * 10) / 10, // Round to 1 decimal
                exceedsContext
            };
        }).sort((a, b) => b.impactCount - a.impactCount); // Sort best first
    }, [results, budget, metric]);

    return (
        <Card className={cn("p-6 space-y-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800", className)}>

            {/* Header: Title + Controls */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                        <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                        Agent Runway
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Translate abstract token costs into agent tasks per budget.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Metric Selector */}
                    <MetricSelector value={metric} onChange={setMetric} />

                    {/* Budget Controls */}
                    <div className="flex items-center gap-2 p-1.5 bg-muted/80 rounded-lg border border-border/50 backdrop-blur-sm">
                        <div className="flex gap-1">
                            {PRESETS.map(amt => (
                                <Button
                                    key={amt}
                                    variant={budget === amt ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setBudget(amt)}
                                    className={cn(
                                        "h-8 px-3 text-xs font-medium min-w-[36px] transition-all",
                                        budget === amt
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    ${amt}
                                </Button>
                            ))}
                        </div>
                        <div className="w-px h-4 bg-border mx-2" />
                        <div className="relative group">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground group-focus-within:text-foreground">$</span>
                            <Input
                                type="number"
                                data-testid="budget-input"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="h-8 w-20 pl-5 pr-2 text-sm border-0 bg-background/50 focus-visible:ring-1 focus-visible:ring-ring focus-visible:bg-background text-right font-semibold transition-all shadow-sm"
                                min={1}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Grid */}
            <div className={cn(
                "grid gap-4",
                impactData.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}>
                {impactData.map((model, idx) => (
                    <ImpactCard
                        key={model.modelId}
                        modelName={model.modelName}
                        modelColor={CHART_COLORS.primary[results.findIndex(r => r.modelId === model.modelId) % CHART_COLORS.primary.length]}
                        metric={metric}
                        count={model.impactCount}
                        budget={budget}
                        taskCost={model.taskCost}
                        reasoningTax={model.reasoningTax}
                        contextLength={model.contextLength}
                        isBestValue={idx === 0}
                        exceedsContext={model.exceedsContext}
                    />
                ))}
            </div>

            {/* Footer / Context */}
            <div className="text-xs text-muted-foreground text-center pt-2 max-w-2xl mx-auto leading-relaxed">
                *Tasks per budget = budget ÷ per-task agent cost (prompt tokens × input price + completion tokens × output price).
                Reasoning tax is the output/input price ratio. Cards marked Tight context fit exceed 80% of the model&apos;s
                context window, so those agent runs need multi-session chunking or a larger window.
            </div>

        </Card>
    );
}
