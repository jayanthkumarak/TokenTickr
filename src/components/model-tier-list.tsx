"use client";

import { useMemo } from "react";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Sparkles, Zap, Brain } from "lucide-react";

interface ModelTierListProps {
    results: PriceCalculationResult[];
    className?: string;
}

type TierType = "Budget" | "Balanced" | "Premium";

interface CategorizedModel extends PriceCalculationResult {
    tier: TierType;
    tags: string[];
}

export function ModelTierList({ results, className }: ModelTierListProps) {
    // Categorize models into tiers based on price and performance
    const categorizedModels = useMemo(() => {
        // Find price ranges
        const costs = results.map(r => r.totalCost);
        const minCost = Math.min(...costs);
        const maxCost = Math.max(...costs);
        const costRange = maxCost - minCost;

        // Find perf ranges if available (using heuristic or null)
        // For now, we'll infer tier mainly from price correlation, 
        // but ideally this comes from the Smart Score "Tier" logic if available in results.
        // Since PriceCalculationResult doesn't strictly have "tier" field yet, we compute it.

        return results.map(model => {
            let tier: TierType = "Balanced";
            const pricePosition = (model.totalCost - minCost) / (costRange || 1);

            if (pricePosition < 0.2) tier = "Budget";
            else if (pricePosition > 0.7) tier = "Premium";

            // Assign tags based on specs
            const tags: string[] = [];
            if (model.modelName.toLowerCase().includes("flash") || model.modelName.toLowerCase().includes("haiku")) tags.push("Fast");
            if (model.contextScore > 80) tags.push("High Context");
            if (model.perfScore > 80) tags.push("Smart");

            return { ...model, tier, tags } as CategorizedModel;
        }).sort((a, b) => a.totalCost - b.totalCost);
    }, [results]);

    const tiers = {
        Budget: categorizedModels.filter(m => m.tier === "Budget"),
        Balanced: categorizedModels.filter(m => m.tier === "Balanced"),
        Premium: categorizedModels.filter(m => m.tier === "Premium"),
    };

    const formatContext = (length: number) => {
        if (length >= 1000000) return `${(length / 1000000).toFixed(0)}M`;
        if (length >= 1000) return `${(length / 1000).toFixed(0)}k`;
        return length.toString();
    };

    const renderTierGroup = (title: string, models: CategorizedModel[], icon: React.ReactNode, description: string) => {
        if (models.length === 0) return null;

        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                    {icon}
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider">{title}</h3>
                        <p className="text-[11px] text-muted-foreground">{description}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    {models.map((model) => {
                        const hasVision = model.capabilityFlags?.includes("Multimodal");
                        const hasThinking = model.capabilityFlags?.includes("Thinking");
                        const hasCoding = model.modelName.toLowerCase().includes("code") || model.modelName.toLowerCase().includes("sonnet") || model.perfScore > 80; // Heuristic for CDE if flag missing

                        // Extract provider (simple heuristic: first word usually)
                        const provider = model.modelName.split(":")[0]?.trim() || "AI";
                        const name = model.modelName.split(":")[1]?.trim() || model.modelName;

                        return (
                            <div
                                key={model.modelId}
                                className="group relative flex items-center justify-between p-3 rounded-md bg-muted/10 hover:bg-muted/30 border border-transparent hover:border-border/30 transition-all duration-200"
                            >
                                {/* 1. Identity (30%) */}
                                <div className="w-[30%] min-w-[140px] pr-4">
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-0.5 truncate">
                                        {provider}
                                    </div>
                                    <div className="font-bold text-sm tracking-tight truncate" title={model.modelName}>
                                        {name}
                                    </div>
                                </div>

                                {/* 2. Specs (40%) - The Matrix */}
                                <div className="w-[40%] flex flex-col gap-2 px-2 border-x border-border/10">
                                    {/* Capabilities Row */}
                                    <div className="flex items-center gap-1.5">
                                        <Badge variant="outline" className={cn("text-[9px] px-1 h-4 rounded-sm border-0 font-mono tracking-widest", hasVision ? "bg-indigo-500/20 text-indigo-400 font-bold" : "bg-muted/20 text-muted-foreground/30")}>
                                            VIS
                                        </Badge>
                                        <Badge variant="outline" className={cn("text-[9px] px-1 h-4 rounded-sm border-0 font-mono tracking-widest", hasThinking ? "bg-purple-500/20 text-purple-400 font-bold" : "bg-muted/20 text-muted-foreground/30")}>
                                            LOG
                                        </Badge>
                                        <Badge variant="outline" className={cn("text-[9px] px-1 h-4 rounded-sm border-0 font-mono tracking-widest", hasCoding ? "bg-blue-500/20 text-blue-400 font-bold" : "bg-muted/20 text-muted-foreground/30")}>
                                            CDE
                                        </Badge>
                                    </div>

                                    {/* Intel & Mem Row */}
                                    <div className="flex items-center gap-3">
                                        {/* Intelligence Bar */}
                                        <div className="flex-1 flex flex-col gap-0.5">
                                            <div className="flex justify-between text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
                                                <span>Intel</span>
                                                <span>{model.perfScore.toFixed(0)}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-emerald-500/50 to-emerald-400 rounded-full"
                                                    style={{ width: `${model.perfScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Memory Badge */}
                                        <div className="flex flex-col items-end gap-0.5 min-w-[36px]">
                                            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">Mem</span>
                                            <span className="text-[10px] font-mono font-bold text-zinc-300">
                                                {formatContext(model.contextLength)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Economics (30%) */}
                                <div className="w-[30%] flex flex-col items-end pl-4">
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-0.5">
                                        Est. Cost
                                    </div>
                                    <div className="font-mono text-sm font-medium">
                                        ${model.totalCost.toFixed(2)}<span className="text-[10px] text-muted-foreground ml-0.5">/mo</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <Card className={cn("p-6 space-y-8 bg-zinc-950/50 backdrop-blur-xl border-zinc-800/50 h-full", className)}>
            <div className="space-y-1">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-100">
                    <Brain className="h-5 w-5 text-indigo-500" />
                    Feature Breakdown
                </h2>
                <p className="text-sm text-muted-foreground">
                    Technical capabilities and performance metrics.
                </p>
            </div>

            <div className="space-y-8">
                {renderTierGroup(
                    "Efficiency Tier",
                    tiers.Budget,
                    <Zap className="h-4 w-4 text-emerald-500" />,
                    "High throughput, low latency"
                )}

                {renderTierGroup(
                    "Balanced Tier",
                    tiers.Balanced,
                    <Check className="h-4 w-4 text-blue-500" />,
                    "General purpose reasoning"
                )}

                {renderTierGroup(
                    "Premium Tier",
                    tiers.Premium,
                    <Sparkles className="h-4 w-4 text-purple-500" />,
                    "Advanced cognitive tasks"
                )}
            </div>
        </Card>
    );
}
