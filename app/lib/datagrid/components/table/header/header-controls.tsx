import { useDraggable, useDroppable } from "@dnd-kit/core";
import type { Header } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { FilterMenu } from "@datagrid/features/filter/components/filter.menu";
import { pinningPositionStyle } from "@datagrid/features/order/order.util";
import { ColumnResizer } from "@datagrid/features/size/components/col-resizer";
import { HeaderSortIndicator } from "@datagrid/features/sort/components/sort-indicator";

import { TableHead } from "@ui/components/core/table";
import { cn } from "@ui/util/class-name";

export function DatagridHeader<TData>({
  header,
  children,
}: {
  header: Header<TData, unknown>;
  children: ReactNode;
}) {
  const table = header.getContext().table;

  const id = header.column.id;

  const isPinned = header.column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === "left" && header.column.getIsLastColumn("left");
  const isFirstRightPinnedColumn = isPinned === "right" && header.column.getIsFirstColumn("right");

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({ id, disabled: !!isPinned });
  const { isOver, setNodeRef: setDropRef } = useDroppable({ id, disabled: !!isPinned });

  return (
    <TableHead
      ref={setDropRef}
      className={cn("group relative flex items-center bg-background font-bold text-foreground", {
        "flex-grow": table.getIsAutoWidth(),
        "border-r border-primary": isLastLeftPinnedColumn,
        "border-l border-primary": isFirstRightPinnedColumn,
        "animate-pulse bg-primary/10 dark:bg-primary/30": isOver,
        "bg-primary text-primary-foreground hover:bg-primary": isDragging,
        "z-50 opacity-25": isDragging,
      })}
      style={{
        width: `${header.getSize()}px`,
        ...pinningPositionStyle(header.column),
      }}
      density={header.getContext().table.getDensity()}
    >
      <div
        ref={setDragRef}
        className="flex flex-1 items-center"
        onClick={header.column.getToggleSortingHandler()}
        {...listeners}
        {...attributes}
        aria-describedby=""
      >
        {children}

        <HeaderSortIndicator header={header} />
      </div>

      <FilterMenu className="z-50 ml-auto group-hover:opacity-100" header={header} />

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="z-50 ml-auto size-5">
            <MenuIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isPinned !== "left" && (
            <DropdownMenuItem
              onSelect={() => header.column.pin("left")}
              onClick={(e) => e.stopPropagation()}
            >
              {table._t("pin-left")}
              <DropdownMenuShortcut>
                <PinIcon className="size-4 rotate-90" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {isPinned !== "right" && (
            <DropdownMenuItem
              onSelect={() => header.column.pin("right")}
              onClick={(e) => e.stopPropagation()}
            >
              {table._t("pin-right")}
              <DropdownMenuShortcut>
                <PinIcon className="size-4 -rotate-90" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {isPinned && (
            <DropdownMenuItem
              onSelect={() => header.column.pin(false)}
              onClick={(e) => e.stopPropagation()}
            >
              {table._t("unpin")}
              <DropdownMenuShortcut>
                <PinOffIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu> */}

      <ColumnResizer header={header} />
    </TableHead>
  );
}
