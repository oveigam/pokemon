import { createServerFn } from "@tanstack/start";
import type { IntlConfig } from "use-intl";
import type { Locale, Messages } from "../../i18n/i18n";
// import asd from "../../i18n/messages/en";

export const getI18n = createServerFn({ method: "GET" })
  .validator((data: { locale: "en" | "es" }) => data)
  .handler(async ({ data }) => {
    const messages = await import(`../../i18n/messages/${data.locale}.ts`);

    return {
      locale: data.locale as Locale,
      timeZone: "UTC",
      messages: messages.default as Messages,
    } as const satisfies IntlConfig;
  });
