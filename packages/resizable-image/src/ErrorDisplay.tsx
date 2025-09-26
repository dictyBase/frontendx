import BrokenImageTwoToneIcon from "@mui/icons-material/BrokenImageTwoTone"
import { SvgIcon } from "@mui/material"
import { StyledIconContainer } from "./StyledIconContainer"

/**
 * A component to display an error message with an icon
 *
 * @param {Object} props - The component props
 * @param {SxProps} props.sx - The sx prop for styling
 * @returns {JSX.Element} - The rendered error component
 */
const ErrorDisplay = () => (
  <StyledIconContainer disableGutters>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </StyledIconContainer>
)

export { ErrorDisplay }
