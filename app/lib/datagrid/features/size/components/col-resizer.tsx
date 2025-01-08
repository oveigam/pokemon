import { useDndContext } from "@dnd-kit/core";
import type { Header } from "@tanstack/react-table";

import { Separator } from "@ui/components/core/separator";
import { cn } from "@ui/util/class-name";

export function ColumnResizer<TData>({ header }: { header: Header<TData, unknown> }) {
  const ctx = useDndContext();

  return (
    <div
      className={cn(
        "pointer group/resizer absolute bottom-0 right-0 top-0 flex w-3 cursor-ew-resize touch-none select-none justify-end",
        {
          hidden: !!ctx.active,
        },
      )}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    >
      <Separator
        orientation="vertical"
        className={cn("h-full group-hover/resizer:w-0.5 group-hover/resizer:bg-primary", {
          "w-0.5 bg-primary": header.column.getIsResizing(),
        })}
      />
    </div>
  );
}
