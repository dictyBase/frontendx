import { InputAdornment, TextField } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import headerStyles from "../styles/headerStyles"
import type { RefObject } from "react"

type SearchContainerProps = {
  textFieldRef: RefObject<HTMLDivElement>
}

const SearchContainer = ({ textFieldRef }: SearchContainerProps) => (
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
