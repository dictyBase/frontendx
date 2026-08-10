/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setup.ts",
    mockReset: true,
  },
  resolve: {
    alias: [
      {
        find: /^@dictybase\/(.*)$/,
        replacement: path.resolve(__dirname, "src/packages/$1"),
      },
    ],
  },
})
