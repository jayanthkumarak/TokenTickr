"use client";

import { useState, useMemo } from "react";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { MetricSelector, ImpactMetric } from "./metric-selector";
import { ImpactCard } from "./impact-card";
import { cn } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/colorblind-colors";

interface ImpactCalculatorProps {
    results: PriceCalculationResult[];
    className?: string;
}

// Logic Constants
const TOKENS_PER_NOVEL = 200000;  // 50k words * 1.33 + margin + re-prompts
const TOKENS_PER_EMAIL = 300;     // 250 words approx
const TOKENS_PER_SCRIPT = 2000;   // 500 lines code (~1000 tokens) + 1000 context

export function ImpactCalculator({ results, className }: ImpactCalculatorProps) {
    const [budget, setBudget] = useState(10);
    const [metric, setMetric] = useState<ImpactMetric>("novel");

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
            // Each query is 450 tokens in our standardization constant
            const totalTokensForBudget = queriesForBudget * 450;

            // 3. Convert tokens to "Impact Units"
            let count = 0;
            switch (metric) {
                case "novel": count = totalTokensForBudget / TOKENS_PER_NOVEL; break;
                case "email": count = totalTokensForBudget / TOKENS_PER_EMAIL; break;
                case "script": count = totalTokensForBudget / TOKENS_PER_SCRIPT; break;
            }

            return {
                ...model,
                impactCount: Math.floor(count * 10) / 10 // Round to 1 decimal
            };
        }).sort((a, b) => b.impactCount - a.impactCount); // Sort best first
    }, [results, budget, metric]);

    return (
        <Card className={cn("p-6 space-y-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800", className)}>

            {/* Header: Title + Controls */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                        Real-World Impact
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Translate token costs into tangible work output.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Metric Selector */}
                    <MetricSelector value={metric} onChange={setMetric} />

                    {/* Budget Controls */}
                    <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                        <div className="flex gap-1">
                            {PRESETS.map(amt => (
                                <Button
                                    key={amt}
                                    variant={budget === amt ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setBudget(amt)}
                                    className={cn(
                                        "h-8 px-2.5 text-xs font-medium min-w-[36px]",
                                        budget === amt
                                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                            : "text-zinc-500"
                                    )}
                                >
                                    ${amt}
                                </Button>
                            ))}
                        </div>
                        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-600 mx-1" />
                        <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-500">$</span>
                            <Input
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="h-8 w-20 pl-4 pr-1 text-xs border-0 bg-transparent focus-visible:ring-0 text-right font-medium"
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
                    />
                ))}
            </div>

            {/* Footer / Context */}
            <div className="text-[10px] text-zinc-400 text-center pt-2">
                *Estimates based on: 1 Novel ≈ 200k tokens, 1 Email ≈ 300 tokens, 1 Script ≈ 2k tokens.
                Actual usage may vary by prompting style.
            </div>

        </Card>
    );
}
