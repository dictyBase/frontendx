import { useEffect } from "react"
import { initializeGoogleAnalytics } from "@dictybase/google-analytics"

const useGoogleAnalytics = () => {
  const { VITE_GA_TRACKING_ID } = import.meta.env

  useEffect(() => {
    try {
      if (!VITE_GA_TRACKING_ID)
        throw new Error("No google analytics tracking ID provided")
      initializeGoogleAnalytics(VITE_GA_TRACKING_ID)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Could not initialize Google Analytics\n", error)
    }
  }, [VITE_GA_TRACKING_ID])
}

export { useGoogleAnalytics }
