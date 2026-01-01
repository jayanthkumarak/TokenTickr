"use client";

import { useState, useEffect, useMemo } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useComparisonStore } from "@/store/comparison-store";
import { OpenRouterModel } from "@/types/models";
import { OpenRouterAPI } from "@/lib/openrouter-api";

interface ModelSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (model: OpenRouterModel) => void;
  excludeModels?: string[];
  slotLabel?: string;
}

export function ModelSelector({
  open,
  onOpenChange,
  onSelect,
  excludeModels = [],
}: ModelSelectorProps) {
  const [searchValue, setSearchValue] = useState("");
  const { filteredModels, fetchModels, isLoading } = useComparisonStore();

  useEffect(() => {
    if (open) {
      fetchModels();
    }
  }, [open, fetchModels]);

  const availableModels = useMemo(() => {
    return filteredModels.filter(model => !excludeModels.includes(model.id));
  }, [filteredModels, excludeModels]);

  const searchResults = useMemo(() => {
    if (!searchValue.trim()) {
      return availableModels;
    }

    const searchTerm = searchValue.toLowerCase();
    return availableModels
      .filter(model =>
        model.name.toLowerCase().includes(searchTerm) ||
        model.id.toLowerCase().includes(searchTerm) ||
        (model.description && model.description.toLowerCase().includes(searchTerm))
      );
  }, [availableModels, searchValue]);

  const handleSelect = (model: OpenRouterModel) => {
    onSelect(model);
    onOpenChange(false);
    setSearchValue("");
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search models by name, provider, or capability..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        <CommandEmpty>
          {isLoading ? "Loading models..." : "No models found."}
        </CommandEmpty>
        <CommandGroup heading="Available Models">
          {searchResults.map((model) => (
            <CommandItem
              key={model.id}
              value={`${model.name} ${model.id}`} // Searchable value
              onSelect={() => handleSelect(model)}
              className="cursor-pointer"
            >
              <div className="flex flex-col w-full gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{model.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {OpenRouterAPI.formatPrice(model.pricing.prompt)} / {OpenRouterAPI.formatPrice(model.pricing.completion)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{OpenRouterAPI.formatContextLength(model.context_length)} context</span>
                  <span className="text-xs opacity-50">{model.id}</span>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}