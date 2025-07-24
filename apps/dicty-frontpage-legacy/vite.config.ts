/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react"
import istanbul from "vite-plugin-istanbul"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    // @ts-ignore
    ...react(),
    // @ts-ignore
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "__test__/"],
      extension: [".ts", ".tsx"],
    }),
  ],
  server: {
    port: 3004,
  },
  base: "/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    exclude: ["**/e2e"],
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
