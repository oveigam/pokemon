import { useDndContext } from "@dnd-kit/core";
import type { Header } from "@tanstack/react-table";

import { cn } from "@ui/util/class-name";

export function ColumnResizer<TData>({ header }: { header: Header<TData, unknown> }) {
  const ctx = useDndContext();

  return (
    <div
      className={cn(
        "pointer absolute bottom-0 right-0 top-0 flex w-3 cursor-ew-resize touch-none select-none justify-end opacity-0 hover:opacity-100",
        {
          "opacity-100": header.column.getIsResizing(),
          hidden: !!ctx.active,
        },
      )}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    >
      <div className="h-full w-0.5 bg-primary" />
    </div>
  );
}
