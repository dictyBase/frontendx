import { useEffect } from "react"
import { initializeGoogleAnalytics } from "@dictybase/google-analytics"

const useGoogleAnalytics = () => {
  const { VITE_DEPLOY_ENV, VITE_GA_TRACKING_ID } = import.meta.env

  useEffect(() => {
    const runGA = () => {
      if (VITE_DEPLOY_ENV !== "production") return
      try {
        if (!VITE_GA_TRACKING_ID)
          throw new Error("No google analytics tracking ID provided")
        initializeGoogleAnalytics(VITE_GA_TRACKING_ID)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Could not initialize Google Analytics\n", error)
      }
    }
    runGA()
  }, [VITE_DEPLOY_ENV, VITE_GA_TRACKING_ID])
}

export { useGoogleAnalytics }
