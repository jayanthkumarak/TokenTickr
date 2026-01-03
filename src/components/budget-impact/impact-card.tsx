"use client";

import { ImpactMetric } from "./metric-selector";
import { cn } from "@/lib/utils";
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

    return (
        <div className={cn(
            "relative flex flex-col p-4 rounded-xl border transition-all hover:shadow-md",
            isBestValue
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-transparent md:col-span-2 shadow-lg scale-[1.02]"
                : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800"
        )}>
            {/* Best Value Badge */}
            {isBestValue && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    👑 Best Value
                </div>
            )}

            <div className="flex items-center gap-2 mb-3 opacity-90">
                <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: modelColor }}
                />
                <span className="text-xs font-semibold truncate max-w-[120px]" title={modelName}>
                    {modelName}
                </span>
            </div>

            <div className="flex-1 flex flex-col justify-end">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className={cn("text-3xl font-bold tracking-tight", isBestValue && "text-4xl")}>
                        {count.toLocaleString()}
                    </span>
                    <span className={cn("text-sm font-medium opacity-70", isBestValue && "ml-1")}>
                        {type.label}
                    </span>
                </div>

                <div className={cn(
                    "mt-3 flex items-center gap-2 text-[10px] rounded px-2 py-1.5 w-fit border",
                    isBestValue
                        ? "bg-white/10 border-white/10 text-white/80"
                        : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 border-zinc-100 dark:border-zinc-800"
                )}>
                    <Icon className="h-3 w-3" />
                    <span>for ${budget}</span>
                </div>
            </div>
        </div>
    );
}
