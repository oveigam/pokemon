import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { Spinner } from "@ui/components/spinner";

import { routeTree } from "./routeTree.gen";
import type { Session, User } from "./server/db/types.db";

export type RouterContext = {
  theme: "light" | "dark" | "system";
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
        session: null,
        queryClient,
      },
      defaultPreload: "intent",
      defaultPendingComponent: () => {
        return (
          <div className="flex flex-1 justify-center py-12">
            <Spinner />
          </div>
        );
      },
      defaultStaleTime: 1000 * 60,
      defaultGcTime: 1000 * 60,
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
