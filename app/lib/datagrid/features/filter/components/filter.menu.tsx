import { type Header, type RowData, flexRender } from "@tanstack/react-table";
import type { ClassValue } from "clsx";
import { FilterIcon, FilterXIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@ui/components/core/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/core/popover";
import { cn } from "@ui/util/class-name";

export function FilterMenu<TData extends RowData, TValue = unknown>({
  className,
  header,
}: {
  className?: ClassValue;
  header: Header<TData, TValue>;
}) {
  const isFiltered = header.column.getIsFiltered();

  const [open, setOpen] = useState(false);

  if (!header.column.columnDef.meta?.filter) {
    return null;
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-6 transition-opacity hover:text-primary",
            {
              "opacity-0 hover:opacity-100": !isFiltered && !open,
            },
            className,
          )}
        >
          {open ? (
            <FilterXIcon className="size-4" fill={isFiltered ? "currentColor" : "none"} />
          ) : (
            <FilterIcon className="size-4" fill={isFiltered ? "currentColor" : "none"} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          className="size-5 self-end"
          onClick={() => setOpen(false)}
        >
          <XIcon className="size-4" />
        </Button>
        {flexRender(header.column.columnDef.meta.filter, {
          ...header.getContext(),
          onClose: () => {
            setOpen(false);
          },
        })}
      </PopoverContent>
    </Popover>
  );
}
