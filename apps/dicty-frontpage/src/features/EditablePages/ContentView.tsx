import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"

type ContentViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const ContentView = ({ data }: ContentViewProperties) => (
  <Container>
    <Editor
      editable={false}
      content={{ storageKey: data.slug, editorState: data.content }}
    />
  </Container>
)

export { ContentView }
