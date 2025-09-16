import react from "@vitejs/plugin-react-swc"
import { defineConfig, coverageConfigDefaults } from "vitest/config"
import path from "node:path"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
  },
  base: "/gene",
  resolve: {
    alias: {
      common: "/src/common",
      components: "/src/components",
      styles: "/src/styles",
      mocks: "/src/mocks",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts", "./vitest.setupEnvironment.ts"],
    testTimeout: 10_000,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",
      "**/__tests__/mocks/**",
    ],
    coverage: {
      include: ["**/components/**/*.{ts,tsx}", "**/common/hooks/*.{ts,tsx}"],
      exclude: [
        "**/__tests__/mocks/**",
        "**/common/hooks/",
        ...coverageConfigDefaults.exclude,
      ],
      reporter: ["text", "json", "html"],
      all: false,
    },
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig

