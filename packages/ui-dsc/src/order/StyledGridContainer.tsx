import { type ReactNode } from "react"
import Grid from "@mui/material/Grid"
import { type Theme } from "@mui/material"

type StyledGridContainerProperties = {
  children: ReactNode
}

const StyledGridContainer = ({ children }: StyledGridContainerProperties) => (
  <Grid
    container
    justifyContent="center"
    direction="column"
    sx={(theme: Theme) => ({
      padding: theme.spacing(0, 1, 1, 1),
      marginTop: 2,
      marginBottom: 2,
    })}>
    {children}
  </Grid>
)

export { StyledGridContainer }
