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
                {selectedVolume?.label || `${value.toLocaleString()} Queries`}
              </span>
              <span className="text-sm text-muted-foreground">
                {selectedVolume?.description || 'Custom volume'}
              </span>
              {selectedVolume?.context && (
                <span className="text-xs text-muted-foreground/80">
                  {selectedVolume.context}
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No query volumes found.</CommandEmpty>
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
                      <span className="font-medium">{volume.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {volume.description}
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        {volume.context}
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