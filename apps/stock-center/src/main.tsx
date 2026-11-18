import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

const main = async () => {
  if (import.meta.env.VITE_APP_DEPLOY_ENV === "mock") {
    const { default: worker } = await import("./mocks/browser")
    await worker.start({
      serviceWorker: {
        url: "/stockcenter/mockServiceWorker.js",
      },
    })
  }
  const container = document.querySelector("#root")
  if (!container) throw new Error("Failed to find the root element")
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

main()
