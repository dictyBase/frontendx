import { type ReactNode } from "react"
import Grid from "@material-ui/core/Grid"
import { type Theme, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(0, 1, 1, 1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

type StyledGridContainerProperties = {
  children: ReactNode
}

const StyledGridContainer = ({ children }: StyledGridContainerProperties) => {
  const { container } = useStyles()
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      className={container}>
      {children}
    </Grid>
  )
}

export { StyledGridContainer }
