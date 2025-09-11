/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
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