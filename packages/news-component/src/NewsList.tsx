import { Grid } from "@material-ui/core"
import { ListNewsContentQuery } from "dicty-graphql-schema"
import NewsPreview from "./NewsPreview"

type NewsListProperties = {
  articles: ListNewsContentQuery["listContent"]
  selectable: boolean
}

/**
 * Renders a list of news articles.
 * @returns
 */
const NewsList = ({ articles, selectable }: NewsListProperties) => {
  if (!articles) return <div> Fallback </div>

  return (
    <>
      {articles.map((article) => (
        <Grid item key={article.slug}>
          <NewsPreview article={article} selectable={selectable} />
        </Grid>
      ))}
    </>
  )
}

export default NewsList
