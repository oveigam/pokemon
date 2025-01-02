import "@fontsource-variable/inter";

import { ThemeSwitch } from "@/components/common/button/theme-switch";
import type { RouterContext } from "@/router";
import globalCss from "@/style/global.css?url";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { getCookie } from "vinxi/server";
import { useTranslation } from "react-i18next";
import { dal } from "@/.server/data/_dal";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";

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
        title: "Pokemon",
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
        <header className="sticky top-0 grid h-12 grid-cols-3 items-center bg-primary px-2 text-primary-foreground md:px-4 lg:px-6 xl:px-12">
          <div />
          <h1 className="invisible text-center font-semibold sm:visible md:text-lg">
            {t("title")}
          </h1>
          <div className="flex items-center justify-end gap-2">
            <Link to="/signup">
              <Avatar className="h-6 w-6 bg-card text-xs text-card-foreground">
                {session?.user.image && (
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                )}
                <AvatarFallback>
                  {session?.user.name.slice(0, 2).toUpperCase() ?? "PK"}
                </AvatarFallback>
              </Avatar>
            </Link>
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
