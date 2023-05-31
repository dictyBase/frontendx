import { useEffect } from "react"
import { Grid, Container } from "@material-ui/core"
import { useListNewsContentQuery } from "dicty-graphql-schema"
import NewsList from "./NewsList"
import NewsHeader from "./NewsHeader"
import NewsToolbar from "./Toolbar"
/**
 * Renders a list of news articles.
 * @returns
 */
const BrowseNews = () => {
  const { loading, error, data, refetch } = useListNewsContentQuery({
    variables: { limit: 20 },
  })
  useEffect(() => {
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
        {data?.listContent ? <NewsList articles={data?.listContent} /> : <></>}
      </Grid>
    </Container>
  )
}

export default BrowseNews
