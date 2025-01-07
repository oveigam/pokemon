import type { RowData, TableFeature } from "@tanstack/react-table";
import type { ClassValue } from "clsx";

export type RowStyleProps<TData extends RowData> = {
  rowClassName?: (rowData: TData) => ClassValue;
};

declare module "@tanstack/react-table" {
  interface TableOptionsResolved<TData extends RowData> extends RowStyleProps<TData> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Row<TData extends RowData> {
    getClassName: () => ClassValue;
  }
}

export const RowStyleFeature: TableFeature<unknown> = {
  createRow(row, table) {
    row.getClassName = () => {
      if (table.options.rowClassName) {
        return table.options.rowClassName(row.original);
      }
      return "";
    };
  },
};
