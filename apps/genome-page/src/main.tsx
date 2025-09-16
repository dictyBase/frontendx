import React from "react"
import { BrowserRouter, RouterProvider } from "react-router-dom"
import "common/utils/icons" // fontawesome library
import "fontsource-roboto"
import CssBaseline from "@material-ui/core/CssBaseline"
import { AppProviders } from "components/layout/AppProviders"
import { App } from "components/layout/App"
import { useGoogleAnalytics } from "common/hooks/useGoogleAnalytics"
import { enableMock } from "mocks"
import { genomepageRouter } from "../routes"

const GenomePageApp = () => {
  useGoogleAnalytics()
  return (
    <AppProviders>
      <CssBaseline />
      <App>
        <RouterProvider router={genomepageRouter} />
      </App>
    </AppProviders>
  )
}

export { GenomePageApp }
