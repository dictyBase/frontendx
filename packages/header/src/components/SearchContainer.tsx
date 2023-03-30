import { InputAdornment, TextField } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import type { RefObject } from "react"
import headerStyles from "../styles/headerStyles"

type SearchContainerProperties = {
  textFieldRef: RefObject<HTMLDivElement>
}

const SearchContainer = ({ textFieldRef }: SearchContainerProperties) => (
  <form noValidate autoComplete="off" className={headerStyles().search}>
    <TextField
      id="search-input"
      label="Guided Search"
      variant="filled"
      ref={textFieldRef}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  </form>
)

export default SearchContainer
