import { useState, useEffect, useMemo } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useComparisonStore } from "@/store/comparison-store";
import { OpenRouterModel } from "@/types/models";
import { OpenRouterAPI } from "@/lib/openrouter-api";
import { getAgentCapabilitySummary } from "@/lib/capability-bonus";

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
              <div className="flex flex-col w-full gap-1 min-w-0">
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <span className="font-medium truncate min-w-0">{model.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {(() => {
                      const caps = getAgentCapabilitySummary(model);
                      return (
                        <span className="hidden sm:flex items-center gap-1">
                          {caps.tools && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-4 font-mono">
                              TOOLS
                            </Badge>
                          )}
                          {caps.thinking && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-4 font-mono">
                              THINK
                            </Badge>
                          )}
                          {caps.structuredOutputs && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-4 font-mono">
                              JSON
                            </Badge>
                          )}
                        </span>
                      );
                    })()}
                    <Badge variant="secondary" className="text-xs font-normal font-mono tabular-nums">
                      {OpenRouterAPI.formatPrice(model.pricing.prompt)} / {OpenRouterAPI.formatPrice(model.pricing.completion)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                  <span className="shrink-0">{OpenRouterAPI.formatContextLength(model.context_length)} context</span>
                  <span className="text-xs opacity-50 truncate font-mono">{model.id}</span>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}