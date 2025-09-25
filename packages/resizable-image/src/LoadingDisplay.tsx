import { Container, CircularProgress } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"

const LoadingDisplay = ({ sx }: { sx: SxProps<Theme> }) => (
  <Container disableGutters sx={sx}>
    <CircularProgress size={56} thickness={6} />
  </Container>
)

export { LoadingDisplay }
