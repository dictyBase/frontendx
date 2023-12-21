import { Editor } from "editor"
import { type ContentBySlugQuery } from "dicty-graphql-schema"

type ContentViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const ContentView = ({ data }: ContentViewProperties) => (
  <Editor
    editable={false}
    content={{ storageKey: data.slug, editorState: data.content }}
  />
)

export { ContentView }
