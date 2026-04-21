import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    strictPort: true,
  },
  base: "/gene",
  resolve: {
    alias: {
      pages: "/src/pages",
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
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
