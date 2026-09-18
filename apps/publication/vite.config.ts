import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
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
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
