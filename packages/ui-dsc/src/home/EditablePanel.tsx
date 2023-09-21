import { useContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"
import { PanelLoader } from "./PanelLoader"

type EditablePanelProperties = {
  /** The slug name for the data to fetch */
  slug: string
  /** Number of skeleton lines to display during loading */
  skeletonCount: number
}

/**
 * EditablePanel fetches content from the GraphQL server and
 * displays it as editable content if the user is properly
 * authorized.
 */

const EditablePanel = ({ slug, skeletonCount }: EditablePanelProperties) => {
  const { loading, error, data } = useContentBySlugQuery({
    variables: {
      slug,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) {
    return <PanelLoader skeletonCount={skeletonCount} />
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  return <Editor content={{ editorState: data?.contentBySlug }} />
}

export { EditablePanel }
