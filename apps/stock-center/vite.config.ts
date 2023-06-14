import { defineConfig } from "vite"
import { swcReactRefresh } from "vite-plugin-swc-react-refresh"

export default defineConfig({
  plugins: [swcReactRefresh()],
  esbuild: { jsx: "automatic" },
  envPrefix: "REACT_APP_",
})
