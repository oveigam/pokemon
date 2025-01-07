import type { Table } from "@tanstack/react-table";

import { Skeleton } from "@ui/components/core/skeleton";
import { TableCell, TableRow } from "@ui/components/core/table";

type RowConsumerProps<TData> = {
  table: Table<TData>;
  isLoading?: boolean;
  children: React.ReactNode; //| ((value: TData[]) => React.ReactNode);
};

export function RowConsumer<TData>({ table, isLoading, children }: RowConsumerProps<TData>) {
  if (isLoading) {
    return new Array(15).fill(0).map((_, i) => (
      <TableRow key={i} className="flex">
        <TableCell
          colSpan={table.getAllColumns().length}
          className="flex text-center text-lg"
          density={table.getDensity()}
        >
          <Skeleton className="h-[21px]" />
        </TableCell>
      </TableRow>
    ));
  }
  if (!table.getRowModel().rows.length) {
    return (
      <TableRow className="flex">
        <TableCell colSpan={table.getAllColumns().length} className="flex h-24 text-center text-lg">
          {table._t("no-data")}
        </TableCell>
      </TableRow>
    );
  }
  return children;
}
