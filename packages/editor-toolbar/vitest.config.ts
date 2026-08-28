/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

// eslint-disable-next-line import/no-default-export
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
