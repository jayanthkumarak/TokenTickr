"use client";

import React from "react";
import { ImpactMetric } from "./metric-selector";
import { cn } from "../../lib/utils";
import { BookOpen, Mail, Terminal } from "lucide-react";

interface ImpactCardProps {
    modelName: string;
    modelColor: string;
    metric: ImpactMetric;
    count: number;
    budget: number;
    isBestValue?: boolean;
}

export function ImpactCard({ modelName, modelColor, metric, count, budget, isBestValue }: ImpactCardProps) {

    // Config for each metric type
    const config = {
        novel: {
            label: "Novels",
            subtext: "50k words",
            icon: BookOpen,
            colorClass: "text-blue-500",
            bgClass: "bg-blue-500/10",
            borderClass: "border-blue-500/20"
        },
        email: {
            label: "Emails",
            subtext: "250 words",
            icon: Mail,
            colorClass: "text-amber-500",
            bgClass: "bg-amber-500/10",
            borderClass: "border-amber-500/20"
        },
        script: {
            label: "Scripts",
            subtext: "500 lines",
            icon: Terminal,
            colorClass: "text-emerald-500",
            bgClass: "bg-emerald-500/10",
            borderClass: "border-emerald-500/20"
        }
    };

    const type = config[metric];
    const Icon = type.icon;

    // Dynamic gradient backgrounds for "Best Value" based on metric
    const bestValueGradients = {
        novel: "from-blue-600 to-indigo-700 shadow-blue-900/20",
        email: "from-amber-500 to-orange-600 shadow-orange-900/20",
        script: "from-emerald-600 to-teal-700 shadow-emerald-900/20"
    };

    return (
        <div className={cn(
            "relative flex flex-col p-5 rounded-2xl border transition-all duration-300",
            isBestValue
                ? cn(
                    "bg-gradient-to-br text-primary-foreground border-transparent md:col-span-2 shadow-xl scale-[1.02] z-10",
                    bestValueGradients[metric]
                )
                : "bg-card hover:bg-accent/50 text-card-foreground border-border/60 hover:border-border hover:shadow-lg"
        )}>
            {/* Best Value Badge */}
            {isBestValue && (
                <div className="absolute -top-3 -right-3 bg-white text-zinc-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-zinc-100">
                    <span className="text-sm">👑</span> Best Value
                </div>
            )}

            <div className={cn("flex items-center gap-2 mb-4", isBestValue ? "opacity-90" : "opacity-70")}>
                <div
                    className="w-2 h-2 rounded-full ring-2 ring-current ring-opacity-20"
                    style={{ backgroundColor: isBestValue ? 'white' : modelColor }}
                />
                <span className="text-xs font-medium tracking-wide truncate max-w-[140px]" title={modelName}>
                    {modelName}
                </span>
            </div>

            <div className="flex-1 flex flex-col justify-end space-y-3">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className={cn(
                        "font-bold tracking-tighter tabular-nums leading-none",
                        isBestValue ? "text-5xl drop-shadow-sm" : "text-4xl"
                    )}>
                        {count.toLocaleString()}
                    </span>
                    <span className={cn(
                        "text-sm font-medium uppercase tracking-wider",
                        isBestValue ? "opacity-90" : "opacity-60"
                    )}>
                        {type.label}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className={cn(
                        "flex items-center gap-2 text-[10px] rounded-md px-2.5 py-1.5 font-medium transition-colors",
                        isBestValue
                            ? "bg-white/20 text-primary-foreground border border-white/20 backdrop-blur-sm"
                            : "bg-muted/50 text-muted-foreground border border-border"
                    )}>
                        <Icon className={cn("h-3 w-3", !isBestValue && type.colorClass)} />
                        <span>for ${budget}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
