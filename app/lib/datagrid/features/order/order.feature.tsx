import { DndContext, PointerSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { reorderColumnDragEventHandler } from "./order.util";

type OrderDndContextProps<TData> = {
  table: Table<TData>;
  children: ReactNode;
};

export function OrderDndContex<TData>({ table, children }: OrderDndContextProps<TData>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // FIXME sigue habiendo scroll, si hay scroll el overlay queda en la posición original en lugar de moverse
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragEnd={reorderColumnDragEventHandler(table)}
      autoScroll={false}
    >
      {children}
    </DndContext>
  );
}
