/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

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
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
