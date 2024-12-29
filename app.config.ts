import { defineConfig } from "@tanstack/start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    preset: "bun",
  },
  vite: {
    plugins: [
      // path aliases: https://tanstack.com/router/latest/docs/framework/react/start/path-aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }) as any, // types dont match w/e ¯\_(ツ)_/¯
    ],
  },
});
