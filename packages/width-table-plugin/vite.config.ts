import { defineConfig } from "vitest/config"
// https://vitejs.dev/config/

const vitestConfig = defineConfig({
  test: {
    environment: "jsdom",
  },
})

export default vitestConfig
