"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Minus, RotateCcw, LayoutGrid, List, DollarSign, Cpu } from "lucide-react";
import { useComparisonStore } from "@/store/comparison-store";
import { ModelCard, ModelCardVariant, ModelRanking } from "@/components/model-card";
import { OpenRouterModel } from "@/types/models";
import { OpenRouterAPI } from "@/lib/openrouter-api";
import { SEMANTIC_COLORS } from "@/lib/colorblind-colors";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const ModelSelector = dynamic(() => import("@/components/model-selector").then(mod => mod.ModelSelector), {
  loading: () => null,
  ssr: false // Client-side interaction only
});

const PriceComparisonSection = dynamic(() => import("@/components/price-comparison-section").then(mod => mod.PriceComparisonSection), {
  loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-lg" />,
  ssr: true // Can be SSR'd but better split for hydration
});

// Constants for cost calculation (matching price-calculation.ts)
const PROMPT_TOKENS_PER_QUERY = 150;
const COMPLETION_TOKENS_PER_QUERY = 300;

interface ComparisonLayoutProps {
  className?: string;
}

export function ComparisonLayout({ className }: ComparisonLayoutProps) {
  const [showingSelector, setShowingSelector] = useState<number | null>(null);
  const [detailedViewFor4Columns, setDetailedViewFor4Columns] = useState(false);
  const [detailsModalModel, setDetailsModalModel] = useState<OpenRouterModel | null>(null);

  const {
    selectedModels,
    maxModels,
    setSelectedModel,
    removeModel,
    setMaxModels,
    clearAll,
    isLoading,
    error,
  } = useComparisonStore();

  const handleModelSelect = (index: number, model: OpenRouterModel) => {
    setSelectedModel(index, model);
    setShowingSelector(null);
  };

  const handleRemoveModel = (index: number) => {
    removeModel(index);
  };

  const handleAddColumn = () => {
    if (maxModels < 5) {
      setMaxModels(maxModels + 1);
    }
  };

  const handleRemoveColumn = () => {
    if (maxModels > 2) {
      setMaxModels(maxModels - 1);
    }
  };

  const activeModels = selectedModels.slice(0, maxModels);
  const filledSlots = activeModels.filter(model => model !== null).length;
  const excludedModelIds = selectedModels
    .filter(model => model !== null)
    .map(model => model!.id);

  // Calculate combined cost for each model
  const calculateCombinedCost = (model: OpenRouterModel): number => {
    const promptPrice = parseFloat(model.pricing.prompt) || 0;
    const completionPrice = parseFloat(model.pricing.completion) || 0;
    return (promptPrice * PROMPT_TOKENS_PER_QUERY) + (completionPrice * COMPLETION_TOKENS_PER_QUERY);
  };

  // Calculate rankings for all valid models
  const modelRankings = useMemo((): Map<string, ModelRanking> => {
    const rankings = new Map<string, ModelRanking>();
    const validModels = activeModels.filter((m): m is OpenRouterModel => m !== null);

    if (validModels.length < 2) {
      return rankings;
    }

    // Calculate costs and context for all models
    const modelData = validModels.map(model => ({
      id: model.id,
      combinedCost: calculateCombinedCost(model),
      contextLength: model.context_length,
    }));

    // Find min/max
    const costs = modelData.map(m => m.combinedCost);
    const contexts = modelData.map(m => m.contextLength);
    const minCost = Math.min(...costs);
    const maxCost = Math.max(...costs);
    const minContext = Math.min(...contexts);
    const maxContext = Math.max(...contexts);

    // Assign rankings
    for (const data of modelData) {
      const costRank: ModelRanking["costRank"] =
        data.combinedCost === minCost ? "cheapest" :
          data.combinedCost === maxCost ? "expensive" : "middle";

      const contextRank: ModelRanking["contextRank"] =
        data.contextLength === maxContext ? "largest" :
          data.contextLength === minContext ? "smallest" : "middle";

      rankings.set(data.id, {
        costRank,
        contextRank,
        combinedCost: data.combinedCost,
      });
    }

    return rankings;
  }, [activeModels]);

  // Determine card variant based on column count and toggle
  const cardVariant: ModelCardVariant =
    maxModels >= 4 && !detailedViewFor4Columns ? "compact" : "detailed";

  return (
    <div className={cn("w-full", className)}>
      {/* Header Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Column Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-1">Columns:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemoveColumn}
            disabled={maxModels <= 2}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[1.5rem] text-center">{maxModels}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddColumn}
            disabled={maxModels >= 5}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* View Toggle - Only shown for 4+ columns */}
          {maxModels >= 4 && (
            <div className="flex items-center gap-2 ml-4 border-l pl-4">
              <Button
                variant={!detailedViewFor4Columns ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setDetailedViewFor4Columns(false)}
                className="h-8 w-8 p-0"
                title="Compact View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={detailedViewFor4Columns ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setDetailedViewFor4Columns(true)}
                className="h-8 w-8 p-0"
                title="Detailed View"
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Selection Status & Clear */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-normal">
            {filledSlots}/{maxModels} selected
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            disabled={filledSlots === 0}
            className="text-muted-foreground hover:text-foreground h-8"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="mb-6 border-destructive">
          <CardContent className="p-4">
            <div className="text-destructive text-sm">
              Error: {error}
            </div>
          </CardContent>
        </Card>
      )}


      {/* Model Selector Modal (Spotlight) */}
      {/* Conditionally render to ensure it's not even mounted until needed */}
      {showingSelector !== null && (
        <ModelSelector
          open={showingSelector !== null}
          onOpenChange={(open) => !open && setShowingSelector(null)}
          onSelect={(model) => {
            if (showingSelector !== null) {
              handleModelSelect(showingSelector, model);
            }
          }}
          excludeModels={excludedModelIds}
          slotLabel={showingSelector !== null ? `Model ${showingSelector + 1}` : undefined}
        />
      )}

      {/* Comparison Grid */}
      <div className={cn(
        "grid gap-6",
        maxModels === 2 && "grid-cols-1 md:grid-cols-2",
        maxModels === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        maxModels === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        maxModels === 5 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
      )}>
        {activeModels.map((model, index) => (
          <div key={index} className="flex flex-col h-full">
            <div className="mb-2 text-center">
              <h3 className={cn(
                "font-semibold",
                cardVariant === "compact" ? "text-base" : "text-lg"
              )}>
                Model {index + 1}
              </h3>
            </div>
            <ModelCard
              model={model}
              onRemove={() => handleRemoveModel(index)}
              onSelect={() => setShowingSelector(index)}
              onViewDetails={() => model && setDetailsModalModel(model)}
              isLoading={isLoading}
              className="flex-1"
              variant={cardVariant}
              ranking={model ? modelRankings.get(model.id) : undefined}
              columnCount={maxModels}
            />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const emptyIndex = activeModels.findIndex(model => model === null);
              if (emptyIndex !== -1) {
                setShowingSelector(emptyIndex);
              }
            }}
            disabled={!activeModels.some(model => model === null)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Model
          </Button>
        </div>
      </div>

      {/* Price Comparison Section */}
      <div className="mt-12">
        <PriceComparisonSection models={activeModels} />
      </div>

      {/* Model Details Modal (for compact view) */}
      <Dialog
        open={detailsModalModel !== null}
        onOpenChange={(open) => !open && setDetailsModalModel(null)}
      >
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {detailsModalModel && (
            <>
              <DialogHeader>
                <DialogTitle>{detailsModalModel.name}</DialogTitle>
                <DialogDescription className="font-mono text-xs">
                  {detailsModalModel.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Description */}
                {detailsModalModel.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {detailsModalModel.description}
                  </p>
                )}

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
                    <DollarSign
                      className="h-4 w-4 shrink-0"
                      style={{ color: SEMANTIC_COLORS.savings }}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Prompt</p>
                      <p className="font-medium text-sm">
                        {OpenRouterAPI.formatPrice(detailsModalModel.pricing.prompt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
                    <DollarSign
                      className="h-4 w-4 shrink-0"
                      style={{ color: SEMANTIC_COLORS.highlight }}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Completion</p>
                      <p className="font-medium text-sm">
                        {OpenRouterAPI.formatPrice(detailsModalModel.pricing.completion)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Context Window */}
                <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
                  <Cpu
                    className="h-4 w-4 shrink-0"
                    style={{ color: SEMANTIC_COLORS.neutral }}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">Context Window</p>
                    <p className="font-medium text-sm">
                      {OpenRouterAPI.formatContextLength(detailsModalModel.context_length)} tokens
                    </p>
                  </div>
                </div>

                {/* Modalities */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Capabilities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {detailsModalModel.architecture.input_modalities.map((modality) => (
                      <Badge
                        key={`in-${modality}`}
                        variant="outline"
                        className="text-xs px-2 py-0.5"
                      >
                        in: {modality}
                      </Badge>
                    ))}
                    {detailsModalModel.architecture.output_modalities.map((modality) => (
                      <Badge
                        key={`out-${modality}`}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        out: {modality}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Parameters */}
                {detailsModalModel.supported_parameters &&
                  detailsModalModel.supported_parameters.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Parameters
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {detailsModalModel.supported_parameters.map((param) => (
                          <Badge
                            key={param}
                            variant="outline"
                            className="text-xs px-2 py-0.5 font-mono"
                          >
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Technical Details */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <span>
                    Tokenizer: <span className="font-mono">{detailsModalModel.architecture.tokenizer}</span>
                  </span>
                  {detailsModalModel.top_provider.is_moderated && (
                    <span className="text-amber-500/80">Moderated</span>
                  )}
                  <span className="opacity-60">
                    Created {new Date(detailsModalModel.created * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ComparisonLayout;