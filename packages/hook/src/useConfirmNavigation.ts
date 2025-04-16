import { useEffect } from "react"

const useConfirmNavigation = () => {
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
    }
    window.addEventListener("beforeunload", handler)
    return () => {
      window.removeEventListener("beforeunload", handler)
    }
  }, [])
}

export { useConfirmNavigation }
