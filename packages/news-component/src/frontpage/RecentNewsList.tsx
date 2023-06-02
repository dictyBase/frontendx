import { Grid } from "@material-ui/core"
import { ListNewsContentQuery } from "dicty-graphql-schema"
import RecentNewsPreview from "./RecentNewsPreview"
import useNewsListStyles from "./useNewsListStyles"

type NewsListProperties = {
  articles: NonNullable<ListNewsContentQuery["listContent"]>
}

const RecentNewsList = ({ articles }: NewsListProperties) => {
  const { root } = useNewsListStyles()

  return (
    <Grid container direction="column" spacing={1} className={root}>
      {articles.map((article) => (
        <Grid key={article.slug} item>
          <RecentNewsPreview article={article} />
        </Grid>
      ))}
    </Grid>
  )
}

export default RecentNewsList
