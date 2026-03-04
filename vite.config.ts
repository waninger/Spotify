import { defineConfig } from "vitest/config";
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => ({
  test: {
    environment: "node",
    setupFiles:
      mode === "prod" ? "/src/test/setup.prod.ts" : "/src/test/setup.dev.ts",
    env: loadEnv(mode, process.cwd(), ''),
  },
}));
