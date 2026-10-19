"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { QUERY_VOLUMES } from "@/lib/price-calculation";

interface QueryVolumeSelectorProps {
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

// Display layer only: ids/values come from QUERY_VOLUMES unchanged.
const VOLUME_LABELS: Record<string, string> = {
  light: "10k tasks/mo",
  moderate: "100k tasks/mo",
  heavy: "1M tasks/mo",
  enterprise: "10M tasks/mo",
};

const VOLUME_DESCRIPTIONS: Record<string, string> = {
  light: "Side projects, evals",
  moderate: "Production agents, small teams",
  heavy: "High-traffic agent services",
  enterprise: "Enterprise agent fleets",
};

const VOLUME_CONTEXTS: Record<string, string> = {
  light: "Occasional agent tasks",
  moderate: "Regular daily agent runs",
  heavy: "SaaS platforms, data pipelines",
  enterprise: "High-volume agent fleets with millions of users",
};

export function QueryVolumeSelector({
  value,
  onValueChange,
  disabled = false,
  className,
}: QueryVolumeSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedVolume = QUERY_VOLUMES.find(volume => volume.value === value);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="text-sm text-muted-foreground">
        Choose your use case to see relevant cost comparisons
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto p-4"
            disabled={disabled}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="font-medium text-base">
                {selectedVolume ? (VOLUME_LABELS[selectedVolume.id] ?? selectedVolume.label) : `${value.toLocaleString()} Tasks`}
              </span>
              <span className="text-sm text-muted-foreground">
                {selectedVolume ? (VOLUME_DESCRIPTIONS[selectedVolume.id] ?? selectedVolume.description) : 'Custom volume'}
              </span>
              {selectedVolume?.context && (
                <span className="text-xs text-muted-foreground/80">
                  {VOLUME_CONTEXTS[selectedVolume.id] ?? selectedVolume.context}
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No task volumes found.</CommandEmpty>
              <CommandGroup>
                {QUERY_VOLUMES.map((volume) => (
                  <CommandItem
                    key={volume.value}
                    value={volume.value.toString()}
                    onSelect={() => {
                      onValueChange(volume.value);
                      setOpen(false);
                    }}
                    className="cursor-pointer p-3"
                  >
                    <Check
                      className={cn(
                        "mr-3 h-4 w-4",
                        value === volume.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{VOLUME_LABELS[volume.id] ?? volume.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {VOLUME_DESCRIPTIONS[volume.id] ?? volume.description}
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        {VOLUME_CONTEXTS[volume.id] ?? volume.context}
                      </span>
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

export default QueryVolumeSelector;
