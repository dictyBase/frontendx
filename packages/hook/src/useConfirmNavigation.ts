import { useEffect } from "react"

const handler = (event: BeforeUnloadEvent) => {
  event.preventDefault()
}
/*
 * Adds a `beforeunload` listener that is triggered when a user attempts to navigate away from the page.
 * When the event fires, the handler causes a dialog to appear that confirms the user is about to leave the
 * current page and lose any unsaved information.
 *
 * note: This does not include navigation that is handled by `react-router-dom`
 */
const useConfirmNavigation = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", handler)
    return () => {
      window.removeEventListener("beforeunload", handler)
    }
  }, [])
}

export { useConfirmNavigation }
