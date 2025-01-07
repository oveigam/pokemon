import type { ColumnDef, RowData } from "@tanstack/react-table";

import { StringFilter } from "../features/filter/components/string.filter";
import { stringFilterFn } from "../features/filter/functions/string.filterFn";
import { translatedColumnIdHeader } from "../features/i18n/util";
import { type ColumnHelperOptions, getHelperIdentifier, type Nullish } from "./helpers.util";

export type StringValue = Nullish<string>;

export type TextOptions = never;

export function stringCol<TData extends RowData>(
  opts: ColumnHelperOptions<TData, StringValue, TextOptions>,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ColumnDef<TData, any> {
  return {
    ...getHelperIdentifier(opts),

    meta: {
      //   options:
      //     !opts.options || typeof opts.options === "function" ? opts.options : () => opts.options,

      //   aggregates: opts.aggregates,

      filter: opts.filter?.filter ?? ((ctx) => <StringFilter ctx={ctx} />),
    },

    filterFn: opts.filter?.filterFn ?? stringFilterFn,

    header: opts.header ?? translatedColumnIdHeader,

    // cell: opts.overrides?.cell ?? ((ctx) => <TextCell value={ctx.getValue()} />),

    // footer: opts.overrides?.footer ?? ((ctx) => <AggregateFooter ctx={ctx} />),
  };
}
