"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PriceCalculationResult, AA_ATTRIBUTION } from "@/lib/price-calculation";
import { calculateValueScore, ScoringMode, getModelTier, getTierDisplayInfo } from "@/lib/scoring-utils";
import { ScoringModeToggle } from "@/components/scoring-mode-toggle";
import { MethodologyModal } from "@/components/methodology-modal";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

const SCORING_MODE_KEY = "tokentickr-scoring-mode";

interface SmartValueRankingProps {
    results: PriceCalculationResult[];
    className?: string;
}

export function SmartValueRanking({ results, className }: SmartValueRankingProps) {
    const [scoringMode, setScoringMode] = useState<ScoringMode>("geometric");
    const [isAnimating, setIsAnimating] = useState(false);
    const prevOrderRef = useRef<string[]>([]);

    // Load saved preference on mount
    useEffect(() => {
        const saved = localStorage.getItem(SCORING_MODE_KEY);
        if (saved === "geometric" || saved === "utility") {
            setScoringMode(saved);
        }
    }, []);

    // Save preference on change with animation trigger
    const handleModeChange = (mode: ScoringMode) => {
        setIsAnimating(true);
        setScoringMode(mode);
        localStorage.setItem(SCORING_MODE_KEY, mode);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Recalculate scores based on current mode
    const { validModels, excludedCount } = useMemo(() => {
        // Filter out models with insufficient data
        const valid = results.filter(r => r.eloSource !== 'insufficient-data');
        const excluded = results.length - valid.length;

        // Calculate max perf score for dynamic tier thresholds
        const maxPerfScore = Math.max(...valid.map(r => r.perfScore), 1);

        const recalculated = valid.map(result => {
            const newValueScore = calculateValueScore(
                result.priceScore,
                result.perfScore,
                result.contextScore,
                scoringMode,
                maxPerfScore
            );
            const tier = getModelTier(result.perfScore, maxPerfScore);
            return {
                ...result,
                valueScore: Math.round(newValueScore * 10) / 10,
                tier,
            };
        });
        const sorted = recalculated.sort((a, b) => b.valueScore - a.valueScore);
        prevOrderRef.current = sorted.map(m => m.modelId);
        return { validModels: sorted, excludedCount: excluded };
    }, [results, scoringMode]);

    const topPick = validModels[0];

    // If we have results but no valid models (all filtered), show empty state
    // If we have no results at all, return null (handled by parent usually)
    if (!topPick && results.length > 0) {
        return (
            <Card className={cn("overflow-hidden border border-zinc-200 dark:border-zinc-800", className)}>
                <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-xl font-bold text-muted-foreground">Smart Value Ranking</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">Insufficient intelligence data for selected models.</p>
                </CardHeader>
                <div className="p-6 text-center text-muted-foreground text-sm">
                    {results.length} model{results.length !== 1 ? 's' : ''} excluded due to missing MMLU-Pro scores.
                </div>
            </Card>
        );
    }

    if (!topPick) return null;

    return (
        <Card className={cn("overflow-hidden border border-zinc-200 dark:border-zinc-800", className)}>
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 pb-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        <h2 className="text-xl font-bold text-foreground">Smart Value Ranking</h2>
                    </div>
                    <p className="text-sm text-muted-foreground w-full max-w-lg">Intelligence-weighted composite score</p>
                    <ScoringModeToggle value={scoringMode} onChange={handleModeChange} />
                </div>
                {/* Contextual explanation */}
                <div className={cn(
                    "mt-3 px-3 py-2 rounded text-xs border",
                    scoringMode === "geometric"
                        ? "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                        : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                )}>
                    {scoringMode === "geometric" ? (
                        <><strong>Smart Score:</strong> Intelligence 50% weight — rewards capable models</>
                    ) : (
                        <><strong>Budget Score:</strong> Balanced weighting — best overall value</>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-5 grid gap-5 md:grid-cols-3">
                {/* Winner Highlight */}
                <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900/30 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="relative mb-3">
                        <Trophy className="h-10 w-10 text-amber-500" />
                        <div className="absolute -top-1 -right-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full"> {/* theme-ignore */}
                            #1
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-1">{topPick.modelName}</h3>
                    <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                        {topPick.valueScore}
                        <span className="text-sm text-zinc-500 font-normal ml-1">/100</span>
                    </div>
                    <div className="text-xs text-center text-zinc-500 flex items-center justify-center gap-1">
                        {topPick.eloScore
                            ? (
                                <>
                                    <span>Elo: {topPick.eloScore}</span>
                                    {topPick.eloSource === 'artificial-analysis' && (
                                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                                            <a href={AA_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                AA Index
                                            </a>
                                            <MethodologyModal type="artificial-analysis" />
                                        </span>
                                    )}
                                    {topPick.eloSource === 'lmsys' && (
                                        <span className="text-green-600 dark:text-green-400 flex items-center gap-0.5">
                                            Verified
                                            <MethodologyModal type="lmsys" />
                                        </span>
                                    )}
                                    {topPick.eloSource === 'estimated' && (
                                        <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-0.5">
                                            Est.
                                            <MethodologyModal type="estimated" />
                                        </span>
                                    )}
                                    {topPick.eloSource === 'heuristic' && (
                                        <span className="text-purple-600 dark:text-purple-400 flex items-center gap-0.5">
                                            Heuristic
                                            <MethodologyModal type="heuristic" />
                                        </span>
                                    )}
                                </>
                            )
                            : "Best Value Pick"}
                    </div>
                </div>

                {/* Detailed Rankings */}
                <div className="md:col-span-2 space-y-3">
                    {validModels.map((model, idx) => (
                        <div
                            key={model.modelId}
                            className={cn(
                                "p-3 rounded-lg border transition-all duration-300",
                                idx === 0
                                    ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50"
                                    : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800",
                                isAnimating && "opacity-80"
                            )}
                            style={{
                                transform: isAnimating ? "translateY(2px)" : "translateY(0)",
                                transition: "all 0.3s ease-out"
                            }}
                        >
                            <div className="flex items-center justify-between">
                                {/* Left: Rank + Model Name */}
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "w-6 h-6 flex items-center justify-center rounded text-xs font-bold",
                                        idx === 0
                                            ? "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200"
                                            : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                                    )}>
                                        {idx + 1}
                                    </span>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm">
                                                {model.modelName}
                                            </span>
                                            {scoringMode === "geometric" && model.tier && (() => {
                                                const tierInfo = getTierDisplayInfo(model.tier);
                                                return (
                                                    <span className={cn(
                                                        "px-1.5 py-0.5 rounded text-[9px] font-medium",
                                                        tierInfo.bgColor,
                                                        tierInfo.color
                                                    )}>
                                                        {tierInfo.label}
                                                    </span>
                                                );
                                            })()}
                                        </div>
                                        {model.eloScore && (
                                            <span className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                                                <span>Elo: {model.eloScore}</span>
                                                {model.eloSource === 'artificial-analysis' && (
                                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-1 rounded-[3px] text-[9px] font-medium border border-blue-200 dark:border-blue-800 flex items-center gap-0.5">
                                                        <a href={AA_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                            AA Index
                                                        </a>
                                                        <MethodologyModal type="artificial-analysis" />
                                                    </span>
                                                )}
                                                {model.eloSource === 'mmlu-pro' && (
                                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-1 rounded-[3px] text-[9px] font-medium border border-blue-200 dark:border-blue-800 flex items-center gap-0.5">
                                                        MMLU: {model.mmluPro}%
                                                        <MethodologyModal type="artificial-analysis" />
                                                    </span>
                                                )}
                                                {model.eloSource === 'lmsys' && (
                                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1 rounded-[3px] text-[9px] font-medium border border-green-200 dark:border-green-800 flex items-center gap-0.5">
                                                        Verified
                                                        <MethodologyModal type="lmsys" />
                                                    </span>
                                                )}
                                                {model.eloSource === 'static-override' && (
                                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1 rounded-[3px] text-[9px] font-medium border border-green-200 dark:border-green-800 flex items-center gap-0.5">
                                                        Verified
                                                    </span>
                                                )}
                                                {model.eloSource === 'estimated' && (
                                                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-1 rounded-[3px] text-[9px] font-medium border border-yellow-200 dark:border-yellow-800 flex items-center gap-0.5">
                                                        Est.
                                                        <MethodologyModal type="estimated" />
                                                    </span>
                                                )}
                                                {model.eloSource === 'heuristic' && (
                                                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-1 rounded-[3px] text-[9px] font-medium border border-purple-200 dark:border-purple-800 flex items-center gap-0.5">
                                                        Heuristic
                                                        <MethodologyModal type="heuristic" />
                                                    </span>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Score breakdown */}
                                <div className="flex items-center gap-2">
                                    {/* Component scores - clearer labels with subtle styling */}
                                    <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 cursor-help transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                        <span className="text-zinc-400 text-[9px] uppercase tracking-wide border-b border-dotted border-zinc-300 dark:border-zinc-600">Price</span>
                                                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{model.priceScore}</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs font-semibold">Price Score (0-100)</p>
                                                    <p className="text-[10px] text-zinc-400 max-w-[150px]">Logarithmic score favoring cheaper models. Higher means more affordable.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 cursor-help transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                        <span className="text-zinc-400 text-[9px] uppercase tracking-wide border-b border-dotted border-zinc-300 dark:border-zinc-600">Intel</span>
                                                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{model.perfScore}</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs font-semibold">Intelligence Score (0-100)</p>
                                                    <p className="text-[10px] text-zinc-400 max-w-[150px]">Weighted combo of AA Index (Benchmarks) and Elo (Human Preference).</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex flex-col items-center px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 cursor-help transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                        <span className="text-zinc-400 text-[9px] uppercase tracking-wide border-b border-dotted border-zinc-300 dark:border-zinc-600">Ctx</span>
                                                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{model.contextScore}</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs font-semibold">Context Score (0-100)</p>
                                                    <p className="text-[10px] text-zinc-400 max-w-[150px]">Capacity score. &gt;64k is ideal. Penalizes models with short context windows.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>

                                    {/* Total Score - prominent */}
                                    <div className={cn(
                                        "flex flex-col items-center px-3 py-1 rounded-lg ml-2",
                                        idx === 0
                                            ? "bg-amber-200 dark:bg-amber-800"
                                            : "bg-zinc-200 dark:bg-zinc-700"
                                    )}>
                                        <span className="text-[9px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Total</span>
                                        <span className={cn(
                                            "font-bold text-lg",
                                            idx === 0
                                                ? "text-amber-800 dark:text-amber-200"
                                                : "text-zinc-800 dark:text-zinc-200"
                                        )}>
                                            {model.valueScore}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-2 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        idx === 0
                                            ? "bg-amber-500"
                                            : "bg-zinc-400 dark:bg-zinc-500"
                                    )}
                                    style={{ width: `${model.valueScore}%` }}
                                />
                            </div>
                        </div>
                    ))}

                    {excludedCount > 0 && (
                        <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-900/30 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 text-sm text-muted-foreground mt-4">
                            <span className="font-medium">{excludedCount} models</span> excluded due to insufficient intelligence data.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
