import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"

type ContentViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

/**
 * A React component that renders the a view for editable content pages.
 *
 * @returns The rendered ContentView component.
 */
const ContentView = ({ data }: ContentViewProperties) => (
  <Container>
    <Editor
      editable={false}
      content={{ storageKey: data.slug, editorState: data.content }}
    />
  </Container>
)

export { ContentView }
