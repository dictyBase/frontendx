import { Paper, Typography, Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import { ListNewsContentQuery } from "dicty-graphql-schema"
import { parseContentToText } from "dicty-editor"
import useRecentNewsPreviewStyles from "./useRecentNewsPreviewStyles"
import { formatDateISOString } from "../utils"

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type NewsPreviewProperties = {
  article: ArrayElement<NonNullable<ListNewsContentQuery["listContent"]>>
}

const RecentNewsPreview = ({ article }: NewsPreviewProperties) => {
  const { root } = useRecentNewsPreviewStyles()
  const previewText = `${parseContentToText(article.content).slice(0, 250)}...`

  return (
    <Paper className={root}>
      <Grid container direction="row" wrap="nowrap">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link to={`/news/${article.slug}`}>
                <Typography variant="h2">{article.name}</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Typography>{formatDateISOString(article.updatedAt)}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>{`by ${article.updatedBy.firstName} ${article.updatedBy.lastName}`}</Typography>
          </Grid>
          <Typography>{previewText}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RecentNewsPreview
