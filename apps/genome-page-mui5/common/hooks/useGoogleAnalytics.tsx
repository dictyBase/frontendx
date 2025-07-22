import { useEffect } from "react"
import { initializeGoogleAnalytics } from "@dictybase/google-analytics"

const useGoogleAnalytics = () => {
  useEffect(() => {
    const runGA = () => {
      if (process.env.NEXT_PUBLIC_DEPLOY_ENV !== "production") return
      try {
        if (!process.env.NEXT_PUBLIC_GA_TRACKING_ID)
          throw new Error("No google analytics tracking ID provided")
        initializeGoogleAnalytics(process.env.NEXT_PUBLIC_GA_TRACKING_ID)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Could not initialize Google Analytics\n", error)
      }
    }
    runGA()
  }, [])
}

export { useGoogleAnalytics }
