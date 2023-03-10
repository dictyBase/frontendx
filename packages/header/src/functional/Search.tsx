import { none, Option } from "fp-ts/Option"
import SearchContainer from "../components/SearchContainer"
import useSearch from "../hook/useSearch"
import type React from "react"

type KeyEvent = React.KeyboardEvent<HTMLDivElement>
type OnKeyPress = (event: KeyEvent) => void
type SearchProperties = {
  searchPath?: Option<string>
  onKeyPressHandler?: Option<OnKeyPress>
}

const Search = ({
  searchPath = none,
  onKeyPressHandler = none,
}: SearchProperties) => {
  const { onKeyPress, onChange } = useSearch(searchPath, onKeyPressHandler)
  return <SearchContainer onKeyPress={onKeyPress} onChange={onChange} />
}

export default Search
