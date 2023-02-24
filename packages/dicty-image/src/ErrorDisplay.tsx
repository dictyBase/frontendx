import BrokenImageTwoToneIcon from "@material-ui/icons/BrokenImageTwoTone"
import { SvgIcon, Container } from "@material-ui/core"
import { iconStyles } from "./imageStyles"

const ErrorDisplay = () => (
  <Container disableGutters className={iconStyles().icons}>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </Container>
)

export default ErrorDisplay
