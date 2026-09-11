import { Paper, InputBase } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

type SearchInputProperties = {
  anchorRef: React.RefObject<HTMLDivElement>
  inputValue: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus: () => void
}

const SearchInput = ({
  anchorRef,
  inputValue,
  onChange,
  onKeyDown,
  onFocus,
}: SearchInputProperties) => (
  <Paper
    ref={anchorRef}
    elevation={2}
    sx={{
      position: "relative",
      zIndex: 1250,
      display: "flex",
      alignItems: "center",
      borderRadius: "12px",
      height: 70,
      px: 2,
      py: 0.5,
    }}>
    <SearchIcon sx={{ color: "#a0aec0", ml: 1, mr: 0.5 }} />
    <InputBase
      fullWidth
      placeholder="Search strains and plasmids"
      value={inputValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      sx={{ fontSize: "1.25rem", py: 0.5 }}
      inputProps={{ "aria-label": "search strains and plasmids" }}
    />
  </Paper>
)

export { SearchInput }
