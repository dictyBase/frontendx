import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"
import { EditButton } from "./EditButton"

type EditableViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditableView = ({ data }: EditableViewProperties) => (
  <Container>
    <Editor
      editable={false}
      content={{ storageKey: data.slug, editorState: data.content }}
    />
    <EditButton />
  </Container>
)

export { EditableView }
