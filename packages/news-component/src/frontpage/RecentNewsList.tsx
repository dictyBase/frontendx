import { Grid } from "@material-ui/core"
import RecentNewsPreview from "./RecentNewsPreview"
import useNewsListStyles from "./useNewsListStyles"

type NewsListProperties = {
  articles: {
    id: string
    name: string
    slug: string
    content: string
    updatedAt: string
  }[]
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
