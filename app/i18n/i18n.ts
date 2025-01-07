import type { NamespaceKeys, NestedKeyOf, useTranslations as _useTranslations } from "use-intl";

import type enMessages from "./messages/en";

export const AVAILABLE_LOCALES = ["en", "es"] as const;
export const DEFAULT_LOCALE = "en" as const;

export type Messages = typeof enMessages;
export type Locale = (typeof AVAILABLE_LOCALES)[number];

export type MessageNamespace = NamespaceKeys<Messages, NestedKeyOf<Messages>>;

export type Translator<NestedKey extends MessageNamespace = never> = ReturnType<
  typeof _useTranslations<NestedKey>
>;
export type TranslateKeys<NestedKey extends MessageNamespace = never> = Parameters<
  Translator<NestedKey>
>[0];

export const tKey = ((key: TranslateKeys) => key) as Translator;

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
  }
}
