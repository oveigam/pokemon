import "@fontsource-variable/inter";

import { AppSidebar } from "@/components/common/layout/app-sidebar";
import type { RouterContext } from "@/router";
import { getI18nQuery } from "@/services/i18n/i18n.query";
import { getSession } from "@/services/session/session.api";
import { getLanguage, getTheme } from "@/services/user/user.api";
import globalCss from "@/style/global.css?url";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import { SidebarProvider } from "@ui/components/sidebar";
import { type ReactNode } from "react";
import { createTranslator, IntlProvider } from "use-intl";

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
  beforeLoad: async ({ context }) => {
    const [theme, lng, session] = await Promise.all([getTheme(), getLanguage(), getSession()]);

    const i18n = await context.queryClient.ensureQueryData(getI18nQuery(lng ?? "en"));
    const translator = createTranslator(i18n);

    return {
      theme: theme ?? "light",
      session,
      lng,
      translator,
    };
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
  const { theme, session, lng } = Route.useRouteContext();

  const { data: i18n } = useSuspenseQuery(getI18nQuery(lng ?? "en"));

  return (
    <html lang={lng ?? "en"} className={theme}>
      <head>
        <Meta />
      </head>
      <body>
        <IntlProvider {...i18n}>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar user={session?.user} />
            {children}
            <ScrollRestoration />
            <TanStackRouterDevtools position="top-right" />
            <ReactQueryDevtools buttonPosition="bottom-right" />
            <Scripts />
          </SidebarProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
