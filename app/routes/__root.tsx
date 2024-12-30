import "@fontsource-variable/inter";

import { ThemeSwitch } from "@/modules/common/components/theme-switch";
import type { RouterContext } from "@/router";
import globalCss from "@/style/global.css?url";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { getCookie } from "vinxi/server";
import { useTranslation } from "react-i18next";

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
    return {
      theme: theme ?? "light",
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
  const { theme } = Route.useRouteContext();

  return (
    <html className={theme}>
      <head>
        <Meta />
      </head>
      <body>
        <header className="sticky top-0 grid h-12 grid-cols-3 items-center bg-primary px-2 text-primary-foreground md:px-4 lg:px-6 xl:px-12">
          <div />
          <h1 className="invisible text-center font-semibold sm:visible md:text-lg">
            {t("title")}
          </h1>
          <div className="flex justify-end">
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
