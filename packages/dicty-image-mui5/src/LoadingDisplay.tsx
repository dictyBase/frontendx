import { Container, CircularProgress } from "@mui/material"
import { iconStyles } from "./imageStyles"

const LoadingDisplay = () => (
  <Container disableGutters sx={iconStyles}>
    <CircularProgress size={56} thickness={6} />
  </Container>
)

export { LoadingDisplay }
