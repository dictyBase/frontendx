import { useEffect } from "react"
import { Grid, Container } from "@material-ui/core"
import { useListNewsContentQuery } from "dicty-graphql-schema"
import { useAtomValue, useSetAtom } from "jotai"
import { articlesInRangeAtom, articlesListTotalAtom } from "./atomConfigs"
import NewsList from "./NewsList"
import NewsHeader from "./NewsHeader"
import NewsToolbar from "./Toolbar"
import Pagination from "./Pagination"
/**
 * Renders a list of news articles.
 * @returns
 */
const BrowseNews = () => {
  const articlesInRange = useAtomValue(articlesInRangeAtom)
  const setTotalArticles = useSetAtom(articlesListTotalAtom)
  const { loading, error, data, refetch } = useListNewsContentQuery()

  useEffect(() => {
    setTotalArticles(data?.listContent?.length || 0)
    refetch()
  })

  if (error) return <div> Error </div>
  if (loading) return <div> Loading </div>
  if (!data) return <div> Fallback </div>

  return (
    <Container>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <NewsHeader />
        </Grid>
        <Grid item>
          <NewsToolbar />
        </Grid>
        {error ? <div> Error </div> : <></>}
        {loading ? <div> Loading </div> : <></>}
        {data?.listContent ? (
          <NewsList
            articles={data?.listContent.slice(
              articlesInRange[0],
              articlesInRange[1],
            )}
          />
        ) : (
          <></>
        )}
        {data?.listContent ? (
          <Grid item>
            <Pagination />
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  )
}

export default BrowseNews
