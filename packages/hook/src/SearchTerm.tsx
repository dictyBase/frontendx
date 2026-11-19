import { Chip, ChipProps } from "@mui/material"
import { capitalizeFirst } from "./utils"

const SearchTerm = ({ label, ...rest }: ChipProps) => (
  <Chip
    {...rest}
    label={capitalizeFirst(label as string)}
    size="medium"
    color="primary"
    sx={{
      marginRight: "5px",
      backgroundColor: "primary.main",
    }}
  />
)

export { SearchTerm }
