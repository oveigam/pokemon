import i18n from "@/i18n/i18n";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { i18n as I18n } from "i18next";
import type { Session, User } from "./.server/db/types.db";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { QueryClient } from "@tanstack/react-query";

export type RouterContext = {
  theme: "light" | "dark";
  i18n: I18n;
  session: {
    user: Pick<User, "id" | "name" | "email" | "image" | "isAdmin">;
    session: Session;
  } | null;
  queryClient: QueryClient;
};

export function createRouter() {
  const queryClient = new QueryClient();

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: {
        theme: "light",
        i18n,
        session: null,
        queryClient,
      },
    }),
    queryClient,
  );

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
