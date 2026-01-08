import React from "react";
import { ImpactMetric } from "./metric-selector";
import { cn } from "../../lib/utils";
import { FileText, Mail, FileCode } from "lucide-react";
import { IsotypeGrid } from "./isotype-grid";

interface ImpactCardProps {
    modelName: string;
    modelColor: string;
    metric: ImpactMetric;
    count: number;
    budget: number;
    isBestValue?: boolean;
    exceedsContext?: boolean;
}

export function ImpactCard({ modelName, modelColor, metric, count, budget, isBestValue, exceedsContext }: ImpactCardProps) {

    // Config for each metric type
    const config = {
        doc: {
            label: "Documents",
            subtext: "20k tokens",
            icon: FileText,
            colorClass: "text-blue-500",
            bgClass: "bg-blue-500/10",
            borderClass: "border-blue-500/20"
        },
        email: {
            label: "Emails",
            subtext: "500 tokens",
            icon: Mail,
            colorClass: "text-amber-500",
            bgClass: "bg-amber-500/10",
            borderClass: "border-amber-500/20"
        },
        code: {
            label: "Code Files",
            subtext: "2000 tokens",
            icon: FileCode,
            colorClass: "text-indigo-500",
            bgClass: "bg-indigo-500/10",
            borderClass: "border-indigo-500/20"
        }
    };

    const type = config[metric];
    // const Icon = type.icon; // Used in grid now

    // Dynamic gradient backgrounds for "Best Value" based on metric
    const bestValueGradients = {
        doc: "from-blue-600 to-indigo-700 shadow-blue-900/20",
        email: "from-amber-500 to-orange-600 shadow-orange-900/20",
        code: "from-indigo-600 to-purple-700 shadow-indigo-900/20"
    };

    return (
        <div className={cn(
            "relative flex flex-col p-5 rounded-2xl border transition-all duration-300 min-h-[220px]",
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

            {/* Header: Model Name */}
            <div className={cn("flex items-center gap-2 mb-3", isBestValue ? "opacity-90" : "opacity-70")}>
                <div
                    className="w-2 h-2 rounded-full ring-2 ring-current ring-opacity-20"
                    style={{ backgroundColor: isBestValue ? 'white' : modelColor }}
                />
                <span className="text-xs font-medium tracking-wide truncate max-w-[140px]" title={modelName}>
                    {modelName}
                </span>
            </div>

            {/* Content: Isotype Grid */}
            <div className="flex-1 w-full relative z-0">
                <IsotypeGrid
                    count={count}
                    icon={type.icon}
                    colorClass={isBestValue ? "text-primary-foreground/90" : type.colorClass}
                    exceedsContext={exceedsContext}
                    label={type.label.slice(0, -1)} // remove plural 's'
                    className={isBestValue ? "text-primary-foreground" : ""}
                />
            </div>

            {/* Footer layout */}
            <div className="flex-none flex flex-col justify-end space-y-2 mt-4 pt-4 border-t border-dashed border-opacity-20 border-current">
                <div className="flex items-baseline justify-between gap-1.5 flex-wrap">

                    {/* Big Number Summary */}
                    <div className="flex items-baseline gap-1.5">
                        <span className={cn(
                            "font-bold tracking-tighter tabular-nums leading-none",
                            isBestValue ? "text-3xl drop-shadow-sm" : "text-2xl"
                        )}>
                            {count.toLocaleString()}
                        </span>
                        <span className={cn(
                            "text-xs font-medium uppercase tracking-wider",
                            isBestValue ? "opacity-90" : "opacity-60"
                        )}>
                            {type.label}
                        </span>
                    </div>

                    <div className={cn(
                        "text-[10px] opacity-60 font-medium",
                        isBestValue ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                        for ${budget}
                    </div>
                </div>
            </div>
        </div>
    );
}
