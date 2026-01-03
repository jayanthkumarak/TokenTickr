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

                {/* Budget Slider */}
                <div className="w-full md:w-72 space-y-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-medium text-sm">Monthly Budget</span>
                        <span className="text-emerald-400 font-bold text-xl tracking-tight">${monthlyBudget[0]}</span>
                    </div>
                    <Slider
                        value={monthlyBudget}
                        onValueChange={setMonthlyBudget}
                        max={100}
                        step={1}
                        min={1}
                        className="py-2"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-600 font-medium uppercase tracking-wider">
                        <span>$1</span>
                        <span>$100</span>
                    </div>
                </div>
            </div>

            {/* Chart Visualization */}
            <div className="space-y-6">
                {capacityData.map((item) => (
                    <div key={item.modelId} className="group">
                        <div className="flex items-center justify-between text-xs mb-2">
                            <div className="font-semibold text-zinc-300 flex items-center gap-2.5">
                                <div
                                    className="w-2.5 h-2.5 rounded-full ring-2 ring-white/5"
                                    style={{ backgroundColor: CHART_COLORS.primary[results.findIndex(r => r.modelId === item.modelId) % CHART_COLORS.primary.length] }}
                                />
                                {item.modelName}
                            </div>
                            <div className="text-zinc-400 font-mono">
                                {item.books < 1
                                    ? <span>{Math.floor(item.pages).toLocaleString()} <span className="text-zinc-600 text-[10px] uppercase ml-1">Pages</span></span>
                                    : <span className="text-emerald-400 font-bold text-sm">{item.books.toFixed(1)} <span className="font-medium text-emerald-500/60 text-[10px] uppercase ml-1">Books</span></span>
                                }
                            </div>
                        </div>

                        {/* Bar */}
                        <div className="relative h-14 w-full bg-zinc-900/50 rounded-lg overflow-hidden border border-white/5 shadow-inner">
                            {/* Fill */}
                            <div
                                className="absolute top-0 left-0 h-full transition-all duration-700 ease-out bg-emerald-500/20 border-r border-emerald-500/30"
                                style={{ width: `${(item.books / maxBooks) * 100}%` }}
                            >
                                {/* Book Spines Pattern Overlay */}
                                <div
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='20' height='40' fill='none'%3E%3Crect x='2' y='2' width='6' height='36' rx='1' fill='%2310b981' fill-opacity='0.6' stroke='%2334d399' stroke-width='0.5'/%3E%3Crect x='10' y='4' width='7' height='34' rx='1' fill='%23059669' fill-opacity='0.6' stroke='%2334d399' stroke-width='0.5'/%3E%3Crect x='19' y='3' width='5' height='35' rx='1' fill='%2334d399' fill-opacity='0.4' stroke='%2334d399' stroke-width='0.5'/%3E%3Crect x='26' y='5' width='8' height='33' rx='1' fill='%23047857' fill-opacity='0.6' stroke='%2334d399' stroke-width='0.5'/%3E%3C/svg%3E")`,
                                        backgroundSize: '20px 40px',
                                        backgroundRepeat: 'repeat-x'
                                    }}
                                />
                            </div>

                            {/* Label inside bar if wide enough */}
                            <div className="absolute inset-0 flex items-center px-3">
                                {item.books > 5 ? (
                                    <div className="flex items-center gap-2 text-emerald-100/50 text-[10px] font-mono animate-pulse">
                                        <PackageOpen className="h-3 w-3" />
                                        {Math.floor(item.totalTokens / 1000).toLocaleString()}k tokens
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-zinc-500/30 text-[10px] font-mono pl-2">
                                        {Math.floor(item.totalTokens / 1000).toLocaleString()}k
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
