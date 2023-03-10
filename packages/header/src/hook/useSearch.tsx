import {
  Option,
  of,
  alt,
  some,
  none,
  map as Omap,
  Applicative,
  getOrElse,
} from "fp-ts/Option"
import { sequence } from "fp-ts/Record"
import { pipe } from "fp-ts/function"
import { fromOption, map as IOmap } from "fp-ts/IOOption"
import {trim, Monoid } from "fp-ts/string"
import { concatAll } from "fp-ts/Monoid"
import React, { useState } from "react"

type UrlProps = { input: string; path: string }
type KeyEvent = React.KeyboardEvent<HTMLDivElement>
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type OnKeyPress = (event: KeyEvent) => void
type SearchProperties = {
  searchPath?: Option<string>
  onKeyPressHandler?: Option<OnKeyPress>
}

const makeURL = ({ input, path }: UrlProps) => {
  const strConcat = concatAll(Monoid)
  return new URL(
    strConcat([
      `${path}?query=${input}`,
      `${document.location.protocol}`,
      "//",
      `${document.location.host}`,
    ]),
  )
}
const defaultPath = () => some("/search")
const getPath = (searchPath: Option<string>) =>
  pipe(searchPath, Omap(trim), alt(defaultPath))
const setSearchURL = (url: URL) => document.location.assign(url.href)
const doSearch = (input: Option<string>, searchPath: Option<string>) =>
  pipe(
    Object.create({ input, path: getPath(searchPath) }),
    sequence(Applicative),
    Omap(makeURL),
    fromOption,
    IOmap(setSearchURL),
  )
const useSearch = ({
  searchPath = none,
  onKeyPressHandler = none,
}: SearchProperties) => {
  const [searchInput, setsearchInput] = useState<Option<string>>(none)
  const onChange = (event: ChangeEvent) =>
    setsearchInput(of(event.target.value))
  const onKeyPressDefault = (event: KeyEvent) => {
    if (event.key != "Enter") return
    doSearch(searchInput, searchPath)
  }
  const onKeyPress = pipe(
    onKeyPressHandler,
    getOrElse(() => onKeyPressDefault),
  )
  return {
    onChange,
    onKeyPress,
  }
}

export { useSearch, type SearchProperties }
