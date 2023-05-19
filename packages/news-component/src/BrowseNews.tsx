import { Grid, Container, Typography } from "@material-ui/core"
import { useListNewsContentQuery } from "dicty-graphql-schema"
import NewsPreview from "./NewsPreview"

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
          <Typography gutterBottom align="center" variant="h1">
            Dicty News
          </Typography>
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
