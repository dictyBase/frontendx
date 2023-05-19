import { Container, Typography } from "@material-ui/core"
import { Editor } from "dicty-editor"

type DisplayNewsProperties = {
  data: {
    name: string
    content: string
    updatedAt: string
    slug: string
  }
}

const DisplayNews = ({ data }: DisplayNewsProperties) => {
  if (!data) return <div> Fallback </div>

  return (
    <Container>
      <Typography variant="h1">{data.name}</Typography>
      <Typography>{data.updatedAt}</Typography>
      <Editor
        editable={false}
        content={{
          storageKey: data.slug,
          editorState: data.content,
        }}
      />
    </Container>
  )
}

export default DisplayNews
