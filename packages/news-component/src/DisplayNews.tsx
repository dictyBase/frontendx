import { Grid, Container, Typography } from "@material-ui/core"
import { Editor } from "dicty-editor"
import NewsHeader from "./NewsHeader"
import { formatDateISOString } from "./utils"
import DeleteButton from "./DeleteButton"

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
  <Container>
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <NewsHeader button={<DeleteButton id={content.id} />} />
      </Grid>
      <Grid item>
        <Typography variant="h1">{content.name}</Typography>
      </Grid>
      <Grid item>
        <Typography>{formatDateISOString(content.updatedAt)}</Typography>
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
  </Container>
)

export default DisplayNews
