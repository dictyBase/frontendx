/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

const vitestConfig = defineConfig({
  test: {
    globals: true,
    mockReset: true,
    environment: "jsdom",
    setupFiles: "./setup.ts",
  },
})

export default vitestConfig
