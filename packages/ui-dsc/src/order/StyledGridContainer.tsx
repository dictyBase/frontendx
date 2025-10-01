import { type ReactNode } from "react"
import Grid from "@mui/material/Grid"

type StyledGridContainerProperties = {
  children: ReactNode
}

const StyledGridContainer = ({ children }: StyledGridContainerProperties) => {
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      sx={(theme) => ({
        padding: theme.spacing(0, 1, 1, 1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      })}>
      {children}
    </Grid>
  )
}

export { StyledGridContainer }
