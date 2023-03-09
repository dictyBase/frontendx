/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    "environment": "jsdom",
    "globals": true,
    "setupFiles": "./src/__tests__/setup.ts"
  },
})

