import { Chip, ChipProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: "5px",
  backgroundColor: theme.palette.primary.main,
}))

const SearchTerm = ({ ...rest }: ChipProps) => (
  <StyledChip {...rest} size="medium" color="primary" />
)

export { SearchTerm }
