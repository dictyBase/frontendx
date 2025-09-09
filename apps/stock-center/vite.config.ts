import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
  },
  base: "/stockcenter",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    exclude: ["**/e2e"],
    coverage: {
      include: ["src/*"],
      all: false,
    },
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
