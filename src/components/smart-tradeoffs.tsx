"use client";

import { useMemo } from "react";
import { PriceCalculationResult } from "@/lib/price-calculation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingDown, TrendingUp, Scale, Eye, Brain, Zap, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartTradeoffsProps {
    results: PriceCalculationResult[];
    className?: string;
}

export function SmartTradeoffs({ results, className }: SmartTradeoffsProps) {
    const scenarios = useMemo(() => {
        if (results.length < 2) return [];

        const sortedByPrice = [...results].sort((a, b) => a.totalCost - b.totalCost);
        const cheapest = sortedByPrice[0];
        const expensive = sortedByPrice[sortedByPrice.length - 1];

        // Find specific capability leaders
        const visionModel = results.find(m => m.capabilityFlags?.includes('Multimodal'));
        const thinkingModel = results.find(m => m.capabilityFlags?.includes('Thinking'));

        // Find best value (highest score)
        const bestValue = results.reduce((prev, current) =>
            (current.valueScore || 0) > (prev.valueScore || 0) ? current : prev
            , results[0]);

        // Find best raw performance (ignoring price)
        const bestPerf = results.reduce((prev, current) =>
            (current.perfScore || 0) > (prev.perfScore || 0) ? current : prev
            , results[0]);

        const items = [];

        // 1. Efficiency/Savings Scenario
        // Trigger if there is meaningful absolute savings OR significant relative difference
        // Changed from 5x to > 20% diff (1.2x) OR > $10 absolute savings
        const savings = expensive.totalCost - cheapest.totalCost;
        if (savings > 10 || expensive.totalCost > cheapest.totalCost * 1.2) {
            items.push({
                type: "savings",
                title: "Efficiency Swap",
                icon: <TrendingDown className="h-4 w-4 text-emerald-500" />,
                from: expensive,
                to: cheapest,
                impact: `Save $${savings.toFixed(2)}/mo`,
                description: `Switching from the most expensive to the most efficient model creates adequate budget headroom.`
            });
        }

        // 2. The Logic Upgrade (Thinking)
        // If a thinking model exists, is affordable (not the most expensive), and users are on a basic model
        if (thinkingModel && thinkingModel.modelId !== expensive.modelId && thinkingModel.modelId !== cheapest.modelId) {
            const costDiff = thinkingModel.totalCost - cheapest.totalCost;
            items.push({
                type: "upgrade",
                title: "Reasoning Upgrade",
                icon: <Brain className="h-4 w-4 text-purple-500" />,
                from: cheapest,
                to: thinkingModel,
                impact: `Unlock Thinking`,
                description: `For complex logic tasks, ${thinkingModel.modelName} offers deep reasoning capabilities for just +$${costDiff.toFixed(2)}/mo.`
            });
        }

        // 3. The Vision Upgrade
        // If users are on a text-only model but a vision model is available for cheap
        if (visionModel && !cheapest.capabilityFlags?.includes('Multimodal')) {
            const costDiff = visionModel.totalCost - cheapest.totalCost;
            // Relaxed: Suggest if cost difference is reasonable (< $20 or < 50% increase)
            if (costDiff < 20 || costDiff < cheapest.totalCost * 0.5) {
                items.push({
                    type: "upgrade",
                    title: "Vision Upgrade",
                    icon: <Eye className="h-4 w-4 text-blue-500" />,
                    from: cheapest,
                    to: visionModel,
                    impact: `Add Vision`,
                    description: `Enable multimodal analysis (images/text) by upgrading to ${visionModel.modelName}.`
                });
            }
        }

        // 4. "Smart Value" (Best Bang for Buck)
        // If the best value model isn't simply the cheapest one, recommend it
        if (bestValue.modelId !== cheapest.modelId && bestValue.modelId !== thinkingModel?.modelId) {
            const costDiff = bestValue.totalCost - cheapest.totalCost;
            const scoreDiff = (bestValue.perfScore - cheapest.perfScore);

            // Relaxed threshold: show if any positive score gain > 5
            if (scoreDiff > 5) {
                items.push({
                    type: "value",
                    title: "Smart Performance Value",
                    icon: <Zap className="h-4 w-4 text-amber-500" />,
                    from: cheapest,
                    to: bestValue,
                    impact: `+${scoreDiff.toFixed(0)}% Intel`,
                    description: `Get higher intelligence per dollar. The math says this is your best trade-off.`
                });
            }
        }

        // 5. "Maximum Octane" (Pure Performance Fallback)
        // If "Smart Value" didn't pick the absolute best performance model, show it here
        const topItemIds = items.map(i => i.to.modelId);
        if (bestPerf.modelId !== cheapest.modelId && !topItemIds.includes(bestPerf.modelId)) {
            const costDiff = bestPerf.totalCost - cheapest.totalCost;
            const scoreDiff = (bestPerf.perfScore - cheapest.perfScore);
            if (scoreDiff > 0) {
                items.push({
                    type: "upgrade",
                    title: "Max Intelligence",
                    icon: <TrendingUp className="h-4 w-4 text-rose-500" />,
                    from: cheapest,
                    to: bestPerf,
                    impact: `Top Tier`,
                    description: `The highest performing model in your selection. +${scoreDiff.toFixed(0)} points higher than baseline.`
                });
            }
        }

        // 6. Context Value King
        const bestContextValue = results
            .filter(r => r.totalCost > 0)
            .reduce((prev, curr) => {
                const prevRatio = prev.contextScore / prev.totalCost;
                const currRatio = curr.contextScore / curr.totalCost;
                return currRatio > prevRatio ? curr : prev;
            }, results[0]);

        if (bestContextValue.modelId !== cheapest.modelId && items.length < 4) {
            const alreadyListed = items.some(i => i.to.modelId === bestContextValue.modelId);
            if (!alreadyListed) {
                items.push({
                    type: "context",
                    title: "Context Value King",
                    icon: <Coins className="h-4 w-4 text-indigo-500" />,
                    from: null, // Single model highlight
                    to: bestContextValue,
                    impact: `Best Scalability`,
                    description: `${bestContextValue.modelName} offers the most context window capacity per dollar spent.`
                });
            }
        }

        // 7. STRATEGIC VALUE (The "Sweet Spot" Logic)
        // Look for High Performance (>85% of Max) at Massive Savings (>40% off Max)
        // This replaces the generic "Smart Performance Value" if it finds a strong candidate against the anchor.
        const premiumAnchor = expensive; // The most expensive is usually the anchor
        const valueChallenger = sortedByPrice.find(m => {
            if (m.modelId === premiumAnchor.modelId) return false;

            // Criteria 1: Retention (>85% of anchor's intel)
            const perfRetention = m.perfScore / (premiumAnchor.perfScore || 1);
            if (perfRetention < 0.85) return false;

            // Criteria 2: Savings (>40% cheaper than anchor)
            const priceRatio = m.totalCost / (premiumAnchor.totalCost || 1);
            if (priceRatio > 0.6) return false; // Must be < 60% of cost

            return true;
        });

        if (valueChallenger) {
            // prioritized insert (put it second, after absolute savings or first if no savings)
            const savingsPercent = ((premiumAnchor.totalCost - valueChallenger.totalCost) / premiumAnchor.totalCost * 100).toFixed(0);
            const retentionPercent = ((valueChallenger.perfScore / premiumAnchor.perfScore) * 100).toFixed(0);

            // Check if we already have this pair to avoid dupes
            const duplicateIndex = items.findIndex(i => i.to.modelId === valueChallenger.modelId && i.type === 'value');
            if (duplicateIndex !== -1) items.splice(duplicateIndex, 1);

            items.splice(1, 0, { // Insert at near top
                type: "value",
                title: "Strategic Value",
                icon: <Zap className="h-4 w-4 text-amber-500" />,
                from: premiumAnchor,
                to: valueChallenger,
                impact: `Sweet Spot`,
                description: `${valueChallenger.modelName} retains ${retentionPercent}% of ${premiumAnchor.modelName}'s intelligence while reducing costs by ${savingsPercent}%. This represents a highly efficient trade-off.`
            });
        }

        // 8. Ultimate Fallback: Just compare cheapest to expensive if nothing else showed up
        if (items.length === 0 && results.length > 1) {
            const diff = expensive.totalCost - cheapest.totalCost;
            items.push({
                type: "upgrade",
                title: "Premium Upgrade",
                icon: <ArrowRight className="h-4 w-4 text-zinc-500" />,
                from: cheapest,
                to: expensive,
                impact: `Upgrade`,
                description: `Compare broad capabilities between your entry-level and premium selections.`
            });
        }

        return items.slice(0, 4); // Limit to top 4 scenarios
    }, [results]);

    if (scenarios.length === 0) return null;

    return (
        <Card className={cn("bg-white/50 dark:bg-black/20 h-full flex flex-col overflow-hidden", className)}>
            <div className="p-6 pb-2 space-y-1">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Scale className="h-5 w-5 text-amber-500" />
                    Smart Trade-offs
                </h2>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{scenarios.length} opportunities</span> found for your selection.
                </p>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="divide-y divide-border/40">
                    {scenarios.map((scenario, idx) => (
                        <div key={idx} className="p-4 hover:bg-muted/30 transition-colors flex flex-col gap-2">
                            {/* Header Line: Title + Impact */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className={cn("p-1.5 rounded-md bg-muted/50",
                                        scenario.type === "savings" && "text-emerald-500 bg-emerald-500/10",
                                        scenario.type === "upgrade" && "text-purple-500 bg-purple-500/10",
                                        scenario.type === "value" && "text-amber-500 bg-amber-500/10",
                                        scenario.type === "context" && "text-indigo-500 bg-indigo-500/10"
                                    )}>
                                        {scenario.icon}
                                    </div>
                                    <span className="font-semibold text-sm">{scenario.title}</span>
                                </div>
                                <Badge variant="outline" className={cn("font-bold shadow-sm border-0",
                                    scenario.type === "savings" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                        scenario.type === "value" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                                            "bg-secondary text-secondary-foreground"
                                )}>
                                    {scenario.impact}
                                </Badge>
                            </div>

                            {/* Comparison Line */}
                            <div className="flex items-center gap-3 pl-9 text-xs">
                                {scenario.from ? (
                                    <>
                                        <span className="text-muted-foreground">{scenario.from.modelName}</span>
                                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                        <span className="font-medium">{scenario.to.modelName}</span>
                                    </>
                                ) : (
                                    <span className="font-medium">{scenario.to.modelName}</span>
                                )}
                            </div>

                            {/* Description Line */}
                            <p className="text-[11px] text-muted-foreground pl-9 leading-relaxed">
                                {scenario.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analysis Footer */}
            <div className="p-4 bg-muted/20 border-t border-border/40">
                <p className="text-[10px] text-muted-foreground/60 leading-normal">
                    <span className="font-semibold text-muted-foreground/80 uppercase tracking-wider mr-1">Analysis:</span>
                    Recommendations are generated by analyzing the "Diminishing Returns" curve. We look for inflection points where model performance retention remains high (&gt;85%) while costs drop significantly (&gt;40%), identifying the optimal value efficiency.
                </p>
            </div>
        </Card>
    );
}
