import { Paper, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

type NewsPreviewProperties = {
  article: {
    id: string
    name: string
    updatedAt: string
    content: string
  }
}

const NewsPreview = ({ article }: NewsPreviewProperties) => (
  <Link to={article.id}>
    <Paper>
      <Typography variant="h2">{article.name}</Typography>
      <Typography>{article.updatedAt}</Typography>
      <Typography>{article.content}</Typography>
    </Paper>
  </Link>
)

export default NewsPreview
