import { createServerFn } from "@tanstack/start";
import { getCookie, setCookie } from "vinxi/http";
import { dal } from "../data/_dal";

export const getTheme = createServerFn({ method: "GET" }).handler(() => {
  return getCookie("ui-theme") as "light" | "dark" | "system" | undefined;
});

export const updateTheme = createServerFn({ method: "POST" })
  .validator((data: { theme: "light" | "dark" | "system" }) => data)
  .handler(({ data }) => {
    setCookie("ui-theme", data.theme); // TODO set maxAge, etc.
  });

export const getLanguage = createServerFn({ method: "GET" }).handler(() => {
  return getCookie("language") as "en" | "es" | undefined;
});

export const updateLanguage = createServerFn({ method: "POST" })
  .validator((data: { lng: "en" | "es" }) => data)
  .handler(({ data }) => {
    setCookie("language", data.lng); // TODO set maxAge, etc.
  });
