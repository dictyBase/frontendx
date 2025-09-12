/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts", "./vitest.setupEnvironment.ts"],
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
  resolve: {
    alias: {
      common: new URL("common/", import.meta.url).pathname,
      components: new URL("components/", import.meta.url).pathname,
      styles: new URL("styles/", import.meta.url).pathname,
      mocks: new URL("mocks/", import.meta.url).pathname,
    },
  },
})
