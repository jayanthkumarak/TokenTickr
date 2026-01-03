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
        <Card className={cn("p-6 space-y-8 bg-zinc-900 text-zinc-100 border-zinc-800", className)}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-500 mb-1">
                        <Coins className="h-5 w-5" />
                        <h2 className="text-2xl font-bold text-white">Budget Power Simulator</h2>
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
                <div className="w-full md:w-64 space-y-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span>Monthly Budget</span>
                        <span className="text-emerald-400 font-bold text-lg">${monthlyBudget[0]}</span>
                    </div>
                    <Slider
                        value={monthlyBudget}
                        onValueChange={setMonthlyBudget}
                        max={100}
                        step={1}
                        min={1}
                        className="[&>.relative>.absolute]:bg-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>$1</span>
                        <span>$100</span>
                    </div>
                </div>
            </div>

            {/* Chart Visualization */}
            <div className="space-y-4">
                {capacityData.map((item) => (
                    <div key={item.modelId} className="group">
                        <div className="flex items-center justify-between text-xs mb-1.5 opacity-80">
                            <div className="font-medium flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: CHART_COLORS.primary[results.findIndex(r => r.modelId === item.modelId) % CHART_COLORS.primary.length] }}
                                />
                                {item.modelName}
                            </div>
                            <div className="text-zinc-400">
                                {item.books < 1
                                    ? <span>{Math.floor(item.pages).toLocaleString()} <span className="text-zinc-600">Pages</span></span>
                                    : <span className="text-emerald-400 font-bold">{item.books.toFixed(1)} <span className="font-normal text-emerald-400/70">Books</span></span>
                                }
                            </div>
                        </div>

                        {/* Bar */}
                        <div className="relative h-12 w-full bg-zinc-800/30 rounded-lg overflow-hidden border border-white/5">
                            {/* Fill */}
                            <div
                                className="absolute top-0 left-0 h-full transition-all duration-500 ease-out bg-gradient-to-r from-emerald-900/40 to-emerald-500/20 border-r-2 border-emerald-500/50"
                                style={{ width: `${(item.books / maxBooks) * 100}% ` }}
                            >
                                {/* Icon Pattern Overlay */}
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/%3E%3C/svg%3E")`,
                                        backgroundSize: '20px 20px'
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
