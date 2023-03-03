import { InputAdornment, TextField } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import headerStyles from "../styles/headerStyles"
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

type SearchContainerProps = { searchPath: Option<string> }
type SearchProps = { input: string; path: string }
type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type KeyEvent = React.KeyboardEvent<HTMLDivElement>

const makeURL = ({ input, path }: SearchProps) => {
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

const SearchContainer = ({ searchPath }: SearchContainerProps) => {
  const [searchInput, setsearchInput] = useState<Option<string>>(none)
  const onChange = (event: ChangeEvent) =>
    setsearchInput(of(event.target.value))
  const onKeyPress = (event: KeyEvent) => {
    if (event.key != "Enter") return
    doSearch(searchInput, searchPath)
  }
  return (
    <TextField
      className={headerStyles().search}
      id="filled-basic"
      label="Guided Search"
      variant="filled"
      onChange={onChange}
      onKeyPress={onKeyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchContainer
