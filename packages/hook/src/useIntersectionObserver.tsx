import { useEffect, useRef, RefObject } from "react"

/**
* @typedef UseIntersectionObserverProps -The props type for {@link useIntersectionObserver}
* @see {@link The parameters are given [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#properties}
*/
export interface useIntersectionObserverProps {
  /** The target DOM object that will be observed*/
  target: RefObject<Element>,
  /** The option object passed to Intersection observer construct*/
  option?: IntersectionObserverInit,
  /** Callback to handle the intersection.
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#parameters} */
  onIntersection: IntersectionObserverCallback
}

/**
* Creates a new intersection observer on the given target.
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API}
*/
export function useIntersectionObserver({ target, option, onIntersection }: useIntersectionObserverProps): void {
  const observerRef = useRef<IntersectionObserver>()
  // set up the intersection observer
  useEffect(() => {
    if (!target.current) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(onIntersection, option)
    observerRef.current.observe(target.current)
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [option, target, onIntersection])
}
