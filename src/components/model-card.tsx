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
import { X, DollarSign, Cpu, Settings, ChevronDown } from "lucide-react";
import { OpenRouterModel } from "@/types/models";
import { OpenRouterAPI } from "@/lib/openrouter-api";
import { SEMANTIC_COLORS } from "@/lib/colorblind-colors";
import { cn } from "@/lib/utils";

interface ModelCardProps {
  model: OpenRouterModel | null;
  onRemove?: () => void;
  onSelect?: () => void;
  isLoading?: boolean;
  className?: string;
  showRemoveButton?: boolean;
}

export function ModelCard({
  model,
  onRemove,
  onSelect,
  isLoading = false,
  className,
  showRemoveButton = true,
}: ModelCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">
              {model.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1 font-mono opacity-60">
              {model.id}
            </p>
          </div>
          {showRemoveButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {/* Description */}
        {model.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {model.description}
          </p>
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
              <p className="font-medium text-sm truncate">{promptPrice}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
            <DollarSign
              className="h-4 w-4 shrink-0"
              style={{ color: SEMANTIC_COLORS.highlight }}
            />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Completion</p>
              <p className="font-medium text-sm truncate">{completionPrice}</p>
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
            <p className="font-medium text-sm">{contextLength} tokens</p>
          </div>
        </div>

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