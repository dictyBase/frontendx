import { useState, useEffect } from "react"

/**
 * The prop for return value of {@link useWindowSize}
 */
export interface SizeProperties {
  /** window width in pixel, optional */
  width: number
  /** window height in pixel, optional */
  height: number
}

/**
 * Hook that provides the current width and height of browser window.
 * The values gets updated with the resizing of window
 *
 * @returns {@link SizeProps}
 */
export function useWindowSize(): SizeProperties {
  const [windowSize, setWindowSize] = useState<SizeProperties>({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return windowSize
}
