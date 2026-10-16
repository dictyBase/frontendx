import { Paper, InputBase, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

type SearchInputProperties = {
  anchorRef: React.RefObject<HTMLDivElement>
  inputValue: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus: () => void
  onSearch: () => void
}

const SearchInput = ({
  anchorRef,
  inputValue,
  onChange,
  onKeyDown,
  onFocus,
  onSearch,
}: SearchInputProperties) => (
  <Paper
    ref={anchorRef}
    elevation={2}
    sx={{
      position: "relative",
      backgroundColor: "white",
      zIndex: 1250,
      display: "flex",
      alignItems: "center",
      borderRadius: "12px",
      height: 70,
      px: 2,
      py: 0.5,
    }}>
    <InputBase
      fullWidth
      placeholder="Enter 3 or more characters to search strains and plasmids"
      value={inputValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      sx={{ fontSize: "1.25rem", py: 0.5, pl: 1 }}
      inputProps={{ "aria-label": "search strains and plasmids" }}
    />
    <IconButton
      onClick={onSearch}
      aria-label="submit search"
      sx={(theme) => ({
        backgroundColor: theme.palette.tertiary.main,
        color: theme.palette.tertiary.contrastText,
        borderRadius: "8px",
        p: 1.5,
        "&:hover": { backgroundColor: theme.palette.tertiary.dark },
      })}>
      <SearchIcon />
    </IconButton>
  </Paper>
)

export { SearchInput }
