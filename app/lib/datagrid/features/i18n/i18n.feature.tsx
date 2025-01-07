/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RowData, TableFeature } from "@tanstack/react-table";
import type { Table } from "@tanstack/table-core";
import {
  createTranslator,
  type IntlConfig,
  type Messages,
  type NamespaceKeys,
  type NestedKeyOf,
  type useTranslations as _useTranslations,
} from "use-intl";

import type { MessageNamespace, Translator } from "@/i18n/i18n";

import type { DatagridTranslations } from "./messages/datagrid.en";
import datagridEn from "./messages/datagrid.en";
import datagridEs from "./messages/datagrid.es";

type DatagridTranslator = (key: keyof DatagridTranslations) => string;

type I18n = {
  readonly locale: "en" | "es";
  readonly timeZone: "UTC";
  readonly messages: Messages;
};

export interface I18nOptions {
  i18n: I18n;
  i18nNS: MessageNamespace;
}

export interface I18nInstances {
  _t: DatagridTranslator;
  t: Translator;
}

declare module "@tanstack/react-table" {
  interface TableOptionsResolved<TData extends RowData> extends I18nOptions {}

  interface Table<TData extends RowData> extends I18nInstances {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const I18nFeature: TableFeature<any> = {
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.t = createTranslator({
      ...table.options.i18n,
      namespace: table.options.i18nNS,
    }) as Translator;

    table._t = createTranslator({
      locale: table.options.i18n.locale,
      timeZone: table.options.i18n.timeZone,
      // @ts-expect-error ñapa por el tipado compartido
      messages: table.options.i18n.locale === "es" ? datagridEs : datagridEn,
    }) as DatagridTranslator;
  },
};
