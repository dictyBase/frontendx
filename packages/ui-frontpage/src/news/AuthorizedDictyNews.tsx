import { Container, Grid, makeStyles } from "@material-ui/core"
import { match, P } from "ts-pattern"
import { useListContentByNamespaceQuery } from "dicty-graphql-schema"
import { AuthorizedDictyNewsTitle } from "./AuthorizedDictyNewsTitle"
import { EmptyNewsList } from "./EmptyNewsList"
import { AuthorizedNewsList } from "./AuthorizedNewsList"
import { AuthorizedMoreNewsLink } from "./AuthorizedMoreNewsLink"
import { NewsLoader } from "./NewsLoader"

const useDictyNewsStyles = makeStyles({
  root: {},
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

const AuthorizedDictyNews = () => {
  const { root, main, newsListItem } = useDictyNewsStyles()
  const fetchState = useListContentByNamespaceQuery({
    variables: { namespace: "news" },
    fetchPolicy: "cache-and-network",
  })
  return (
    <Container className={root}>
      <Grid
        direction="column"
        spacing={1}
        container
        wrap="nowrap"
        className={main}>
        <Grid item>
          <AuthorizedDictyNewsTitle />
        </Grid>
        <Grid item className={newsListItem}>
          {match(fetchState)
            .with(
              {
                data: {
                  listContentByNamespace: [],
                },
              },
              () => <EmptyNewsList />,
            )
            .with(
              {
                data: {
                  listContentByNamespace: P.select(
                    P.array({ content: P.string }),
                  ),
                },
              },
              (contentList) => <AuthorizedNewsList contentList={contentList} />,
            )
            .with({ loading: true }, () => <NewsLoader />)
            .with({ error: P.select(P.not(undefined)) }, () => (
              <EmptyNewsList />
            ))
            .otherwise(() => (
              <> This message should not appear. </>
            ))}
        </Grid>
        <Grid item>
          <AuthorizedMoreNewsLink />
        </Grid>
      </Grid>
    </Container>
  )
}

export { AuthorizedDictyNews }
