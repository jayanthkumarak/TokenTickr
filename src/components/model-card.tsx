"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, DollarSign, Cpu, Eye, Zap, Settings } from "lucide-react";
import { OpenRouterModel } from "@/types/models";
import { OpenRouterAPI } from "@/lib/openrouter-api";
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
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">
              {model.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
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
      <CardContent className="space-y-4">
        {/* Description */}
        {model.description && (
          <div className="text-sm text-muted-foreground">
            <p className="line-clamp-2">{model.description}</p>
          </div>
        )}

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <p className="font-medium text-sm">Prompt</p>
              <p className="text-xs text-muted-foreground">{promptPrice}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <div>
              <p className="font-medium text-sm">Completion</p>
              <p className="text-xs text-muted-foreground">{completionPrice}</p>
            </div>
          </div>
        </div>

        {/* Context Length */}
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Cpu className="h-4 w-4 text-purple-600" />
          <div>
            <p className="font-medium text-sm">Context Length</p>
            <p className="text-xs text-muted-foreground">{contextLength} tokens</p>
          </div>
        </div>

        {/* Modalities */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Input Modalities</p>
          <div className="flex flex-wrap gap-1">
            {model.architecture.input_modalities.map((modality) => (
              <Badge key={modality} variant="outline" className="text-xs">
                {modality}
              </Badge>
            ))}
          </div>
        </div>

        {/* Output Modalities */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Output Modalities</p>
          <div className="flex flex-wrap gap-1">
            {model.architecture.output_modalities.map((modality) => (
              <Badge key={modality} variant="outline" className="text-xs">
                {modality}
              </Badge>
            ))}
          </div>
        </div>

        {/* Supported Parameters */}
        {model.supported_parameters && model.supported_parameters.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Supported Parameters</p>
            <div className="flex flex-wrap gap-1">
              {model.supported_parameters.slice(0, 5).map((param) => (
                <Badge key={param} variant="secondary" className="text-xs">
                  {param}
                </Badge>
              ))}
              {model.supported_parameters.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{model.supported_parameters.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Tokenizer */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>Tokenizer: {model.architecture.tokenizer}</span>
        </div>

        {/* Moderation */}
        {model.top_provider.is_moderated && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>Moderated</span>
          </div>
        )}

        {/* Creation Date */}
        <div className="text-xs text-muted-foreground">
          Created: {new Date(model.created * 1000).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}

export default ModelCard; 