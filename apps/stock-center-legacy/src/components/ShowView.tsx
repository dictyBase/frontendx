import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "@dictybase/editor"

type ShowViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

/**
 * A React component that renders the a view for editable content pages.
 *
 * @returns The rendered ContentView component.
 */
const ShowView = ({ data }: ShowViewProperties) => {
  const { slug, content } = data
  return (
    <Editor
      editable={false}
      content={{ storageKey: slug, editorState: content }}
    />
  )
}

export { ShowView }
