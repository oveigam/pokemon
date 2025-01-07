/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RowData, TableFeature } from "@tanstack/react-table";
import type { Table } from "@tanstack/table-core";

import type { Translator } from "@/i18n/i18n";

// FIXME modificar esta api para usar solo un param e intentar inferir los namespaces

export interface I18nOptions {
  translator: Translator;
  translatorGrid: Translator<"datagrid">;
}

export interface I18nInstances {
  _t: Translator<"datagrid">;
  t: Translator;
}

declare module "@tanstack/react-table" {
  interface TableOptionsResolved<TData extends RowData> extends I18nOptions {}

  interface Table<TData extends RowData> extends I18nInstances {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const I18nFeature: TableFeature<any> = {
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.t = table.options.translator;
    table._t = table.options.translatorGrid;
  },
};
