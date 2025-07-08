"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronsUpDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useComparisonStore } from "@/store/comparison-store";
import { OpenRouterModel } from "@/types/models";
import { OpenRouterAPI } from "@/lib/openrouter-api";

interface ModelSelectorProps {
  placeholder?: string;
  onSelect?: (model: OpenRouterModel) => void;
  disabled?: boolean;
  excludeModels?: string[];
  className?: string;
}

export function ModelSelector({
  placeholder = "Search models...",
  onSelect,
  disabled = false,
  excludeModels = [],
  className,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { filteredModels, isLoading, error, fetchModels } = useComparisonStore();

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const availableModels = useMemo(() => {
    return filteredModels.filter(model => !excludeModels.includes(model.id));
  }, [filteredModels, excludeModels]);

  const searchResults = useMemo(() => {
    if (!searchValue.trim()) {
      return availableModels.slice(0, 20); // Limit initial results
    }
    
    const searchTerm = searchValue.toLowerCase();
    return availableModels
      .filter(model => 
        model.name.toLowerCase().includes(searchTerm) ||
        model.id.toLowerCase().includes(searchTerm) ||
        (model.description && model.description.toLowerCase().includes(searchTerm))
      )
      .slice(0, 20);
  }, [availableModels, searchValue]);

  const handleSelect = (model: OpenRouterModel) => {
    onSelect?.(model);
    setOpen(false);
    setSearchValue("");
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-destructive">
            <X className="h-4 w-4" />
            <span className="text-sm">Error loading models: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled || isLoading}
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {placeholder}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search models..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? "Loading models..." : "No models found."}
              </CommandEmpty>
              <CommandGroup>
                {searchResults.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={model.id}
                    onSelect={() => handleSelect(model)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{model.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {OpenRouterAPI.formatPrice(model.pricing.prompt)} prompt
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {OpenRouterAPI.formatPrice(model.pricing.completion)} completion
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{OpenRouterAPI.formatContextLength(model.context_length)} context</span>
                        {model.architecture.input_modalities.length > 1 && (
                          <Badge variant="outline" className="text-xs">
                            {model.architecture.input_modalities.join(", ")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ModelSelector; 