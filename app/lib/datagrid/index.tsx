import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@ui/components/core/table";
import { cn } from "@ui/util/class-name";

import type { TranslateKeys } from "@/i18n/i18n";

import { RowConsumer } from "./components/table/body/row-consumer";
import { DatagridHeader } from "./components/table/header/header-controls";
import { DatagridDropdownMenu } from "./components/util/menu";
import { DensityFeature } from "./features/density/density.feature";
import { I18nFeature, type I18nOptions } from "./features/i18n/i18n.feature";
import { OrderingDnDIndicator } from "./features/order/components/order-placeholder";
import { OrderDndContex } from "./features/order/order.feature";
import { pinningPositionStyle } from "./features/order/order.util";
import { ColSizeFeature, type ColumnSizingOptions } from "./features/size/col-size.feature";
import { CellStyleFeature } from "./features/style/cell-style.feature";
import { RowStyleFeature, type RowStyleProps } from "./features/style/row-style.feature";

export type DatagridProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
} & I18nOptions &
  RowStyleProps<TData> &
  ColumnSizingOptions;

export function Datagrid<TData, TValue>({
  columns,
  data,
  isLoading,
  i18n,
  i18nNS,
  rowClassName,
  autoWidth,
  autoWidthThreshold,
}: DatagridProps<TData, TValue>) {
  const table = useReactTable({
    _features: [DensityFeature, I18nFeature, RowStyleFeature, CellStyleFeature, ColSizeFeature],
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableMultiSort: true,
    isMultiSortEvent: (e) => {
      const { altKey, ctrlKey, shiftKey } = e as {
        altKey: boolean;
        ctrlKey: boolean;
        shiftKey: boolean;
      };
      return altKey || ctrlKey || shiftKey;
    },
    columnResizeMode: "onChange",
    i18n,
    i18nNS,
    rowClassName,
    autoWidth,
    autoWidthThreshold,
    defaultColumn: {
      minSize: 100,
      size: 350,
    },
  });

  return (
    <div className="overflow-x-visible">
      <div className="flex items-end justify-end gap-3 p-2">
        <DatagridDropdownMenu table={table} />
      </div>
      <OrderDndContex table={table}>
        <OrderingDnDIndicator>{(id) => table.t(id as TranslateKeys)}</OrderingDnDIndicator>

        <Table className="grid">
          <TableHeader className="sticky top-0 z-30 grid bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="flex">
                {headerGroup.headers.map((header) => {
                  return (
                    <DatagridHeader key={header.id} header={header}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </DatagridHeader>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="grid">
            <RowConsumer table={table} isLoading={isLoading}>
              {table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "flex hover:bg-primary/5",
                    { "bg-muted": i % 2 !== 0 },
                    row.getClassName(),
                  )}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isPinned = cell.column.getIsPinned();
                    const isLastLeftPinnedColumn =
                      isPinned === "left" && cell.column.getIsLastColumn("left");
                    const isFirstRightPinnedColumn =
                      isPinned === "right" && cell.column.getIsFirstColumn("right");

                    return (
                      <TableCell
                        key={cell.id}
                        density={table.getDensity()}
                        className={cn(
                          "flex bg-background",
                          {
                            "flex-grow": table.getIsAutoWidth(),
                            "bg-muted": i % 2 !== 0,
                            "border-r border-primary": isLastLeftPinnedColumn,
                            "border-l border-primary": isFirstRightPinnedColumn,
                          },
                          row.getClassName(), // TODO los estilos de pinning pueden joder el bg del row styles, añadir un prop mas o dejarlo asi?
                          cell.getClassName(),
                        )}
                        width={cell.column.getSize()}
                        style={pinningPositionStyle(cell.column)}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </RowConsumer>
          </TableBody>
        </Table>
      </OrderDndContex>
    </div>
  );
}
