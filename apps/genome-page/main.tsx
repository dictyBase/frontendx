import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "common/utils/icons" // fontawesome library
import "fontsource-roboto"
import CssBaseline from "@material-ui/core/CssBaseline"
import { AppProviders } from "components/layout/AppProviders"
import { App } from "components/layout/App"
import { Router } from "./Router"
import { useGoogleAnalytics } from "common/hooks/useGoogleAnalytics"
import { enableMock } from "mocks"

// Activate MSW
const initApp = async () => {
  if (import.meta.env.VITE_MOCK_SERVER === "on") {
    await enableMock()
  }
}

const GenomePageApp = () => {
  useGoogleAnalytics()

  return (
    <AppProviders>
      <CssBaseline />
      <App>
        <BrowserRouter basename="/gene">
          <Router />
        </BrowserRouter>
      </App>
    </AppProviders>
  )
}

initApp().then(() => {
  const container = document.getElementById("root")
  if (!container) throw new Error("Failed to find the root element")
  const root = ReactDOM.createRoot(container)
  root.render(<GenomePageApp />)
})