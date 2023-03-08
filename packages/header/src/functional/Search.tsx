import {
  Option,
  alt,
  some,
  none,
  of,
  map as Omap,
  Applicative,
} from "fp-ts/Option"
import { trim } from "fp-ts/string"
import { sequence } from "fp-ts/Record"
import { pipe } from "fp-ts/function"
import { fromOption, map as IOmap } from "fp-ts/IOOption"
import { Monoid } from "fp-ts/string"
import { concatAll } from "fp-ts/Monoid"
import React, { useState } from "react"
import SearchContainer from "../components/SearchContainer"

type SearchProps = { searchPath?: Option<string> }
type UrlProps = { input: string; path: string }
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type KeyEvent = React.KeyboardEvent<HTMLDivElement>

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

const Search = ({ searchPath = none }: SearchProps) => {
  const [searchInput, setsearchInput] = useState<Option<string>>(none)
  const onChange = (event: ChangeEvent) =>
    setsearchInput(of(event.target.value))
  const onKeyPress = (event: KeyEvent) => {
    if (event.key != "Enter") return
    doSearch(searchInput, searchPath)
  }
  return <SearchContainer onKeyPress={onKeyPress} onChange={onChange} />
}

export default Search
