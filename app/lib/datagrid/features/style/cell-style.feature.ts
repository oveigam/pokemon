import type { TableFeature } from "@tanstack/react-table";
import type { ClassValue } from "clsx";

export type CellStyleProps<TData, TValue> = {
  rowClassName?: (value: TValue, rowData: TData) => ClassValue;
};

declare module "@tanstack/react-table" {
  // Extend the ColumnMeta interface to include your custom StyleProps
  interface ColumnMeta<TData, TValue> extends CellStyleProps<TData, TValue> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Cell<TData, TValue> {
    getClassName: () => ClassValue;
  }
}

// TODO esto no se esta utilizando en ningun lado

export const CellStyleFeature: TableFeature<unknown> = {
  createCell(cell, column, row) {
    cell.getClassName = () => {
      if (column.columnDef.meta?.rowClassName) {
        return column.columnDef.meta?.rowClassName(cell.getValue(), row.original);
      }
      return "";
    };
  },
};
