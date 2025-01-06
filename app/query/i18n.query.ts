import { getI18n } from "@/.server/functions/i18n.fn";
import type { Locale } from "@/i18n/i18n";
import { queryOptions } from "@tanstack/react-query";

export const getI18nQuery = (locale: Locale) => {
  return queryOptions({
    queryKey: ["i18n", { locale }],
    queryFn: () => getI18n({ data: { locale } }),
  });
};
