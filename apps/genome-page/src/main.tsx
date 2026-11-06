import { RouterProvider } from "react-router-dom"
import "common/utils/icons" // fontawesome library
import "fontsource-roboto"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ErrorBoundary } from "@dictybase/ui-common"
import { AppProviders } from "components/layout/AppProviders"
import { App } from "components/layout/App"
import { useGoogleAnalytics } from "@dictybase/google-analytics"
import { genomepageRouter } from "./routes"

const GenomePageApp = () => {
  useGoogleAnalytics(import.meta.env.VITE_GA_TRACKING_ID)
  return (
    <AppProviders>
      <CssBaseline />
      <ErrorBoundary>
        <App>
          <RouterProvider router={genomepageRouter} />
        </App>
      </ErrorBoundary>
    </AppProviders>
  )
}

export { GenomePageApp }
