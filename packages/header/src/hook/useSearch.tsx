import {
  Option,
  of,
  some,
  none,
  map as Omap,
  getOrElse,
  fold,
} from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { trim, Monoid } from "fp-ts/string"
import { concatAll } from "fp-ts/Monoid"
import React, { useState } from "react"

type KeyEvent = React.KeyboardEvent<HTMLDivElement>
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type SearchProperties = {
  input: string
  path: string
}
type SearchHandler = (props: SearchProperties) => void
type HandlerProperties = {
  searchPath: Option<string>
  searchInput: Option<string>
  searchHandler: Option<SearchHandler>
  event: KeyEvent
}

const voidFn = () => {}

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

const defaultSearch = (props: SearchProperties) =>
  pipe(props, makeURL, setSearchURL)

const isEnterKey = (event: KeyEvent) =>
  event.key === "Enter" ? some("Enter") : none

const handler = ({
  searchPath,
  searchHandler,
  searchInput,
  event,
}: HandlerProperties) => {
  const handlerPipe = (input: string) => {
    const path = getPath(searchPath)
    pipe(
      searchHandler,
      fold(
        () => defaultSearch({ input, path }),
        (cb) => cb({ input, path }),
      ),
    )
  }

  const inputPipe = () =>
    pipe(
      searchInput,
      fold(
        () => voidFn(),
        (input) => handlerPipe(input),
      ),
    )

  const eventPipe = () =>
    pipe(
      of(event),
      Omap(isEnterKey),
      fold(
        () => voidFn(),
        () => inputPipe(),
      ),
    )
  eventPipe()
}

const useSearch = (
  searchPath: Option<string> = none,
  searchHandler: Option<SearchHandler> = none,
) => {
  const [searchInput, setsearchInput] = useState<Option<string>>(none)
  const onChange = (event: ChangeEvent) =>
    setsearchInput(of(event.target.value))

  const onKeyPress = (event: KeyEvent) =>
    handler({ searchPath, searchHandler, searchInput, event })

  return {
    onChange,
    onKeyPress,
  }
}

export default useSearch
