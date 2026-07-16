import { useState, useEffect } from "react"
import { Fab } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

type ScrollToTopProperties = {
  /** Scroll threshold in pixels before button appears (default: 300) */
  threshold?: number
  /** Scroll behavior when clicking button (default: 'smooth') */
  behavior?: ScrollBehavior
}

/**
 * ScrollToTop is a floating action button that appears when the user scrolls
 * past a threshold and allows them to smoothly scroll back to the top of the page.
 */
const ScrollToTop = ({
  threshold = 300,
  behavior = "smooth",
}: ScrollToTopProperties) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior })
  }

  if (!isVisible) return <></>

  return (
    <Fab
      color="primary"
      aria-label="scroll to top"
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        transition: "all 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}>
      <KeyboardArrowUpIcon />
    </Fab>
  )
}

export { ScrollToTop }
