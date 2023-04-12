import { Container, CircularProgress } from "@material-ui/core"

const LoadingDisplay = ({ className }: { className: string }) => (
  <Container disableGutters className={className}>
    <CircularProgress size={56} thickness={6} />
  </Container>
)

export default LoadingDisplay
