import { Container, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import { ListContentByNamespaceQueryHookResult } from "dicty-graphql-schema"
import { AuthorizedDictyNewsTitle } from "./AuthorizedDictyNewsTitle"
import { AuthorizedMoreNewsLink } from "./AuthorizedMoreNewsLink"
import { AuthorizedDictyNewsContent } from "./AuthorizedDictyNewsContent"

const MainGrid = styled(Grid)({
  height: "440px",
})

const NewsListItemGrid = styled(Grid)({
  overflow: "auto",
  flexGrow: 1,
})

type AuthorizedDictyNewsProperties = {
  queryResult: ListContentByNamespaceQueryHookResult
}

const AuthorizedDictyNews = ({
  queryResult,
}: AuthorizedDictyNewsProperties) => (
  <Container>
    <MainGrid direction="column" spacing={1} container wrap="nowrap">
      <Grid item>
        <AuthorizedDictyNewsTitle />
      </Grid>
      <NewsListItemGrid item>
        <AuthorizedDictyNewsContent queryResult={queryResult} />
      </NewsListItemGrid>
      <Grid item>
        <AuthorizedMoreNewsLink />
      </Grid>
    </MainGrid>
  </Container>
)

export { AuthorizedDictyNews }
