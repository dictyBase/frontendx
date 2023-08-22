import { FunctionComponent } from "react"
import { Container, Grid } from "@material-ui/core"
import { NewsHeader } from "./NewsHeader"
import { NewsToolbar } from "./Toolbar"

type NewsLayoutProperties = {
  isAuthenticated?: boolean
}

const NewsLayoutWrapper = (
  WrappedComponent: FunctionComponent<{ isAuthenticated: boolean }>,
) =>
  function NewsLayout({ isAuthenticated = false }: NewsLayoutProperties) {
    return (
      <Container>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <NewsHeader />
          </Grid>
          <Grid item>{isAuthenticated ? <NewsToolbar /> : <></>}</Grid>
          <Grid item>
            <WrappedComponent isAuthenticated={isAuthenticated} />
          </Grid>
        </Grid>
      </Container>
    )
  }

export { NewsLayoutWrapper }
