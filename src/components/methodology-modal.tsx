"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface MethodologyModalProps {
    type: 'lmsys' | 'estimated' | 'heuristic' | 'artificial-analysis';
    className?: string;
}

const METHODOLOGY_CONTENT = {
    lmsys: {
        title: "LMSYS Verified Score",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        description: "This Elo score comes directly from the LMSYS Chatbot Arena leaderboard.",
        details: [
            "Based on 1M+ human evaluations using blind A/B testing",
            "Users compare two anonymous models and vote for the better response",
            "Votes are aggregated using a Bradley-Terry model to compute Elo ratings",
            "This is the gold standard for LLM evaluation",
        ],
        formula: null as string | null,
        source: "https://chat.lmsys.org",
        confidence: "High",
    },
    estimated: {
        title: "Estimated Score",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        description: "This Elo score is estimated based on the model family and announced capabilities.",
        details: [
            "Model is not yet in LMSYS Arena, but belongs to a known family",
            "Estimated from parent model performance (e.g., Llama 3.1 from Llama 3)",
            "Considers official benchmarks announced by the provider",
            "May be 50-100 Elo points off from true performance",
        ],
        formula: null as string | null,
        source: null as string | null,
        confidence: "Medium",
    },
    heuristic: {
        title: "Heuristic Score",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        description: "This Elo score is calculated algorithmically from observable model characteristics.",
        details: [
            "Used when no direct performance data exists",
            "Formula considers: parameter count, model family, and context length",
            "Should be treated as a rough approximation only",
            "We prioritize replacing heuristic scores with verified data when available",
        ],
        formula: `heuristicElo = baseElo + paramBonus + familyBonus + contextBonus` as string | null,
        source: null as string | null,
        confidence: "Low",
    },
    'artificial-analysis': {
        title: "Intelligence Index",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        description: "This score is derived from Artificial Analysis' composite Intelligence Index.",
        details: [
            "Aggregates multiple independent benchmarks for reliability",
            "Includes MMLU-Pro, LiveBench, AIME 2024/2025, GPQA Diamond, and IFBench",
            "LiveBench is contamination-resistant with monthly question updates",
            "More objective than human preference (LMSYS) for measuring raw capability",
        ],
        formula: null as string | null,
        source: "https://artificialanalysis.ai",
        confidence: "High",
    },
};

export function MethodologyModal({ type, className }: MethodologyModalProps) {
    const content = METHODOLOGY_CONTENT[type];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-help ${className}`}
                    aria-label={`Learn about ${content.title}`}
                >
                    <Info className="w-3 h-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className={`flex items-center gap-2 ${content.color}`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${content.bgColor}`} />
                        {content.title}
                    </DialogTitle>
                    <DialogDescription className="text-left pt-2">
                        {content.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">How it works:</h4>
                        <ul className="space-y-1.5">
                            {content.details.map((detail, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-zinc-400 mt-1">•</span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {content.formula && (
                        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3">
                            <h4 className="text-xs font-semibold text-zinc-500 mb-1">Formula:</h4>
                            <code className="text-xs text-zinc-600 dark:text-zinc-400">
                                {content.formula}
                            </code>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <div className="text-xs text-zinc-500">
                            Confidence: <span className={content.color}>{content.confidence}</span>
                        </div>
                        {content.source && (
                            <a
                                href={content.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline"
                            >
                                View Source →
                            </a>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
