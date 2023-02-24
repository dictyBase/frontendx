import { Container, CircularProgress } from "@material-ui/core"
import { iconStyles } from "./imageStyles"
const LoadingDisplay = () => {
  const { icons } = iconStyles()
  return (
    <Container disableGutters className={icons}>
      <CircularProgress size={56} thickness={6} />
    </Container>
  )
}

export default LoadingDisplay
