/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RowData, Table, TableFeature } from "@tanstack/react-table";

const DEFAULT_AUTO_WIDTH_THRESHOLD = 8;

export type ColumnSizingOptions = {
  autoWidth?: boolean;
  autoWidthThreshold?: number;
};

declare module "@tanstack/react-table" {
  interface TableOptionsResolved<TData extends RowData> extends ColumnSizingOptions {}

  interface Table<TData extends RowData> {
    getIsAutoWidth: () => boolean;
  }
}

export const ColSizeFeature: TableFeature<unknown> = {
  createTable: <TData extends RowData>(table: Table<TData>) => {
    table.getIsAutoWidth = () => {
      if (table.options.autoWidth !== undefined) {
        return table.options.autoWidth;
      }
      const threshold = table.options.autoWidthThreshold ?? DEFAULT_AUTO_WIDTH_THRESHOLD;
      return table._getColumnDefs().length <= threshold;
    };
  },
};
