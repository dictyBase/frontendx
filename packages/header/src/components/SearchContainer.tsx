import React from "react"
import { InputAdornment, TextField } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import headerStyles from "../styles/headerStyles"

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type KeyEvent = React.KeyboardEvent<HTMLDivElement>

type SearchContainerProperty = {
  onChange: (event: ChangeEvent) => void
  onKeyPress: (event: KeyEvent) => void
}

const SearchContainer = ({ onChange, onKeyPress }: SearchContainerProperty) => (
  <form noValidate autoComplete="off" className={headerStyles().search}>
    <TextField
      id="search-input"
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
  </form>
)

export default SearchContainer
