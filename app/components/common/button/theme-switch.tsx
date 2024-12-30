import type { RouterContext } from "@/router";
import { useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Switch } from "@ui/components/switch";
import { cn } from "@ui/util/class-name";
import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { setCookie } from "vinxi/http";

type Theme = RouterContext["theme"];

const updateTheme = createServerFn({ method: "POST" })
  .validator((data: { theme: "light" | "dark" }) => data)
  .handler(({ data }) => {
    setCookie("ui-theme", data.theme); // TODO set maxAge, etc.
  });

export const ThemeSwitch = ({ theme }: { theme: Theme }) => {
  const router = useRouter();

  const [isDark, setIsDark] = React.useState(theme === "dark");

  return (
    <Switch
      className="data-[state=checked]:bg-zinc-600 data-[state=unchecked]:bg-zinc-300 data-[state=checked]:text-zinc-50 data-[state=unchecked]:text-zinc-800"
      thumbClassName={cn(
        "flex items-center justify-center data-[state=unchecked]:bg-zinc-50 data-[state=checked]:bg-zinc-800",
      )}
      checked={isDark}
      onCheckedChange={async () => {
        const nextTheme = theme !== "dark" ? "dark" : "light";

        const root = window.document.documentElement;
        root.classList.remove("light", "dark", "system");
        root.classList.add(nextTheme);

        setIsDark(nextTheme === "dark");

        await updateTheme({ data: { theme: nextTheme } });

        router.invalidate();
      }}
    >
      {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
    </Switch>
  );
};
