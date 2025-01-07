import type { HeaderContext } from "@tanstack/react-table";

import type { TranslateKeys } from "@/i18n/i18n";

export function translatedColumnIdHeader<TData>(ctx: HeaderContext<TData, unknown>) {
  return ctx.table.t(ctx.column.id as TranslateKeys);
}
