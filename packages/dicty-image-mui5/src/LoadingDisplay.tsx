import { Container, CircularProgress } from "@mui/material"
import { useIconStyles } from "./imageStyles"

const LoadingDisplay = () => {
  const { classes } = useIconStyles()
  return (
    <Container disableGutters className={classes.icons}>
      <CircularProgress size={56} thickness={6} />
    </Container>
  )
}

export { LoadingDisplay }
