import { Grid, Container } from "@material-ui/core"
import { useListNewsContentQuery } from "dicty-graphql-schema"
import NewsPreview from "./NewsPreview"
import NewsHeader from "./NewsHeader"

/**
 * Renders a list of news articles.
 * @returns
 */
const BrowseNews = () => {
  const { loading, error, data } = useListNewsContentQuery()

  if (error) return <div> Error </div>
  if (loading) return <div> Loading </div>
  if (!data) return <div> Fallback </div>

  return (
    <Container>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <NewsHeader />
        </Grid>
        {data.listContent?.map((article) => (
          <Grid item>
            <NewsPreview article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default BrowseNews
