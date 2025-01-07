import type { ColumnDef, RowData } from "@tanstack/react-table";

import { TextFilter } from "../features/filter/components/text.filter";
import { textFilterFn } from "../features/filter/functions/text.filterFn";
import { translatedColumnIdHeader } from "../features/i18n/util";
import { type ColumnHelperOptions, getHelperIdentifier, type Nullish } from "./helpers.util";

export type TextValue = Nullish<string>;

export type TextOptions = never;

export function textCol<TData extends RowData>(
  opts: ColumnHelperOptions<TData, TextValue, TextOptions>,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ColumnDef<TData, any> {
  return {
    ...getHelperIdentifier(opts),

    meta: {
      //   options:
      //     !opts.options || typeof opts.options === "function" ? opts.options : () => opts.options,

      //   aggregates: opts.aggregates,

      filter: opts.filter?.filter ?? ((ctx) => <TextFilter ctx={ctx} />),
    },

    filterFn: opts.filter?.filterFn ?? textFilterFn,

    header: opts.header ?? translatedColumnIdHeader,

    // cell: opts.overrides?.cell ?? ((ctx) => <TextCell value={ctx.getValue()} />),

    // footer: opts.overrides?.footer ?? ((ctx) => <AggregateFooter ctx={ctx} />),
  };
}
