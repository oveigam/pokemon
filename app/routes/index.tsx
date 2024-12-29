import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Button } from "@ui/components/button";
import { cn } from "@ui/util/class-name";
import { useCallback } from "react";
import { setCookie } from "vinxi/http";

const updateTheme = createServerFn({ method: "POST" })
  .validator((data: { theme: "light" | "dark" }) => data)
  .handler(({ data }) => {
    console.log("HANDLER", data);
    setCookie("ui-theme", data.theme); // TODO set maxAge, etc.
  });

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const router = useRouter();

  const { theme } = Route.useRouteContext();

  const changeTheme = useCallback(async () => {
    const nextTheme = theme !== "dark" ? "dark" : "light";

    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "system");
    root.classList.add(nextTheme);

    await updateTheme({ data: { theme: nextTheme } });

    router.invalidate();
  }, [theme]);

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center">
      <h1 className={cn("text-rose-600")}>Hello pokemon</h1>
      <Button onClick={changeTheme}>Toggle theme</Button>
    </main>
  );
}
