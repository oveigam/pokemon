import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

export function actionCol<TData extends RowData>(opts: {
  id?: string;
  renderActions: (item: TData, ctx: CellContext<TData, TData>) => ReactNode;
}): ColumnDef<TData, TData> {
  return {
    id: opts.id ?? "_actions",
    accessorFn: (item) => item,

    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
    size: 75,
    minSize: 0,
    enableResizing: false,

    header: () => "",

    cell: (ctx) => {
      return opts.renderActions(ctx.row.original, ctx);
    },
  };
}
