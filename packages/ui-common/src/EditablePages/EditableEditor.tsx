/* eslint-disable camelcase */
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"
import { EditableContentToolbar } from "./EditableContentToolbar"

type EditableEditorProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditableEditor = ({ data }: EditableEditorProperties) => {
  const { updated_at, updated_by, content, slug } = data

  return (
    <>
      <EditableContentToolbar user={updated_by} lastUpdate={updated_at} />
      <Editor
        editable={false}
        content={{ storageKey: slug, editorState: content }}
      />
    </>
  )
}

export { EditableEditor }
