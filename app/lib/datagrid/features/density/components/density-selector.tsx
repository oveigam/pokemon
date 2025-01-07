import type { Table } from "@tanstack/react-table";
import { Rows2Icon, Rows3Icon, Rows4Icon } from "lucide-react";

import { Button } from "@ui/components/core/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@ui/components/core/dropdown-menu";

import type { DensityState } from "../density.feature";

export const DensityIcon = ({ density }: { density: DensityState }) => {
  switch (density) {
    case "sm":
      return <Rows2Icon />;
    case "md":
      return <Rows3Icon />;
    case "lg":
      return <Rows4Icon />;
  }
};

export function DensitySelector<TData>({ table }: { table: Table<TData> }) {
  const density = table.getDensity();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DensityIcon density={density} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => table.setDensity("sm")} disabled={density === "sm"}>
          {table._t("small")}
          <DropdownMenuShortcut>
            <DensityIcon density="sm" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => table.setDensity("md")} disabled={density === "md"}>
          {table._t("medium")}
          <DropdownMenuShortcut>
            <DensityIcon density="md" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => table.setDensity("lg")} disabled={density === "lg"}>
          {table._t("large")}
          <DropdownMenuShortcut>
            <DensityIcon density="lg" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
