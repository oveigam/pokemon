import type { ColumnDefTemplate, HeaderContext, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Define como se renderiza el filtro
     */
    filter?: ColumnDefTemplate<HeaderContext<TData, TValue> & { onClose?: () => void }>;
  }
}
