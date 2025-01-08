import type { Column, Table } from "@tanstack/react-table";
import { Settings } from "lucide-react";

import { Button } from "@ui/components/core/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ui/components/core/dropdown-menu";

import { DensityIcon } from "../../features/density/components/density-selector";

export type DatagridMenuProps<TData> = {
  table: Table<TData>;
  getColumnLabel?: (column: Column<TData, unknown>) => string;
};

export function DatagridDropdownMenu<TData>({
  table,
  getColumnLabel = (col) => table.t(col.id as any), // FIXME any type
}: DatagridMenuProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-primary">{table._t("columns")}</DropdownMenuLabel>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{table._t("select-visible")}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
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
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem onSelect={() => table.setColumnSizing({})}>
            {table._t("reset-sizes")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-primary">{table._t("rows")}</DropdownMenuLabel>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{table._t("density")}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {(["sm", "md", "lg"] as const).map((density) => {
                  return (
                    <DropdownMenuItem
                      key={density}
                      onSelect={() => table.setDensity(density)}
                      disabled={density === table.getDensity()}
                    >
                      {table._t(density)}
                      <DropdownMenuShortcut>
                        <DensityIcon density={density} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
