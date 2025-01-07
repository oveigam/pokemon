/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RowData, TableFeature } from "@tanstack/react-table";
import type { Table } from "@tanstack/table-core";

import type { MessageNamespace, Translator } from "@/i18n/i18n";

// FIXME modificar esta api para usar solo un param e intentar inferir los namespaces (usar translator con todos y pasarle el ns como key)

export interface I18nOptions {
  translator: Translator<MessageNamespace>;
  translatorGrid: Translator<"datagrid">;
}

export interface I18nInstances {
  _t: Translator<"datagrid">;
  t: Translator<MessageNamespace>;
}

declare module "@tanstack/react-table" {
  interface TableOptionsResolved<TData extends RowData> extends I18nOptions {}

  interface Table<TData extends RowData> extends I18nInstances {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const I18nFeature: TableFeature<any> = {
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.t = ((...params: Parameters<Translator<MessageNamespace>>) => {
      return table.options.translator(...params);
    }) as Translator<MessageNamespace>;

    table._t = ((...params: Parameters<Translator<"datagrid">>) => {
      return table.options.translatorGrid(...params);
    }) as Translator<"datagrid">;
  },
};
