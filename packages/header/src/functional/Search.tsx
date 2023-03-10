import { none } from "fp-ts/Option"
import SearchContainer from "../components/SearchContainer"
import { useSearch, type SearchProperties } from "../hook/useSearch"

const Search = ({
  searchPath = none,
  onKeyPressHandler = none,
}: SearchProperties) => {
  const { onKeyPress, onChange } = useSearch({ searchPath, onKeyPressHandler })
  return <SearchContainer onKeyPress={onKeyPress} onChange={onChange} />
}

export default Search
