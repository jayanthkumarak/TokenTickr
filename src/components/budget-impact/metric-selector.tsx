"use client";

import React from "react";
import { Button } from "../ui/button";
import { FileCode, Search, Wrench } from "lucide-react";
import { cn } from "../../lib/utils";

export type ImpactMetric = "coding" | "research" | "triage";

export interface ImpactArchetype {
    id: ImpactMetric;
    label: string;
    description: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    minContext: number;
}

function formatK(n: number): string {
    return n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`;
}

export const IMPACT_ARCHETYPES: Record<ImpactMetric, ImpactArchetype> = {
    coding: {
        id: "coding",
        label: "Autonomous PRs",
        description: "8 turns × 6k in + 1.5k out",
        promptTokens: 48000,
        completionTokens: 12000,
        totalTokens: 60000,
        minContext: 64000,
    },
    research: {
        id: "research",
        label: "Deep Research Runs",
        description: "6 turns × 12k in + 2k out",
        promptTokens: 72000,
        completionTokens: 12000,
        totalTokens: 84000,
        minContext: 128000,
    },
    triage: {
        id: "triage",
        label: "Tool Triage",
        description: "3 turns × 2k in + 500 out",
        promptTokens: 6000,
        completionTokens: 1500,
        totalTokens: 7500,
        minContext: 16000,
    },
};

export const IMPACT_METRIC_ORDER: ImpactMetric[] = ["coding", "research", "triage"];

const METRIC_STYLE: Record<ImpactMetric, { icon: typeof FileCode; active: string; iconColor: string }> = {
    coding: {
        icon: FileCode,
        active: "bg-background text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5",
        iconColor: "text-indigo-500",
    },
    research: {
        icon: Search,
        active: "bg-background text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-black/5",
        iconColor: "text-blue-500",
    },
    triage: {
        icon: Wrench,
        active: "bg-background text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-black/5",
        iconColor: "text-amber-500",
    },
};

interface MetricSelectorProps {
    value: ImpactMetric;
    onChange: (value: ImpactMetric) => void;
}

export function MetricSelector({ value, onChange }: MetricSelectorProps) {
    return (
        <div className="flex p-1 bg-muted/80 rounded-lg border border-border/50 backdrop-blur-sm">
            {IMPACT_METRIC_ORDER.map((id) => {
                const arch = IMPACT_ARCHETYPES[id];
                const style = METRIC_STYLE[id];
                const Icon = style.icon;
                const isActive = value === id;
                return (
                    <Button
                        key={id}
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange(id)}
                        title={`${arch.label}: ${arch.description} (${formatK(arch.totalTokens)} tok/task, min window ${formatK(arch.minContext)})`}
                        className={cn(
                            "flex-1 gap-2 rounded-md transition-all duration-200 text-xs font-medium",
                            isActive
                                ? style.active
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                    >
                        <Icon className={cn("h-3.5 w-3.5 transition-colors", isActive ? style.iconColor : "text-muted-foreground")} />
                        {arch.label}
                        <span className={cn("font-normal tabular-nums", isActive ? "opacity-80" : "opacity-60")}>
                            {formatK(arch.totalTokens)}
                        </span>
                    </Button>
                );
            })}
        </div>
    );
}
