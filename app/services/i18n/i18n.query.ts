import { queryOptions } from "@tanstack/react-query";

import type { Locale } from "@/i18n/i18n";

import { getI18n } from "./i18n.api";

export const getI18nQuery = (locale: Locale) => {
  return queryOptions({
    queryKey: ["i18n", { locale }],
    queryFn: () => getI18n({ data: { locale } }),
    gcTime: Infinity,
    staleTime: Infinity,
  });
};
