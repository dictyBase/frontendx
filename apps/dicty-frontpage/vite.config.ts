import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vitest/config"
import { pageMetadataPlugin } from "@dictybase/auth-mui5/vite/pageMetadata.mjs"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [pageMetadataPlugin(), react()],
  server: {
    port: 3004,
    strictPort: true,
  },
  base: "/",
  build: {
    // Emit source maps so production stack traces map back to source and
    // Lighthouse can attribute unused code (fixes `valid-source-maps`).
    sourcemap: true,
    rollupOptions: {
      output: {
        // Split the large vendor libraries out of the single entry chunk so
        // the home route no longer ships the whole dependency graph up front.
        // fp-ts / ts-pattern are intentionally NOT separated: they are tiny and
        // shared by almost every chunk (including editor), so forcing them into
        // their own chunk produces circular chunk references. Letting Rollup
        // co-locate them avoids the cycle with no meaningful size cost.
        manualChunks: {
          mui: ["@mui/material", "@mui/icons-material"],
          apollo: ["@apollo/client"],
          editor: ["@dictybase/editor"],
          fontawesome: [
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/react-fontawesome",
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    exclude: ["**/e2e"],
  },
})

// eslint-disable-next-line import/no-default-export
export default viteConfig
