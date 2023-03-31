import { Option, map as Omap, getOrElse } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { trim, Monoid } from "fp-ts/string"
import { concatAll } from "fp-ts/Monoid"

type SearchProperties = {
  input: string
  path: string
}
type SearchHandler = (properties: SearchProperties) => void
type HandlerProperties = {
  path: Option<string>
  searchCallback: Option<SearchHandler>
}

const setSearchURL = (url: URL) => window.location.assign(url.href)

const makeURL = ({ input, path }: SearchProperties) =>
  new URL(
    `${path}?query=${input}`,
    concatAll(Monoid)([
      document.location.protocol,
      "//",
      document.location.host,
    ]),
  )

const getPath = (searchPath: Option<string>) =>
  pipe(
    searchPath,
    Omap(trim),
    getOrElse(() => "/search"),
  )

const defaultSearch = (properties: SearchProperties) =>
  pipe(properties, makeURL, setSearchURL)

const getSearchHandler = (searchHandler: Option<SearchHandler>) =>
  pipe(
    searchHandler,
    getOrElse(() => defaultSearch),
  )

const handler =
  ({ path, searchCallback }: HandlerProperties) =>
  (input: string) =>
    pipe({ input, path: getPath(path) }, getSearchHandler(searchCallback))

export { type SearchHandler, handler }
