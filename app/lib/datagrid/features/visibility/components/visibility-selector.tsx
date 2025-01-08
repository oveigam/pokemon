import type { Column, Table } from "@tanstack/react-table";

import { Button } from "@ui/components/core/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/components/core/dropdown-menu";

import type { TranslateKeys } from "@/i18n/i18n";

export type VisibilitySelectorProps<TData> = {
  table: Table<TData>;
  getColumnLabel?: (column: Column<TData, unknown>) => string;
};

export function VisibilitySelector<TData>({
  table,
  getColumnLabel = (col) => table.t(col.id as any), // FIXME any typing
}: VisibilitySelectorProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{table._t("columns")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {getColumnLabel(column)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
