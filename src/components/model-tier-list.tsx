"use client";

import { useMemo } from "react";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Sparkles, Zap, Brain } from "lucide-react";
import {
    isThinkingModel,
    supportsToolCalling,
    getAgentCapabilitySummary,
    type AgentCapabilitySummary,
} from "@/lib/capability-bonus";
import type { OpenRouterModel } from "@/types/models";

interface ModelTierListProps {
    results: PriceCalculationResult[];
    className?: string;
}

type TierType = "Reasoning" | "Coding" | "LongContext" | "Routing";

interface CategorizedModel extends Omit<PriceCalculationResult, 'tier'> {
    tier: TierType;
    tags: string[];
    summary: AgentCapabilitySummary;
}

type FlagCarrier = Pick<
  PriceCalculationResult,
  'modelId' | 'modelName' | 'capabilityFlags' | 'structuredOutputSupported' | 'outputPremiumRatio'
>;

function toShim(m: FlagCarrier): OpenRouterModel {
    return { id: m.modelId, name: m.modelName } as OpenRouterModel;
}

function hasThinking(m: FlagCarrier): boolean {
    return (
        m.capabilityFlags?.includes("Thinking") === true ||
        isThinkingModel(toShim(m))
    );
}

function hasTools(m: FlagCarrier): boolean {
    return (
        m.capabilityFlags?.includes("Tools") === true ||
        supportsToolCalling(toShim(m))
    );
}

function summaryFor(m: FlagCarrier): AgentCapabilitySummary {
    const base = getAgentCapabilitySummary(toShim(m));
    const flags = m.capabilityFlags ?? [];
    return {
        thinking: base.thinking || hasThinking(m),
        tools: base.tools || hasTools(m),
        structuredOutputs:
            base.structuredOutputs ||
            m.structuredOutputSupported === true ||
            flags.includes("JSON Schema"),
        promptCaching: base.promptCaching || flags.includes("Cache"),
        multimodal: base.multimodal || flags.includes("Multimodal"),
        outputPremiumRatio: m.outputPremiumRatio,
    };
}

