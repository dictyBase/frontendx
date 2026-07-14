import { useEffect } from "react"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"

type UseScrollPersistenceProperties = {
  /** Storage key for scroll position (default: 'catalogScrollPos') */
  storageKey?: string
  /** Enable/disable scroll persistence (default: true) */
  enabled?: boolean
}

/**
 * useScrollPersistence hook saves and restores the scroll position
 * using sessionStorage. The scroll position is saved before the page
 * unloads and restored when the component mounts.
 *
 * @example
 * ```tsx
 * const MyCatalog = () => {
 *   useScrollPersistence({ storageKey: 'strainCatalogScroll' })
 *   return <div>...</div>
 * }
 * ```
 */
const useScrollPersistence = ({
  storageKey = "catalogScrollPos",
}: UseScrollPersistenceProperties = {}) => {
  useEffect(() => {
    // Restore scroll position on mount
    const restoreScrollPosition = () => {
      const savedPosition = pipe(
        sessionStorage.getItem(storageKey),
        OfromNullable,
        Omap((value) => Number.parseInt(value, 10)),
        OgetOrElse(() => 0),
      )

      if (savedPosition > 0) {
        window.scrollTo(0, savedPosition)
      }
    }

    // Save scroll position before unload
    const saveScrollPosition = () => {
      sessionStorage.setItem(storageKey, String(window.scrollY))
    }

    // Restore on mount
    restoreScrollPosition()

    // Save on beforeunload
    window.addEventListener("beforeunload", saveScrollPosition)
    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition)
    }
  }, [storageKey])
}

export { useScrollPersistence }
