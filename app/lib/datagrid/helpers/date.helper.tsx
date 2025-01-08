import type { AccessorColumnDef, RowData } from "@tanstack/react-table";
import { format } from "date-fns";

import { DateFilter } from "../features/filter/components/date.filter";
import { dateFilterFn } from "../features/filter/functions/date.filterFn";
import { translatedColumnIdHeader } from "../features/i18n/util";
import { type ColumnHelperOptions, getHelperIdentifier } from "./helpers.util";

export type DateValue = Date | null | undefined;

export type DateOptions = {
  format?: "dd-MM-yyyy" | "dd-MM-yyyy hh:mm" | "dd-MM-yyyy hh:mm:ss";
};

export function dateCol<TData extends RowData>(
  opts: ColumnHelperOptions<TData, DateValue, DateOptions>,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): AccessorColumnDef<TData, DateValue> {
  return {
    ...getHelperIdentifier(opts),

    meta: {
      //   options:
      //     !opts.options || typeof opts.options === "function" ? opts.options : () => opts.options,

      //   aggregates: opts.aggregates,

      filter: opts?.filter?.filter ?? ((ctx) => <DateFilter ctx={ctx} />),
    },

    filterFn: opts.filter?.filterFn ?? dateFilterFn,

    header: opts.header ?? translatedColumnIdHeader,

    cell:
      opts.cell ??
      ((ctx) => {
        const value = ctx.getValue();
        // const opts = ctx.column.columnDef.meta?.options?.(value, ctx.row.original) as
        //   | DateOptions
        //   | undefined;

        if (value instanceof Date) {
          // return format(value, opts?.format ?? "dd-MM-yyyy");
          return format(value, "dd-MM-yyyy");
        }
        return null;
      }),

    // footer: opts.overrides?.footer ?? ((ctx) => <AggregateFooter ctx={ctx} />),
  };
}
