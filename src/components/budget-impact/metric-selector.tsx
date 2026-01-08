"use client";

import React from "react";
import { Button } from "../ui/button";
import { FileText, Mail, FileCode } from "lucide-react";
import { cn } from "../../lib/utils";

export type ImpactMetric = "doc" | "email" | "code";

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
                onClick={() => onChange("doc")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all duration-200 text-xs font-medium",
                    value === "doc"
                        ? "bg-background text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-black/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
                <FileText className={cn("h-3.5 w-3.5 transition-colors", value === "doc" ? "text-blue-500" : "text-muted-foreground")} />
                Documents
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
                onClick={() => onChange("code")}
                className={cn(
                    "flex-1 gap-2 rounded-md transition-all duration-200 text-xs font-medium",
                    value === "code"
                        ? "bg-background text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
                <FileCode className={cn("h-3.5 w-3.5 transition-colors", value === "code" ? "text-indigo-500" : "text-muted-foreground")} />
                Code
            </Button>
        </div>
    );
}
