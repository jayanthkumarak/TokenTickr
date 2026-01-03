"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Mail, Terminal, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

export type ImpactMetric = "novel" | "email" | "script";

interface MetricSelectorProps {
    value: ImpactMetric;
    onChange: (value: ImpactMetric) => void;
}

export function MetricSelector({ value, onChange }: MetricSelectorProps) {
    return (
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("novel")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all text-xs font-medium",
                    value === "novel"
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                )}
            >
                <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                Novels
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("email")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all text-xs font-medium",
                    value === "email"
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                )}
            >
                <Mail className="h-3.5 w-3.5 text-amber-500" />
                Emails
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("script")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all text-xs font-medium",
                    value === "script"
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                )}
            >
                <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                Scripts
            </Button>
        </div>
    );
}
