import type { AccessorColumnDef, RowData } from "@tanstack/react-table";

import { NumberFilter } from "../features/filter/components/number.filter";
import { numberFilterFn } from "../features/filter/functions/number.filterFn";
import { translatedColumnIdHeader } from "../features/i18n/util";
import { type ColumnHelperOptions, getHelperIdentifier, type Nullish } from "./helpers.util";

export type NumberValue = Nullish<number>;

export type NumberOptions = {
  format?: (value: NumberValue) => string;
};

export function numberCol<TData extends RowData>(
  opts: ColumnHelperOptions<TData, NumberValue, NumberOptions>,
): AccessorColumnDef<TData, NumberValue> {
  return {
    ...getHelperIdentifier(opts),

    size: opts.size,
    minSize: opts.minSize,

    meta: {
      options:
        !opts.options || typeof opts.options === "function" ? opts.options : () => opts.options,

      //   aggregates: opts.aggregates,

      filter: opts.filter?.filter ?? ((ctx) => <NumberFilter ctx={ctx} />),
    },

    filterFn: opts?.filter?.filterFn ?? numberFilterFn,

    header: opts.header ?? translatedColumnIdHeader,

    cell:
      opts.cell ??
      ((ctx) => {
        const value = ctx.getValue();
        const opts = ctx.column.columnDef.meta?.options?.(value, ctx.row.original) as
          | NumberOptions
          | undefined;

        if (typeof value !== "number") {
          return null;
        }

        return (
          <div className="flex h-full w-full items-center justify-end">
            {opts?.format ? opts.format(value) : value}
          </div>
        );
      }),

    // footer: opts.overrides?.footer ?? ((ctx) => <AggregateFooter ctx={ctx} />),
  };
}
