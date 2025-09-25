import BrokenImageTwoToneIcon from "@mui/icons-material/BrokenImageTwoTone"
import { SvgIcon, Container } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"

/**
 * A component to display an error message with an icon
 *
 * @param {Object} props - The component props
 * @param {SxProps} props.sx - The sx prop for styling
 * @returns {JSX.Element} - The rendered error component
 */
const ErrorDisplay = ({ sx }: { sx: SxProps<Theme> }) => (
  <Container disableGutters sx={sx}>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </Container>
)

export { ErrorDisplay }
