import "@fontsource-variable/inter";

import { getSession } from "@/.server/functions/session.fn";
import { getTheme, getLanguage } from "@/.server/functions/user.fn";
import { AppSidebar } from "@/components/common/layout/app-sidebar";
import type { RouterContext } from "@/router";
import globalCss from "@/style/global.css?url";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import { SidebarProvider } from "@ui/components/sidebar";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { initI18n } from "@/i18n/i18n";

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
        title: "Pokemon Enterprise Edition",
      },
    ],
    links: [{ rel: "stylesheet", href: globalCss }],
  }),
  component: RootComponent,
  beforeLoad: async (ctx) => {
    const [theme, lng, session] = await Promise.all([getTheme(), getLanguage(), getSession()]);

    return {
      theme: theme ?? "light",
      session,
    } satisfies Partial<RouterContext>;
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
  const { theme, session } = Route.useRouteContext();

  return (
    <html className={theme}>
      <head>
        <Meta />
      </head>
      <body>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar user={session?.user} />
          {children}
          <ScrollRestoration />
          <TanStackRouterDevtools position="top-right" />
          <ReactQueryDevtools buttonPosition="bottom-right" />
          <Scripts />
        </SidebarProvider>
      </body>
    </html>
  );
}
