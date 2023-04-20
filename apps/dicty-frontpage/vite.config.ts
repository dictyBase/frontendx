/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig, mergeConfig } from "vite"
import { defineConfig as defineVitestConfig } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    mainFields: ["module"],
  },
})

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    deps: {
      inline: ["clsx"],
    },
  },
})

export default mergeConfig(viteConfig, vitestConfig)
