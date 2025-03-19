import { Container, CircularProgress } from "@mui/material"
import { iconStyles } from "./imageStyles"

const LoadingDisplay = () => {
  const { icons } = iconStyles()
  return (
    <Container disableGutters className={icons}>
      <CircularProgress size={56} thickness={6} />
    </Container>
  )
}

export { LoadingDisplay }
