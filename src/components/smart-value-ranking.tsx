"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { cn } from "@/lib/utils";
import { Sparkles, Trophy } from "lucide-react";

interface SmartValueRankingProps {
    results: PriceCalculationResult[];
    className?: string;
}

export function SmartValueRanking({ results, className }: SmartValueRankingProps) {
    // Sort by value score (descending)
    const rankedModels = useMemo(() => {
        return [...results].sort((a, b) => b.valueScore - a.valueScore);
    }, [results]);

    const topPick = rankedModels[0];

    if (!topPick) return null;

    return (
        <Card className={cn("overflow-hidden border-2 border-primary/20", className)}>
            <CardHeader className="bg-muted/30 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-indigo-500 fill-indigo-500 animate-pulse" />
                        <div className="flex flex-col">
                            <CardTitle>TokenTickr Value Index</CardTitle>
                            <CardDescription>
                                Triple Threat Score: 37.5% Price • 37.5% Intelligence • 25% Capacity
                            </CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-xs font-normal border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
                        Weighted Composite
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pt-6 grid gap-6 md:grid-cols-3">
                {/* Winner Highlight */}
                <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <div className="relative mb-3">
                        <Trophy className="h-12 w-12 text-yellow-500 fill-yellow-500" />
                        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                            #1
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-1">{topPick.modelName}</h3>
                    <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                        {topPick.valueScore}
                        <span className="text-sm text-muted-foreground font-normal ml-1">/100</span>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                        {topPick.eloScore
                            ? `Elo: ${topPick.eloScore} ${topPick.eloSource === 'estimated' ? '(Estimated)' : '(LMSYS Verified)'}`
                            : "Best Value Pick"}
                    </p>
                </div>

                {/* Detailed Rankings */}
                <div className="md:col-span-2 space-y-4">
                    {rankedModels.map((model, idx) => (
                        <div key={model.modelId} className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "font-bold w-5 h-5 flex items-center justify-center rounded text-xs",
                                        idx === 0 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500" : "text-muted-foreground"
                                    )}>
                                        {idx + 1}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-medium truncate max-w-[150px] sm:max-w-xs">{model.modelName}</span>
                                        {model.eloScore && (
                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                Elo: {model.eloScore}
                                                {model.eloSource === 'estimated' && (
                                                    <span className="text-[9px] bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-500 px-1 rounded">
                                                        Est
                                                    </span>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="text-muted-foreground hidden sm:inline">
                                        Price: <span className="text-foreground font-medium">{model.priceScore}</span>
                                    </span>
                                    <span className="text-muted-foreground hidden sm:inline">
                                        Intel: <span className="text-foreground font-medium">{model.perfScore}</span>
                                    </span>
                                    <span className="text-muted-foreground hidden sm:inline">
                                        Ctx: <span className="text-foreground font-medium">{model.contextScore}</span>
                                    </span>
                                    <span className="font-bold text-primary w-8 text-right">
                                        {model.valueScore}
                                    </span>
                                </div>
                            </div>
                            <Progress
                                value={model.valueScore}
                                className={cn("h-2", idx === 0 ? "bg-indigo-100 dark:bg-indigo-950" : "")}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
