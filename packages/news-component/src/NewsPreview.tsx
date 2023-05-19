import { Paper, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { parseContentToText } from "dicty-editor"
import useNewsPreviewStyles from "./useNewsPreviewStyles"

type NewsPreviewProperties = {
  article: {
    id: string
    name: string
    updatedAt: string
    content: string
  }
}

const NewsPreview = ({ article }: NewsPreviewProperties) => {
  const { root } = useNewsPreviewStyles()
  const previewText = `${parseContentToText(article.content).slice(0, 250)}...`

  return (
    <Link to={article.id}>
      <Paper className={root}>
        <Typography variant="h2">{article.name}</Typography>
        <Typography>{article.updatedAt}</Typography>
        <Typography>{previewText}</Typography>
      </Paper>
    </Link>
  )
}

export default NewsPreview
