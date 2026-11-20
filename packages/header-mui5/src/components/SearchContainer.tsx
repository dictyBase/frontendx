import { Box, InputAdornment, TextField } from "@mui/material"
import { Search } from "@mui/icons-material"
import type { RefObject } from "react"
import { headerStyles } from "../styles/headerStyles"

type SearchContainerProperties = {
  textFieldRef: RefObject<HTMLDivElement | null>
}

const SearchContainer = ({ textFieldRef }: SearchContainerProperties) => (
  <Box component="form" noValidate autoComplete="off" sx={headerStyles.search}>
    <TextField
      id="search-input"
      label="Guided Search"
      variant="filled"
      ref={textFieldRef}
      InputProps={{
        sx: headerStyles.searchBox,
        endAdornment: (
          <InputAdornment position="end">
            <Search sx={headerStyles.searchIcon} />
          </InputAdornment>
        ),
      }}
    />
  </Box>
)

export { SearchContainer }
