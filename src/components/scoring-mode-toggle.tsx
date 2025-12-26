"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export type ScoringMode = "geometric" | "utility";

interface ScoringModeToggleProps {
    value: ScoringMode;
    onChange: (mode: ScoringMode) => void;
}

const SCORING_MODES = [
    {
        value: "geometric" as const,
        label: "Smart Score",
        description: "Intelligence-first • Best for quality-focused teams",
        shortTip: "Prioritizes model intelligence (50% weight) over cost savings",
    },
    {
        value: "utility" as const,
        label: "Budget Score",
        description: "Efficiency-first • Best for high-volume throughput",
        shortTip: "Values context capacity per dollar — great for bulk workloads",
    },
];

export function ScoringModeToggle({ value, onChange }: ScoringModeToggleProps) {
    const [open, setOpen] = React.useState(false);
    const selected = SCORING_MODES.find((m) => m.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[160px] justify-between text-xs h-8"
                >
                    {selected?.label || "Select mode..."}
                    <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-2">
                <div className="space-y-1">
                    {SCORING_MODES.map((mode) => (
                        <button
                            key={mode.value}
                            onClick={() => {
                                onChange(mode.value);
                                setOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-start gap-2 px-2 py-2 rounded-md text-left transition-colors",
                                "hover:bg-muted",
                                value === mode.value && "bg-muted"
                            )}
                        >
                            <Check
                                className={cn(
                                    "h-4 w-4 mt-0.5 shrink-0",
                                    value === mode.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{mode.label}</span>
                                <span className="text-xs text-muted-foreground">
                                    {mode.description}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
