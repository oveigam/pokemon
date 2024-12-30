import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export type RouterContext = {
  theme: "light" | "dark";
};

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      theme: "light",
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
