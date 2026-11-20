import { createRoot } from "react-dom/client"
import "fontsource-roboto"
import "./common/utils/polyfills"
import "./common/utils/icons" // fontawesome library
import { App } from "./app/layout/App"

const main = async () => {
  // Activate MSW
  if (import.meta.env.VITE_APP_DEPLOY_ENV === "mock") {
    const { worker } = await import("./mocks/browser")
    await worker.start()
  }

  const container = document.querySelector("#root")
  if (!container) throw new Error("Failed to find the root element")
  const root = createRoot(container)
  root.render(<App />)
}

main()
