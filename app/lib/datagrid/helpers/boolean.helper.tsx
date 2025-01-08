import type { AccessorColumnDef, RowData } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";

import { BooleanFilter } from "../features/filter/components/boolean.filter";
import { booleanFilterFn } from "../features/filter/functions/boolean.filterFn";
import { translatedColumnIdHeader } from "../features/i18n/util";
import { type ColumnHelperOptions, getHelperIdentifier, type Nullish } from "./helpers.util";

export type BooleanValue = Nullish<boolean>;

export type BooleanOptions = never;

export function booleanCol<TData extends RowData>(
  opts: ColumnHelperOptions<TData, BooleanValue, BooleanOptions>,
): AccessorColumnDef<TData, BooleanValue> {
  return {
    ...getHelperIdentifier(opts),

    size: opts.size,
    minSize: opts.minSize,

    meta: {
      options:
        !opts.options || typeof opts.options === "function" ? opts.options : () => opts.options,

      //   aggregates: opts.aggregates,

      filter: opts.filter?.filter ?? ((ctx) => <BooleanFilter ctx={ctx} />),
    },

    filterFn: opts.filter?.filterFn ?? booleanFilterFn,

    header: opts.header ?? translatedColumnIdHeader,

    cell:
      opts.cell ??
      ((ctx) => {
        const value = ctx.getValue();
        if (typeof value !== "boolean") {
          return null;
        }
        return value ? (
          <CheckIcon className="m-auto text-green-600" />
        ) : (
          <XIcon className="m-auto text-red-600" />
        );
      }),

    // footer: opts.overrides?.footer ?? ((ctx) => <AggregateFooter ctx={ctx} />),
  };
}
