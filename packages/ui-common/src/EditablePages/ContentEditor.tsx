import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"
import x from "./testContent.json"

type ContentEditorProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

/**
 * A React component that renders the a view for editable content pages.
 *
 * @returns The rendered ContentView component.
 */
const ContentEditor = ({ data }: ContentEditorProperties) => (
  <Editor
    editable={false}
    content={{ storageKey: data.slug, editorState: JSON.stringify(x) }}
  />
)

export { ContentEditor }
