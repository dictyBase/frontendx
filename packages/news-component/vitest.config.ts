/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

const vitestConfig = defineConfig({
  test: {
    globals: true,
    mockReset: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
  },
})

export default vitestConfig
