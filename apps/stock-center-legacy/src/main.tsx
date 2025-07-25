import React from "react"
import { render } from "react-dom"
import { App } from "./App"

const main = async () => {
  if (import.meta.env.VITE_APP_DEPLOY_ENV === "mock") {
    const { default: worker } = await import("./mocks/browser")
    await worker.start()
  }

  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.querySelector("#root"),
  )
}

main()
