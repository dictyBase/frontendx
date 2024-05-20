import { Paper, Typography, Grid } from "@material-ui/core"
import { ListNewsContentQuery } from "dicty-graphql-schema"
import { parseContentToText } from "@dictybase/editor"
import { RecentNewsPreviewMetadata } from "./RecentNewsPreviewMetadata"
import { useRecentNewsPreviewStyles } from "./useRecentNewsPreviewStyles"

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
      <Grid container direction="column" wrap="nowrap">
        <Grid item>
          <RecentNewsPreviewMetadata
            slug={article.slug}
            name={article.name}
            updatedBy={article.updated_by}
            updatedAt={article.updated_at}
          />
        </Grid>
        <Grid item>
          <Typography>{previewText}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { RecentNewsPreview }
