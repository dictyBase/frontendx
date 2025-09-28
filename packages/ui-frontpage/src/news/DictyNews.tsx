import { Container, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import { ListContentByNamespaceQueryHookResult } from "dicty-graphql-schema"
import { DictyNewsTitle } from "./DictyNewsTitle"
import { MoreNewsLink } from "./MoreNewsLink"
import { DictyNewsContent } from "./DictyNewsContent"

const MainGrid = styled(Grid)({
  height: "440px",
})

const NewsListItemGrid = styled(Grid)({
  overflow: "auto",
  flexGrow: 1,
})

type DictyNewsProperties = {
  queryResult: ListContentByNamespaceQueryHookResult
}

const DictyNews = ({ queryResult }: DictyNewsProperties) => (
  <Container>
    <MainGrid direction="column" spacing={1} container wrap="nowrap">
      <Grid item>
        <DictyNewsTitle />
      </Grid>
      <NewsListItemGrid item>
        <DictyNewsContent queryResult={queryResult} />
      </NewsListItemGrid>
      <Grid item>
        <MoreNewsLink />
      </Grid>
    </MainGrid>
  </Container>
)

export { DictyNews }
