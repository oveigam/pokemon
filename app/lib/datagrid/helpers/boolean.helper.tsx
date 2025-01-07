import type { AccessorColumnDef, RowData } from "@tanstack/react-table";

import { BooleanFilter } from "../features/filter/components/boolean.filter";
import { booleanFilterFn } from "../features/filter/functions/boolean.filterFn";
import { translatedColumnIdHeader } from "../features/i18n/util";
import { type ColumnHelperOptions, getHelperIdentifier, type Nullish } from "./helpers.util";

export type BooleanValue = Nullish<boolean>;

export type BooleanOptions = never;

export function booleanCol<TData extends RowData>(
  opts: ColumnHelperOptions<TData, BooleanValue, BooleanOptions>,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): AccessorColumnDef<TData, any> {
  return {
    ...getHelperIdentifier(opts),

    meta: {
      //   options:
      //     !opts.options || typeof opts.options === "function" ? opts.options : () => opts.options,

      //   aggregates: opts.aggregates,

      filter: opts.filter?.filter ?? ((ctx) => <BooleanFilter ctx={ctx} />),
    },

    filterFn: opts.filter?.filterFn ?? booleanFilterFn,

    header: opts.header ?? translatedColumnIdHeader,

    // cell: opts.overrides?.cell ?? ((ctx) => <BooleanCell value={ctx.getValue()} />),

    // footer: opts.overrides?.footer ?? ((ctx) => <AggregateFooter ctx={ctx} />),
  };
}
