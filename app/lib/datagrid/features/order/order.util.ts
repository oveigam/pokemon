import type { DragEndEvent } from "@dnd-kit/core";
import type { Column, ColumnOrderState, RowData, Table } from "@tanstack/react-table";
import type { CSSProperties } from "react";

/**
 * Función para reordenar las columnas
 *
 * @param columnId id de la columna que se mueve
 * @param targetColumnId id de la columna sobre la que se suelta
 * @param columnOrder estado actual del orden de columnas
 * @returns nuevo estado de orden de columnas
 */
export function reorderColumn(
  columnId: string,
  targetColumnId: string,
  columnOrder: string[],
): ColumnOrderState {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(columnId), 1)[0] as string,
  );
  return [...columnOrder];
}

/**
 * Crea un handler para pasarle a un DnD context para gestionar el orden arrastrando columnas
 *
 * @param table
 * @returns
 */
export function reorderColumnDragEventHandler<T extends RowData>(
  table: Table<T>,
): (event: DragEndEvent) => void {
  return (e) => {
    const draggedColumnId = e.active.id;
    const targetColumnId = e.over?.id;

    if (
      typeof draggedColumnId === "string" &&
      typeof targetColumnId === "string" &&
      targetColumnId !== draggedColumnId
    ) {
      table.setColumnOrder((order) => {
        return reorderColumn(
          draggedColumnId,
          targetColumnId,
          order.length === 0 ? table.getAllLeafColumns().map((d) => d.id) : order,
        );
      });
    }
  };
}

export function pinningPositionStyle<TData>(column: Column<TData>): CSSProperties {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : undefined,
  };
}
