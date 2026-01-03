"use client";

import React from "react";
import { Button } from "../ui/button";
import { BookOpen, Mail, Terminal } from "lucide-react";
import { cn } from "../../lib/utils";

export type ImpactMetric = "novel" | "email" | "script";

interface MetricSelectorProps {
    value: ImpactMetric;
    onChange: (value: ImpactMetric) => void;
}

export function MetricSelector({ value, onChange }: MetricSelectorProps) {
    return (
        <div className="flex p-1 bg-muted/80 rounded-lg border border-border/50 backdrop-blur-sm">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("novel")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all duration-200 text-xs font-medium",
                    value === "novel"
                        ? "bg-background text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-black/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
                <BookOpen className={cn("h-3.5 w-3.5 transition-colors", value === "novel" ? "text-blue-500" : "text-muted-foreground")} />
                Novels
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("email")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all duration-200 text-xs font-medium",
                    value === "email"
                        ? "bg-background text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-black/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
                <Mail className={cn("h-3.5 w-3.5 transition-colors", value === "email" ? "text-amber-500" : "text-muted-foreground")} />
                Emails
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("script")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all duration-200 text-xs font-medium",
                    value === "script"
                        ? "bg-background text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-black/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
                <Terminal className={cn("h-3.5 w-3.5 transition-colors", value === "script" ? "text-emerald-500" : "text-muted-foreground")} />
                Scripts
            </Button>
        </div>
    );
}
