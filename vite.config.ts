import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    setupFiles:
      mode === "prod" ? "/src/test/setup.prod.ts" : "/src/test/setup.dev.ts",
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
