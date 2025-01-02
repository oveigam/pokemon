import i18n from "@/i18n/i18n";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { i18n as I18n } from "i18next";
import type { Session, User } from "./.server/db/types.db";

export type RouterContext = {
  theme: "light" | "dark";
  i18n: I18n;
  session: {
    user: Pick<User, "id" | "name" | "email" | "image" | "isAdmin">;
    session: Session;
  } | null;
};

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      theme: "light",
      i18n,
      session: null,
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
