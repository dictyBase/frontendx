import react from "@vitejs/plugin-react-swc"
import { defineConfig, coverageConfigDefaults } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 3004,
  },
  base: "/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    exclude: ["**/e2e"],
    coverage: {
      include: ["src/*"],
      exclude: ["**/constants/*", ...coverageConfigDefaults.exclude],
      all: false,
    },
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
