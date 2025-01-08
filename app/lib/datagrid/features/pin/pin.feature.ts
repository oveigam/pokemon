import type { ColumnDef, ColumnPinningState, RowData, TableFeature } from "@tanstack/react-table";
import type { ClassValue } from "clsx";

export type PinProps<TData, TValue> = {
  pin?: "left" | "right";
};

declare module "@tanstack/react-table" {
  // Extend the ColumnMeta interface to include your custom StyleProps
  interface ColumnMeta<TData, TValue> extends PinProps<TData, TValue> {}
}

export function getPinInitialState<TData extends RowData>(
  columns: ColumnDef<TData>[],
  initialState?: ColumnPinningState,
): ColumnPinningState {
  let left: string[] = [];
  let right: string[] = [];

  for (const col of columns) {
    if (!col.id) {
      continue;
    }
    if (col.meta?.pin === "left") {
      left.push(col.id);
    } else if (col.meta?.pin === "right") {
      right.push(col.id);
    }
  }

  if (initialState?.left) {
    left = [...left, ...initialState.left];
  }
  if (initialState?.right) {
    right = [...right, ...initialState.right];
  }

  return { left, right };
}