export function ModelTierList({ results, className }: ModelTierListProps) {
    // Deterministic role tiers based on capabilities + scores. A model may
    // appear in multiple tiers.
    const tiers = useMemo(() => {
        const costs = results.map(r => r.totalCost);
        const minCost = Math.min(...costs);
        const maxCost = Math.max(...costs);
        const range = maxCost - minCost || 1;

        const withSummary: CategorizedModel[] = results.map((model) => ({
            ...model,
            tier: "Routing" as TierType,
            tags: [],
            summary: summaryFor(model),
        }));

        const reasoning = withSummary
            .filter((m) => hasThinking(m) || m.perfScore >= 85)
            .map((m) => ({ ...m, tier: "Reasoning" as TierType }))
            .sort((a, b) => b.perfScore - a.perfScore);
        const coding = withSummary
            .filter((m) => hasTools(m) && m.perfScore >= 65)
            .map((m) => ({ ...m, tier: "Coding" as TierType }))
            .sort((a, b) => b.perfScore - a.perfScore);
        const longContext = withSummary
            .filter((m) => m.contextLength >= 500000)
            .map((m) => ({ ...m, tier: "LongContext" as TierType }))
            .sort((a, b) => b.contextLength - a.contextLength);
        const routing = withSummary
            .filter((m) => (m.totalCost - minCost) / range <= 0.35)
            .map((m) => ({ ...m, tier: "Routing" as TierType }))
            .sort((a, b) => a.totalCost - b.totalCost);

        return { reasoning, coding, longContext, routing };
    }, [results]);

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
                        const s = model.summary;
                        const badges = [
                            { label: "THINK", on: s.thinking, onClass: "bg-purple-500/20 text-purple-400", tip: s.thinking ? "Reasoning optimized" : "Standard logic" },
                            { label: "TOOLS", on: s.tools, onClass: "bg-blue-500/20 text-blue-400", tip: s.tools ? "Tool calling supported" : "No tool calling" },
                            { label: "JSON", on: s.structuredOutputs, onClass: "bg-emerald-500/20 text-emerald-400", tip: s.structuredOutputs ? "Structured outputs supported" : "No structured outputs" },
                            { label: "VISION", on: s.multimodal, onClass: "bg-indigo-500/20 text-indigo-400", tip: s.multimodal ? "Vision capable" : "Text only" },
                            { label: "CACHE", on: s.promptCaching, onClass: "bg-amber-500/20 text-amber-400", tip: s.promptCaching ? "Prompt caching supported" : "No prompt caching" },
                        ];

                        // Extract provider (simple heuristic: first word usually)
                        const provider = model.modelName.split(":")[0]?.trim() || "AI";
                        const name = model.modelName.split(":")[1]?.trim() || model.modelName;

                        return (
                            <div
                                key={`${title}-${model.modelId}`}
                                className="group relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between p-3 rounded-md bg-white border border-border/40 shadow-sm hover:shadow-md hover:border-border/80 dark:bg-muted/10 dark:border-transparent dark:hover:bg-muted/30 transition-all duration-200"
                            >
                                {/* 1. Identity */}
                                <div className="w-full sm:flex-1 sm:min-w-0 sm:pr-4">
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-0.5 truncate">
                                        {provider}
                                    </div>
                                    <div className="font-bold text-sm tracking-tight truncate" title={model.modelName}>
                                        {name}
                                    </div>
                                </div>

                                {/* 2. Specs - The Matrix */}
                                <div className="w-full sm:flex-1 flex flex-col gap-2 sm:px-2 sm:border-x border-border/10">
                                    {/* Capabilities Row */}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {badges.map((b) => (
                                            <Badge
                                                key={b.label}
                                                variant="outline"
                                                title={b.tip}
                                                className={cn(
                                                    "text-xs px-1.5 h-5 rounded-sm border-0 font-mono tracking-widest",
                                                    b.on ? b.onClass + " font-bold" : "bg-muted/20 text-muted-foreground/30"
                                                )}
                                            >
                                                {b.label}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Intel & Mem Row */}
                                    <div className="flex items-center gap-3">
                                        {/* Intelligence Bar */}
                                        <div className="flex-1 flex flex-col gap-0.5">
                                            <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                                                <span>Intel</span>
                                                <span>{model.perfScore.toFixed(0)}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-br from-chart-1/60 to-chart-1 rounded-full"
                                                    style={{ width: `${model.perfScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Memory Badge */}
                                        <div className="flex flex-col items-end gap-0.5 min-w-[36px]">
                                            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Mem</span>
                                            <span className="text-xs font-mono font-bold text-foreground">
                                                {formatContext(model.contextLength)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Economics */}
                                <div className="w-full sm:w-auto flex sm:flex-col flex-row items-center sm:items-end justify-between sm:justify-start gap-1 sm:pl-4">
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold sm:mb-0.5">
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
        <Card className={cn("p-6 space-y-8 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-xl border-border/50 h-full", className)}>
            <div className="space-y-1">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <Brain className="h-5 w-5 text-indigo-500" />
                    Feature Breakdown
                </h2>
                <p className="text-sm text-muted-foreground">
                    Technical capabilities and performance metrics.
                </p>
            </div>

            <div className="space-y-8">
                {renderTierGroup(
                    "Reasoning & Planning",
                    tiers.reasoning,
                    <Brain className="h-4 w-4 text-purple-500" />,
                    "Deep reasoning and complex planning"
                )}

                {renderTierGroup(
                    "Coding & Tool Execution",
                    tiers.coding,
                    <Check className="h-4 w-4 text-blue-500" />,
                    "Tool calling with strong intelligence"
                )}

                {renderTierGroup(
                    "Long-Context Synthesis",
                    tiers.longContext,
                    <Sparkles className="h-4 w-4 text-indigo-500" />,
                    "500k+ token context windows"
                )}

                {renderTierGroup(
                    "High-Speed Routing",
                    tiers.routing,
                    <Zap className="h-4 w-4 text-emerald-500" />,
                    "Cheapest third for bulk throughput"
                )}
            </div>
        </Card>
    );
}
