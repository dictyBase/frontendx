import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vitest/config"
import { pageMetadataPlugin } from "@dictybase/auth-mui5/vite/pageMetadata.mjs"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [pageMetadataPlugin(), react()],
  server: {
    port: 3003,
    strictPort: true,
  },
  base: "/stockcenter",
  test: {
    globals: true,
    environment: "jsdom",
    testTimeout: 30_000,
    setupFiles: ["./src/__tests__/setup.ts"],
    exclude: ["**/e2e"],
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
