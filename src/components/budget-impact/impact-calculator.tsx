"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { PriceCalculationResult, TOKEN_ESTIMATES } from "../../lib/price-calculation";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import { MetricSelector, ImpactMetric } from "./metric-selector";
import { ImpactCard } from "./impact-card";
import { cn } from "../../lib/utils";
import { CHART_COLORS } from "../../lib/colorblind-colors";

interface ImpactCalculatorProps {
    results: PriceCalculationResult[];
    className?: string;
}

// Logic Constants
const TOKENS_PER_DOC = 20000;   // ~50 pages
const TOKENS_PER_EMAIL = 500;   // Long prof. email
const TOKENS_PER_CODE = 2000;   // Component/Class file

export function ImpactCalculator({ results, className }: ImpactCalculatorProps) {
    const [budget, setBudget] = useState(10);
    const [metric, setMetric] = useState<ImpactMetric>("doc");

    const PRESETS = [1, 5, 10, 50];

    const impactData = useMemo(() => {
        return results.map((model) => {
            // Cost per 1M tokens (blended approx)
            // model.costPerQuery is for ~450 tokens (150 in + 300 out)
            // We need pure cost efficiency.
            // Let's rely on model.costPerQuery for consistency.

            // 1. How many queries can we buy?
            const costPerQuery = model.costPerQuery || 0.000001;
            const queriesForBudget = budget / costPerQuery;

            // 2. Convert queries to tokens
            // Uses the same standard query size as the price calculation (1000 in + 500 out)
            const tokensPerQuery = TOKEN_ESTIMATES.PROMPT_TOKENS + TOKEN_ESTIMATES.COMPLETION_TOKENS;
            const totalTokensForBudget = queriesForBudget * tokensPerQuery;

            // 3. Convert tokens to "Impact Units"
            let count = 0;
            let unitSize = 0;

            switch (metric) {
                case "doc":
                    unitSize = TOKENS_PER_DOC;
                    count = totalTokensForBudget / TOKENS_PER_DOC;
                    break;
                case "email":
                    unitSize = TOKENS_PER_EMAIL;
                    count = totalTokensForBudget / TOKENS_PER_EMAIL;
                    break;
                case "code":
                    unitSize = TOKENS_PER_CODE;
                    count = totalTokensForBudget / TOKENS_PER_CODE;
                    break;
            }

            // Check if the UNIT itself fits in the context window
            // If the unit is 20k tokens and context is 8k, it physically cannot fit at once.
            // Fallback for missing contextLength is 0, so we handle that.
            const ctx = model.contextLength || 4096;
            const exceedsContext = unitSize > ctx;

            return {
                ...model,
                impactCount: Math.floor(count * 10) / 10, // Round to 1 decimal
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
                        Real-World Impact
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Translate abstract token costs into tangible work output (processing power).
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
                        isBestValue={idx === 0}
                        exceedsContext={model.exceedsContext}
                    />
                ))}
            </div>

            {/* Footer / Context */}
            <div className="text-[10px] text-zinc-400 text-center pt-2 max-w-2xl mx-auto leading-relaxed">
                *Represents <strong>Total Processing Potential</strong> for your budget.
                Values based on: 1 Doc ≈ 20k tokens, 1 Email ≈ 500 tokens.
                For models with smaller context windows (marked ⚠️), this volume assumes processing across multiple sessions.
            </div>

        </Card>
    );
}
