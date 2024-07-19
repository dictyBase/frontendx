import { useEffect, FunctionComponent } from "react"
import { Outlet } from "react-router-dom"
import { initializeGoogleAnalytics } from "@dictybase/google-analytics"

const runGA = () => {
  if (import.meta.env.DEPLOY_ENV !== "production") return
  if (import.meta.env.VITE_GA_TRACKING_ID) return

  initializeGoogleAnalytics(import.meta.env.VITE_GA_TRACKING_ID)
}

const GoogleAnalyticsWrapper: FunctionComponent = () => {
  useEffect(() => {
    runGA()
  }, [import.meta.env.VITE_GA_TRACKING_ID])

  return <Outlet />
}

export { GoogleAnalyticsWrapper }
