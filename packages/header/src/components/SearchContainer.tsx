import { InputAdornment, TextField } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import headerStyles from "../styles/headerStyles"

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type KeyEvent = React.KeyboardEvent<HTMLDivElement>

type SearchContainerProps = {
  onChange: (event: ChangeEvent) => void
  onKeyPress: (event: KeyEvent) => void
}

const SearchContainer = ({onChange,onKeyPress}: SearchContainerProps) => {
  return (
    <TextField
      className={headerStyles().search}
      id="filled-basic"
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
  )
}

export default SearchContainer
