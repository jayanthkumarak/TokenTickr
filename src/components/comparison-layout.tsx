"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { useComparisonStore } from "@/store/comparison-store";
import { ModelCard } from "@/components/model-card";
import { ModelSelector } from "@/components/model-selector";
import { OpenRouterModel } from "@/types/models";
import { cn } from "@/lib/utils";

interface ComparisonLayoutProps {
  className?: string;
}

export function ComparisonLayout({ className }: ComparisonLayoutProps) {
  const [showingSelector, setShowingSelector] = useState<number | null>(null);
  
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
    if (maxModels < 4) {
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

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">TokenTickr</h1>
            <p className="text-muted-foreground">
              Compare pricing and features of LLM models
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {filledSlots}/{maxModels} models selected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              disabled={filledSlots === 0}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
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

      {/* Column Controls */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">Columns:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemoveColumn}
          disabled={maxModels <= 2}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">{maxModels}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddColumn}
          disabled={maxModels >= 4}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Model Selector Modal */}
      {showingSelector !== null && (
        <Card className="mb-6 border-primary">
          <CardHeader>
            <CardTitle>Select Model for Column {showingSelector + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ModelSelector
                placeholder="Search and select a model..."
                onSelect={(model) => handleModelSelect(showingSelector, model)}
                excludeModels={excludedModelIds}
              />
              <Button
                variant="outline"
                onClick={() => setShowingSelector(null)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Grid */}
      <div className={cn(
        "grid gap-6",
        maxModels === 2 && "grid-cols-1 md:grid-cols-2",
        maxModels === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        maxModels === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      )}>
        {activeModels.map((model, index) => (
          <div key={index} className="flex flex-col">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">
                Model {index + 1}
              </h3>
            </div>
            <ModelCard
              model={model}
              onRemove={() => handleRemoveModel(index)}
              onSelect={() => setShowingSelector(index)}
              isLoading={isLoading}
              className="flex-1"
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

      {/* Footer Info */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          Data sourced from{" "}
          <a
            href="https://openrouter.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            OpenRouter
          </a>
        </p>
      </div>
    </div>
  );
}

export default ComparisonLayout; 