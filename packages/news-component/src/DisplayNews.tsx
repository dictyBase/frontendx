import { Grid, Typography } from "@material-ui/core"
import { Editor } from "@dictybase/editor"
import { formatDateISOString } from "./utils"

type DisplayNewsProperties = {
  content: {
    id: string
    name: string
    content: string
    updatedAt: string
    slug: string
  }
}

const DisplayNews = ({ content }: DisplayNewsProperties) => (
  <Grid container direction="column" spacing={1}>
    <Grid item>
      <Typography>{formatDateISOString(content.updatedAt)}</Typography>
    </Grid>
    <Grid item>
      <Typography variant="h1">{content.name}</Typography>
    </Grid>
    <Grid item>
      <Editor
        editable={false}
        content={{
          storageKey: content.slug,
          editorState: content.content,
        }}
      />
    </Grid>
  </Grid>
)

export { DisplayNews }
