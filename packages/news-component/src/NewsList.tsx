import type { Content } from "dicty-graphql-schema"
import { Grid } from "@material-ui/core"
import NewsItem from "./NewsItem"
import useNewsListStyles from "./useNewsListStyles"

type NewsListProperties = {
  articles: Content[]
}

const NewsList = ({ articles }: NewsListProperties) => {
  const { root } = useNewsListStyles()

  return (
    <Grid container direction="column" spacing={1} className={root}>
      {articles.map((article) => (
        <Grid item>
          <NewsItem article={article} />
        </Grid>
      ))}
    </Grid>
  )
}

export default NewsList
