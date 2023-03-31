import { useRef, useEffect } from "react"
import { Option, none } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { type SearchHandler, handler } from "../helper/searchManagement"
import obsToSubs from "../helper/searchObserver"

const useSearch = (
  searchPath: Option<string> = none,
  searchHandler: Option<SearchHandler> = none,
) => {
  const textReference = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const subscriber = obsToSubs(textReference).subscribe(
      (input) =>
        input &&
        pipe(
          input,
          handler({ path: searchPath, searchCallback: searchHandler }),
        ),
    )
    return () => {
      subscriber.unsubscribe()
    }
  }, [searchPath, searchHandler])
  return textReference
}

export default useSearch
