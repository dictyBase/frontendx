import { Chip, ChipProps } from "@mui/material"

const SearchTerm = ({ ...rest }: ChipProps) => (
  <Chip
    {...rest}
    size="medium"
    color="primary"
    sx={{
      marginRight: "5px",
      backgroundColor: "primary.main",
    }}
  />
)

export { SearchTerm }
