import react from "@vitejs/plugin-react-swc"
import { defineConfig, coverageConfigDefaults } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  base: "/publication",
  test: {
    globals: true,
    environment: "jsdom",
    testTimeout: 30_000,
    setupFiles: ["./vitest.setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",
      "**/__tests__/mocks/**",
    ],
    coverage: {
      include: ["**/components/**/*.{ts,tsx}", "**/common/hooks/*.{ts,tsx}"],
      exclude: ["**/__tests__/mocks/**", "**/common/hooks/", ...coverageConfigDefaults.exclude],
      reporter: ["text", "json", "html"],
      all: false,
    },
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig