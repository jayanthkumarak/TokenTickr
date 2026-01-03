"use client";

import { useState, useMemo } from "react";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Coins, PackageOpen } from "lucide-react";
import { CHART_COLORS } from "@/lib/colorblind-colors";

interface BudgetCapacityProps {
    results: PriceCalculationResult[];
    className?: string;
}

// Analogies constants
const TOKENS_PER_WORD = 1.33; // Approx
const WORDS_PER_PAGE = 500; // Standard single-spaced page
const PAGES_PER_BOOK = 300; // Standard novel
const TOKENS_PER_PAGE = WORDS_PER_PAGE * TOKENS_PER_WORD; // ~665
const TOKENS_PER_BOOK = PAGES_PER_BOOK * TOKENS_PER_PAGE; // ~200k

export function BudgetCapacity({ results, className }: BudgetCapacityProps) {
    const [monthlyBudget, setMonthlyBudget] = useState([10]); // Default $10

    const capacityData = useMemo(() => {
        return results.map(model => {
            // Avoid division by zero
            // model.totalCost is based on default query volume (usually 1M tokens approx? No, queryVolume=1000 by default in store?)
            // Actually `model.totalCost` = costPerQuery * queryVolume.
            // We should use `model.costPerQuery` which is cost for ~1.5k tokens (1k in + 500 out).

            // Let's derive tokens per dollar accurately:
            // costPerQuery = price for (TOKEN_ESTIMATES.PROMPT_TOKENS + TOKEN_ESTIMATES.COMPLETION_TOKENS)
            // Default is 1000 + 500 = 1500 tokens per query.

            const tokensPerQuery = 1500; // From price-calculation.ts constants
            const costPerQuery = model.costPerQuery || 0.000001;

            const queriesPerDollar = 1 / costPerQuery;
            const tokensPerDollar = queriesPerDollar * tokensPerQuery;

            const totalTokens = tokensPerDollar * monthlyBudget[0];

            const pages = totalTokens / TOKENS_PER_PAGE;
            const books = totalTokens / TOKENS_PER_BOOK;

            return {
                ...model,
                totalTokens,
                pages,
                books,
            };
        }).sort((a, b) => b.totalTokens - a.totalTokens); // Sort by volume (cheapest first)
    }, [results, monthlyBudget]);

    const maxBooks = Math.max(...capacityData.map(d => d.books));

    return (
        <Card className={cn("p-6 space-y-8 bg-white/80 dark:bg-zinc-900 text-foreground border-border/50", className)}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-500 mb-1">
                        <Coins className="h-5 w-5" />
                        <h2 className="text-2xl font-bold text-foreground">Budget Power Simulator</h2>
                    </div>
                    <p className="text-zinc-400 text-sm max-w-lg">
                        How much content can you process for <strong>${monthlyBudget[0]}</strong>?
                        <br />
                        <span className="text-zinc-500 text-xs">
                            (1 Standard Book = 300 pages • 1 Page = 500 words)
                        </span>
                    </p>
                </div>

                {/* Budget Slider - High Contrast Dark Box */}
                <div className="w-full md:w-72 space-y-4 p-5 rounded-xl bg-[#09090b] text-white shadow-2xl border border-white/10 relative z-10">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-medium text-sm">Monthly Budget</span>
                        <span className="text-[#34d399] font-bold text-xl tracking-tight">${monthlyBudget[0]}</span>
                    </div>
                    <Slider
                        value={monthlyBudget}
                        onValueChange={setMonthlyBudget}
                        max={100}
                        step={1}
                        min={1}
                        className="py-2 [&>.relative>.absolute]:bg-white [&>.relative]:bg-zinc-700 [&>span]:border-white/50"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-medium pt-1">
                        <span>$1</span>
                        <span>$100</span>
                    </div>
                </div>
            </div>

            {/* Chart Visualization */}
            <div className="space-y-8 mt-8">
                {capacityData.map((item) => (
                    <div key={item.modelId} className="group">
                        <div className="flex items-end justify-between text-xs mb-2">
                            <div className="font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: CHART_COLORS.primary[results.findIndex(r => r.modelId === item.modelId) % CHART_COLORS.primary.length] }}
                                />
                                {item.modelName}
                            </div>
                            <div className="text-right">
                                {item.books < 1
                                    ? <span className="text-zinc-500 font-mono">{Math.floor(item.pages).toLocaleString()} <span className="text-[10px] uppercase">Pages</span></span>
                                    : (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-[#34d399] font-bold text-lg">{item.books.toFixed(1)}</span>
                                            <span className="text-[#34d399]/70 text-[10px] font-bold uppercase tracking-wider">Books</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Bar Container - Flat Gray Background */}
                        <div className="relative h-14 w-full bg-zinc-200 dark:bg-zinc-800 rounded-sm overflow-hidden">
                            {/* Fill - Muted Green with Pattern */}
                            <div
                                className="absolute top-0 left-0 h-full transition-all duration-700 ease-out bg-[#6ee7b7]/40 dark:bg-[#34d399]/20"
                                style={{ width: `${(item.books / maxBooks) * 100}%` }}
                            >
                                {/* Vertical Lines Pattern (Books) */}
                                <div
                                    className="absolute inset-0 opacity-50 border-r-2 border-[#34d399]"
                                    style={{
                                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(16, 185, 129, 0.2) 4px, transparent 5px)`,
                                    }}
                                />
                            </div>

                            {/* Token Count Label - Overlay */}
                            <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                                <span className="text-[10px] font-mono text-zinc-500/50 dark:text-zinc-400/30">
                                    {Math.floor(item.totalTokens / 1000).toLocaleString()}k tokens
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
