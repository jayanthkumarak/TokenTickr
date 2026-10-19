"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { X, DollarSign, Cpu, Settings, ChevronDown, Info } from "lucide-react";
import { OpenRouterModel } from "@/types/models";
import { OpenRouterAPI } from "@/lib/openrouter-api";
import { SEMANTIC_COLORS } from "@/lib/colorblind-colors";
import {
  getAgentCapabilitySummary,
  getOutputPremiumRatio,
} from "@/lib/capability-bonus";
import { cn } from "@/lib/utils";

export type ModelCardVariant = "detailed" | "compact";

export interface ModelRanking {
  costRank: "cheapest" | "expensive" | "middle";
  contextRank: "largest" | "smallest" | "middle";
  combinedCost: number; // for tooltip/display
}

interface ModelCardProps {
  model: OpenRouterModel | null;
  onRemove?: () => void;
  onSelect?: () => void;
  onViewDetails?: () => void;
  isLoading?: boolean;
  className?: string;
  showRemoveButton?: boolean;
  variant?: ModelCardVariant;
  ranking?: ModelRanking;
  columnCount?: number;
}

function AgenticReadinessRow({ model, compact = false }: { model: OpenRouterModel; compact?: boolean }) {
  const summary = getAgentCapabilitySummary(model);
  const outputRatio = getOutputPremiumRatio(model);
  const cacheRead = model.pricing.input_cache_reads
    ? OpenRouterAPI.formatPrice(model.pricing.input_cache_reads)
    : null;
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
        Agentic Readiness
      </p>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant={summary.tools ? "default" : "outline"} className="text-xs px-2 py-0.5">
          Tools
        </Badge>
        <Badge variant={summary.thinking ? "default" : "outline"} className="text-xs px-2 py-0.5">
          Thinking
        </Badge>
        <Badge variant={summary.structuredOutputs ? "default" : "outline"} className="text-xs px-2 py-0.5">
          JSON Schema
        </Badge>
        <Badge variant={summary.promptCaching ? "default" : "outline"} className="text-xs px-2 py-0.5">
          Cache
        </Badge>
      </div>
      {!compact && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {cacheRead && (
            <span>
              Cache Read: <span className="font-mono tabular-nums text-foreground">{cacheRead}</span>
            </span>
          )}
          <span>
            Output Ratio:{" "}
            <span className="font-mono tabular-nums text-foreground">
              {outputRatio > 0 ? `${outputRatio.toFixed(1)}x` : "—"}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export function ModelCard({
  model,
  onRemove,
  onSelect,
  onViewDetails,
  isLoading = false,
  className,
  showRemoveButton = true,
  variant = "detailed",
  ranking,
  columnCount = 3,
}: ModelCardProps) {
  void columnCount;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (isLoading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!model) {
    return (
      <Card className={cn("w-full border-dashed", className)}>
        <CardContent className="flex items-center justify-center h-48">
          <Button
            variant="outline"
            onClick={onSelect}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Select Model
          </Button>
        </CardContent>
      </Card>
    );
  }

  const promptPrice = OpenRouterAPI.formatPrice(model.pricing.prompt);
  const completionPrice = OpenRouterAPI.formatPrice(model.pricing.completion);
  const contextLength = OpenRouterAPI.formatContextLength(model.context_length);

  // Compact mode renders a minimal card
  if (variant === "compact") {
    return (
      <Card className={cn("w-full h-full flex flex-col min-h-[220px]", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base leading-tight truncate">
                {model.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono opacity-60 truncate">
                {model.id}
              </p>
            </div>
            {showRemoveButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="h-7 w-7 p-0 shrink-0"
                aria-label={`Remove ${model.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          {/* Ranking Badges - Compact */}
          {ranking && (ranking.costRank !== "middle" || ranking.contextRank !== "middle") && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {ranking.costRank === "cheapest" && (
                <Badge variant="default" className="text-xs px-1.5 py-0">
                  Cheapest
                </Badge>
              )}
              {ranking.costRank === "expensive" && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0">
                  Most Expensive
                </Badge>
              )}
              {ranking.contextRank === "largest" && (
                <Badge variant="default" className="text-xs px-1.5 py-0">
                  Largest Context
                </Badge>
              )}
              {ranking.contextRank === "smallest" && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  Smallest Context
                </Badge>
              )}
            </div>
          )}
          {/* Modality Badges - Compact inline */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {model.architecture.input_modalities.map((modality) => (
              <Badge
                key={`in-${modality}`}
                variant="outline"
                className="text-xs px-1.5 py-0 h-4"
              >
                in: {modality}
              </Badge>
            ))}
            {model.architecture.output_modalities.map((modality) => (
              <Badge
                key={`out-${modality}`}
                variant="secondary"
                className="text-xs px-1.5 py-0 h-4"
              >
                out: {modality}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col pt-0">
          {/* Content Section */}
          <div className="space-y-2">
            {/* Compact Cost Display - Allow wrapping at narrow widths */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 shrink-0" style={{ color: SEMANTIC_COLORS.savings }} />
                <span className="text-muted-foreground">Prompt:</span>
                <span className="font-mono tabular-nums font-medium">{promptPrice}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 shrink-0" style={{ color: SEMANTIC_COLORS.highlight }} />
                <span className="text-muted-foreground">Completion:</span>
                <span className="font-mono tabular-nums font-medium">{completionPrice}</span>
              </div>
            </div>

            {/* Compact Context Display */}
            <div className="flex items-center gap-1 text-xs">
              <Cpu className="h-3 w-3" style={{ color: SEMANTIC_COLORS.neutral }} />
              <span className="text-muted-foreground">Context:</span>
              <span className="font-mono tabular-nums font-medium">{contextLength} tokens</span>
            </div>

            <AgenticReadinessRow model={model} compact />
          </div>

          {/* View Details Button - Anchored to bottom */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            className="w-full justify-center h-7 text-xs text-muted-foreground hover:text-foreground mt-auto"
          >
            <Info className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Detailed mode (default)
  const needsTruncation = model.description && model.description.length > 150;

  return (
    <Card className={cn("w-full transition-all duration-200", className)}>
      <CardHeader className="pb-3 px-6">
        <div className="flex items-start justify-between gap-2 min-w-0 w-full relative">
          <div className="flex-1 min-w-0 pr-6">
            <CardTitle
              className="leading-tight line-clamp-2 break-words flex items-center text-lg min-h-[2.5rem]"
              title={model.name}
            >
              {model.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1 font-mono opacity-60 truncate">
              {model.id}
            </p>
          </div>
          {showRemoveButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              aria-label={`Remove ${model.name}`}
              className="p-0 shrink-0 absolute right-0 top-0 h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {/* Ranking Badges */}
        {ranking && (ranking.costRank !== "middle" || ranking.contextRank !== "middle") && (
          <div className="flex flex-wrap gap-1 mt-2">
            {ranking.costRank === "cheapest" && (
              <Badge variant="default" className="text-xs px-2 py-0.5">
                Cheapest
              </Badge>
            )}
            {ranking.costRank === "expensive" && (
              <Badge variant="destructive" className="text-xs px-2 py-0.5">
                Most Expensive
              </Badge>
            )}
            {ranking.contextRank === "largest" && (
              <Badge variant="default" className="text-xs px-2 py-0.5">
                Largest Context
              </Badge>
            )}
            {ranking.contextRank === "smallest" && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                Smallest Context
              </Badge>
            )}
          </div>
        )}
        {/* Modality Badges - Always Visible */}
        <div className="flex flex-wrap gap-1 mt-2">
          {model.architecture.input_modalities.map((modality) => (
            <Badge
              key={`in-${modality}`}
              variant="outline"
              className="text-xs px-2 py-0.5"
            >
              in: {modality}
            </Badge>
          ))}
          {model.architecture.output_modalities.map((modality) => (
            <Badge
              key={`out-${modality}`}
              variant="secondary"
              className="text-xs px-2 py-0.5"
            >
              out: {modality}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0 px-6">
        {/* Description with truncation */}
        {model.description && (
          <div>
            <p
              className={cn(
                "text-sm text-muted-foreground leading-relaxed",
                !isDescriptionExpanded && needsTruncation && "line-clamp-3"
              )}
            >
              {model.description}
            </p>
            {needsTruncation && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-xs text-primary hover:underline mt-1"
              >
                {isDescriptionExpanded ? "Show less" : "Read more..."}
              </button>
            )}
          </div>
        )}

        {/* Core Stats - Always Visible */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
            <DollarSign
              className="h-4 w-4 shrink-0"
              style={{ color: SEMANTIC_COLORS.savings }}
            />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Prompt</p>
              <p className="font-mono tabular-nums font-medium text-sm truncate">{promptPrice}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
            <DollarSign
              className="h-4 w-4 shrink-0"
              style={{ color: SEMANTIC_COLORS.highlight }}
            />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Completion</p>
              <p className="font-mono tabular-nums font-medium text-sm truncate">{completionPrice}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
          <Cpu
            className="h-4 w-4 shrink-0"
            style={{ color: SEMANTIC_COLORS.neutral }}
          />
          <div>
            <p className="text-xs text-muted-foreground">Context Window</p>
            <p className="font-mono tabular-nums font-medium text-sm">{contextLength} tokens</p>
          </div>
        </div>

        <AgenticReadinessRow model={model} />

        {/* Collapsible Details */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              <span>{isExpanded ? "Less details" : "More details"}</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            {/* Modalities */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Capabilities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {model.architecture.input_modalities.map((modality) => (
                  <Badge
                    key={`in-${modality}`}
                    variant="outline"
                    className="text-xs px-2 py-0.5"
                  >
                    ↓ {modality}
                  </Badge>
                ))}
                {model.architecture.output_modalities.map((modality) => (
                  <Badge
                    key={`out-${modality}`}
                    variant="secondary"
                    className="text-xs px-2 py-0.5"
                  >
                    ↑ {modality}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Supported Parameters */}
            {model.supported_parameters &&
              model.supported_parameters.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Parameters
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {model.supported_parameters.slice(0, 6).map((param) => (
                      <Badge
                        key={param}
                        variant="outline"
                        className="text-xs px-2 py-0.5 font-mono"
                      >
                        {param}
                      </Badge>
                    ))}
                    {model.supported_parameters.length > 6 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0.5 opacity-60"
                      >
                        +{model.supported_parameters.length - 6}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

            {/* Technical Details */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1 border-t border-border/50">
              <span>
                Tokenizer: <span className="font-mono">{model.architecture.tokenizer}</span>
              </span>
              {model.top_provider.is_moderated && (
                <span className="text-amber-500/80">• Moderated</span>
              )}
              <span className="opacity-60">
                Created {new Date(model.created * 1000).toLocaleDateString()}
              </span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export default ModelCard;
