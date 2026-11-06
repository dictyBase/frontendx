import { useEffect } from "react"
import { initializeGoogleAnalytics } from "./initializeGoogleAnalytics"

const useGoogleAnalytics = (trackingId: string) => {
  useEffect(() => {
    try {
      if (!trackingId)
        throw new Error("No google analytics tracking ID provided")
      initializeGoogleAnalytics(trackingId)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Could not initialize Google Analytics\n", error)
    }
  }, [trackingId])
}

export { useGoogleAnalytics }
