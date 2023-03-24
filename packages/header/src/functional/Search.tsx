import { none, Option } from "fp-ts/Option"
import SearchContainer from "../components/SearchContainerWithRxjs"
import useSearch from "../hook/useSearchWithRx"
import type { SearchHandler} from "../helper/searchManagement"

type SearchProperties = {
  searchPath?: Option<string>
  onKeyPressHandler?: Option<SearchHandler>
}

const Search = ({
  searchPath = none,
  onKeyPressHandler = none,
}: SearchProperties) => {
  const textFieldRef = useSearch(searchPath, onKeyPressHandler)
  return <SearchContainer textFieldRef={textFieldRef} />
}

export default Search
