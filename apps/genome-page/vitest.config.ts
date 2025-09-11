/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts", "./vitest.setupEnv.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",
      "**/__tests__/mocks/**",
    ],
    coverage: {
      include: ["**/components/**/*.{ts,tsx}", "**/common/hooks/*.{ts,tsx}"],
      exclude: ["**/__tests__/mocks/**", "**/common/hooks/"],
      reporter: ["text", "json", "html"],
    },
    globals: true,
  },
})