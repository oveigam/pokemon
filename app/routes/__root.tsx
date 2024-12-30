import { ThemeSwitch } from "@/modules/common/components/theme-switch";
import type { RouterContext } from "@/router";
import globalCss from "@/style/global.css?url";
import "@fontsource-variable/inter";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { getCookie } from "vinxi/server";

const getTheme = createServerFn({ method: "GET" }).handler(() => {
  return getCookie("ui-theme") as RouterContext["theme"] | undefined;
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
    return { theme: theme ?? "light" } satisfies Partial<RouterContext>;
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
        <header className="flex h-10 bg-primary text-primary-foreground">
          <div className="container flex items-center justify-end">
            <ThemeSwitch theme={theme} />
          </div>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
