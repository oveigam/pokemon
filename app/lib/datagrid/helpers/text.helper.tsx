import type { ColumnDef, RowData } from "@tanstack/react-table";

import { TextFilter } from "../features/filter/components/text.filter";
import { textFilterFn } from "../features/filter/functions/text.filterFn";
import { translatedColumnIdHeader } from "../features/i18n/util";
import { type ColumnHelperOptions, getHelperIdentifier, type Nullish } from "./helpers.util";

export type TextValue = Nullish<string>;

export type TextOptions = never;

export function textCol<TData extends RowData>(
  opts: ColumnHelperOptions<TData, TextValue, TextOptions>,
): ColumnDef<TData, TextValue> {
  return {
    ...getHelperIdentifier(opts),

    size: opts.size,
    minSize: opts.minSize,

    meta: {
      options:
        !opts.options || typeof opts.options === "function" ? opts.options : () => opts.options,

      //   aggregates: opts.aggregates,

      filter: opts.filter?.filter ?? ((ctx) => <TextFilter ctx={ctx} />),
    },

    filterFn: opts.filter?.filterFn ?? textFilterFn,

    header: opts.header ?? translatedColumnIdHeader,

    cell:
      opts.cell ??
      ((ctx) => {
        const value = ctx.getValue();
        if (typeof value !== "string") {
          return null;
        }
        return (
          <div className="flex h-full w-full items-center overflow-auto whitespace-pre-line">
            {value}
          </div>
        );
      }),

    // footer: opts.overrides?.footer ?? ((ctx) => <AggregateFooter ctx={ctx} />),
  };
}
