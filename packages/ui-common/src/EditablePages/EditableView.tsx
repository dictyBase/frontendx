/* eslint-disable camelcase */
import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"
import { EditContentToolbar } from "./EditContentToolbar"

type EditableViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditableView = ({ data }: EditableViewProperties) => {
  const { updated_at, updated_by, content, slug } = data

  return (
    <Container>
      <EditContentToolbar user={updated_by} lastUpdate={updated_at} />
      <Editor
        editable={false}
        content={{ storageKey: slug, editorState: content }}
      />
    </Container>
  )
}

export { EditableView }
