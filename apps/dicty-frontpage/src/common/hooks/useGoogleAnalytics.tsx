import React from "react"
import { useLocation } from "react-router-dom"

// useGoogleAnalytics is a hook to initialize GA tracking
// currently using a universal analytics tag
const useGoogleAnalytics = () => {
  const location = useLocation()

  React.useEffect(() => {
    const setGoogleAnalytics = async () => {
      try {
        const { default: ReactGA } = await import("react-ga4")
        console.log(ReactGA)
        const page = location.pathname + location.search
        ReactGA.initialize([{ trackingId: import.meta.env.VITE_GA_TRACKING_ID }])
        ReactGA.send({ hitType: "pageview", page })

        // also make sure to detect pageviews from bfcache
        // https://web.dev/bfcache/#how-bfcache-affects-analytics-and-performance-measurement
        window.addEventListener("pageshow", (event) => {
          if (event.persisted === true) {
            ReactGA.send({ hitType: "pageview", page })
          }
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("could not load react-ga module", JSON.stringify(error))
      }
    }
    console.log(import.meta.env.DEPLOY_ENV)
    if (import.meta.env.DEPLOY_ENV === "production") {
      setGoogleAnalytics()
    }
  }, [location.pathname, location.search])
}

export { useGoogleAnalytics }
