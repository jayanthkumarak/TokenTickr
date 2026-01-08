"use client";

import React, { useMemo } from "react";
import { cn } from "../../lib/utils";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface IsotypeGridProps {
    count: number;
    icon: LucideIcon;
    colorClass: string;
    exceedsContext?: boolean;
    maxIcons?: number;
    className?: string;
    label: string;
}

export function IsotypeGrid({
    count,
    icon: Icon,
    colorClass,
    exceedsContext,
    maxIcons = 64, // grid 8x8 max default
    className,
    label
}: IsotypeGridProps) {

    // Determine scale: 1 icon = X units
    const { displayedIcons, valuePerIcon, hasOverflow } = useMemo(() => {
        if (count <= maxIcons) {
            return { displayedIcons: Math.floor(count), valuePerIcon: 1, hasOverflow: false };
        }

        // If count is huge, we scale down.
        // e.g. 150 count, max 60 -> 1 icon = 150/60 = 2.5 -> ceil to 3?
        // Let's try nice round numbers for scale: 1, 2, 5, 10, 25, 50, 100
        const rawScale = count / maxIcons;
        const scales = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
        const scale = scales.find(s => s >= rawScale) || Math.ceil(rawScale);

        return {
            displayedIcons: Math.min(maxIcons, Math.floor(count / scale)),
            valuePerIcon: scale,
            hasOverflow: count > (maxIcons * scale) // rare if logic correct
        };
    }, [count, maxIcons]);

    // Generate array for rendering
    const icons = Array.from({ length: displayedIcons });

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {/* Legend / Scale Indicator if scaled */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground min-h-[16px]">
                {valuePerIcon > 1 ? (
                    <span className="flex items-center gap-1 opacity-70">
                        <Icon className="h-3 w-3" /> = {valuePerIcon} {label}s
                    </span>
                ) : (
                    <span> </span> // Spacer
                )}
                {exceedsContext && (
                    <span className="text-amber-500 font-medium flex items-center gap-1">
                        ⚠️ Split Req.
                    </span>
                )}
            </div>

            {/* Grid Area */}
            <div className="relative flex flex-wrap gap-1 content-start h-[120px] overflow-hidden mask-fade-bottom">

                {icons.length === 0 && count > 0 && (
                    // Handle edge case where count < 1 (e.g. 0.5 novels)
                    <div className="text-sm text-muted-foreground italic pl-1">
                        &lt; 1 {label}
                    </div>
                )}

                {icons.length === 0 && count === 0 && (
                    <div className="text-sm text-muted-foreground italic pl-1">
                        0 {label}s
                    </div>
                )}

                {icons.map((_, i) => (
                    <TooltipProvider key={i}>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <div className={cn(
                                    "relative transition-all duration-300 hover:scale-125 cursor-help",
                                    // Visual logic for "exceeds context": 
                                    // If split is required, maybe show the icon as "fragmented" or dashed border?
                                    // Or just reliance on the color/badge is cleaner.
                                    // Let's use opacity modulation for the grid if exceeds context to show "instability"?
                                    // Or just keep it clean.
                                    exceedsContext && "opacity-90"
                                )}>
                                    <Icon
                                        className={cn(
                                            "h-4 w-4",
                                            colorClass,
                                            // Create a "stack" effect for high value icons?
                                            valuePerIcon > 1 && "drop-shadow-sm"
                                        )}
                                        strokeWidth={2.5}
                                    />
                                    {/* Fragment Indicator overlay for small context */}
                                    {exceedsContext && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                                            <div className="w-[120%] h-[1px] bg-background rotate-45" />
                                        </div>
                                    )}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                                {valuePerIcon > 1 ? (
                                    <p>Represents {valuePerIcon} {label}s</p>
                                ) : (
                                    <p>1 {label}</p>
                                )}
                                {exceedsContext && (
                                    <p className="text-amber-400 mt-1 font-medium">Split required (Context Limit)</p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>

            {/* Value Check if overflow */}
            {hasOverflow && (
                <div className="text-[10px] text-center text-muted-foreground">
                    + more
                </div>
            )}
        </div>
    );
}
