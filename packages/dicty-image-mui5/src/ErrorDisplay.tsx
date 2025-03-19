import BrokenImageTwoToneIcon from "@mui/icons-material/BrokenImageTwoTone"
import { SvgIcon, Container } from "@mui/material"
import { iconStyles } from "./imageStyles"

const ErrorDisplay = () => (
  <Container disableGutters className={iconStyles().icons}>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </Container>
)

export { ErrorDisplay }
