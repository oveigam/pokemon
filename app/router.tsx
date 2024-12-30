import i18n from "@/i18n/i18n";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { i18n as I18n } from "i18next";

export type RouterContext = {
  theme: "light" | "dark";
  i18n: I18n;
};

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      theme: "light",
      i18n,
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
