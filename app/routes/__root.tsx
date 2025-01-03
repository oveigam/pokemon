import "@fontsource-variable/inter";

import { dal } from "@/.server/data/_dal";
import { ThemeSwitch } from "@/components/common/button/theme-switch";
import type { RouterContext } from "@/router";
import globalCss from "@/style/global.css?url";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { getCookie } from "vinxi/server";
import { SidebarProvider, SidebarTrigger } from "@ui/components/sidebar";
import { AppSidebar } from "@/components/common/layout/app-sidebar";

const getTheme = createServerFn({ method: "GET" }).handler(() => {
  return getCookie("ui-theme") as RouterContext["theme"] | undefined;
});

const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("authentication");

  if (token) {
    const session = await dal.session.validateSessionToken(token);
    return session;
  }

  return null;
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
        title: "Pokemon Enterprise Edition",
      },
    ],
    links: [{ rel: "stylesheet", href: globalCss }],
  }),
  component: RootComponent,
  beforeLoad: async () => {
    const [theme, session] = await Promise.all([getTheme(), getSession()]);
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
  const { t } = useTranslation("base");
  const { theme, session } = Route.useRouteContext();

  return (
    <html className={theme}>
      <head>
        <Meta />
      </head>
      <body>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
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
