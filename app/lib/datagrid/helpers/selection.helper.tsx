import type { ColumnDef, RowData } from "@tanstack/react-table";

import { Checkbox } from "@ui/components/core/checkbox";

export function selectionCol<TData extends RowData>(opts?: {
  id?: string;
}): ColumnDef<TData, TData> {
  return {
    id: opts?.id ?? "_selection",

    meta: {
      pin: "left",
    },

    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
    size: 75,
    minSize: 0,
    enableResizing: false,

    header: (ctx) => {
      return (
        <div
          className="flex h-full w-full flex-1 cursor-pointer items-center justify-center"
          onClick={ctx.table.getToggleAllRowsSelectedHandler()}
        >
          <Checkbox checked={ctx.table.getIsAllRowsSelected()} onCheckedChange={() => {}} />
        </div>
      );
    },

    cell: (ctx) => {
      return (
        <div
          className="flex h-full w-full flex-1 cursor-pointer items-center justify-center"
          onClick={() => ctx.row.toggleSelected()}
        >
          <Checkbox checked={ctx.row.getIsSelected()} onCheckedChange={() => {}} />
        </div>
      );
    },
  };
}
