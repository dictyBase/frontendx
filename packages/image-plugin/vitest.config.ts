/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setup.ts",
    mockReset: true,
    server: {
      deps: {
        inline: ["@lexical/react", "@lexical/devtools-core"],
      },
    },
  },
})
