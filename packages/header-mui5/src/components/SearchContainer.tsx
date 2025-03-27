import { InputAdornment, TextField } from "@mui/material"
import { Search } from "@mui/icons-material"
import type { RefObject } from "react"
import { headerStyles } from "../styles/headerStyles"

type SearchContainerProperties = {
  textFieldRef: RefObject<HTMLDivElement>
}

const SearchContainer = ({ textFieldRef }: SearchContainerProperties) => (
  <form noValidate autoComplete="off" className={headerStyles().classes.search}>
    <TextField
      id="search-input"
      label="Guided Search"
      variant="filled"
      ref={textFieldRef}
      InputProps={{
        className: headerStyles().classes.searchBox,
        endAdornment: (
          <InputAdornment position="end">
            <Search className={headerStyles().classes.searchIcon} />
          </InputAdornment>
        ),
      }}
    />
  </form>
)

export { SearchContainer }
