import { Paper, Typography, Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import { parseContentToText } from "dicty-editor"
import useRecentNewsPreviewStyles from "./useRecentNewsPreviewStyles"
import { formatDateISOString } from "../utils"

type NewsPreviewProperties = {
  article: {
    id: string
    slug: string
    name: string
    updatedAt: string
    content: string
  }
}

const RecentNewsPreview = ({ article }: NewsPreviewProperties) => {
  const { root } = useRecentNewsPreviewStyles()
  const previewText = `${parseContentToText(article.content).slice(0, 250)}...`

  return (
    <Paper className={root}>
      <Grid container direction="row" wrap="nowrap">
        <Grid item>
          <>
            <Link to={`/news/${article.slug}`}>
              <Typography variant="h2">{article.name}</Typography>
            </Link>
            <Typography>{formatDateISOString(article.updatedAt)}</Typography>
          </>
          <Typography>{previewText}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RecentNewsPreview
