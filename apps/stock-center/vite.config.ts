/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

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
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
