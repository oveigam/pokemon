import type { RouterContext } from "@/router";
import globalCss from "@/style/global.css?url";
import "@fontsource-variable/inter";
import { Outlet, ScrollRestoration, createRootRouteWithContext } from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { getCookie } from "vinxi/server";

const getTheme = createServerFn({ method: "GET" }).handler(() => {
  return getCookie("ui-theme") as "light" | "dark" | "system" | undefined;
});

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Pokemon",
      },
    ],
    links: [{ rel: "stylesheet", href: globalCss }],
  }),
  component: RootComponent,
  beforeLoad: async () => {
    const theme = await getTheme();
    return { theme } satisfies Partial<RouterContext>;
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { theme } = Route.useRouteContext();

  return (
    <html className={theme}>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
