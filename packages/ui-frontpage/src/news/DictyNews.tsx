import { Container, Grid, makeStyles } from "@material-ui/core"
import { ListContentByNamespaceQueryHookResult } from "dicty-graphql-schema"
import { DictyNewsTitle } from "./DictyNewsTitle"
import { MoreNewsLink } from "./MoreNewsLink"
import { DictyNewsContent } from "./DictyNewsContent"

const useDictyNewsStyles = makeStyles({
  main: {
    height: "440px",
  },
  top: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  middle: {
    boxShadow: "inset 0px -2px",
  },
  bottom: {
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  newsListItem: {
    overflow: "auto",
    flexGrow: 1,
  },
})

type DictyNewsProperties = {
  queryResult: ListContentByNamespaceQueryHookResult
}

const DictyNews = ({ queryResult }: DictyNewsProperties) => {
  const { main, newsListItem } = useDictyNewsStyles()
  return (
    <Container>
      <Grid
        direction="column"
        spacing={1}
        container
        wrap="nowrap"
        className={main}>
        <Grid item>
          <DictyNewsTitle />
        </Grid>
        <Grid item className={newsListItem}>
          <DictyNewsContent queryResult={queryResult} />
        </Grid>
        <Grid item>
          <MoreNewsLink />
        </Grid>
      </Grid>
    </Container>
  )
}

export { DictyNews }
