import { useContentBySlugQuery } from "dicty-graphql-schema"
import { P, match } from "ts-pattern"
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

  return (
    <>
      {match({ loading, error, data })
        .with(
          {
            data: {
              contentBySlug: {
                content: P.select("content", P.not(undefined)),
                slug: P.select("slug_", P.string),
              },
            },
          },
          ({ content, slug_ }) => (
            <Editor
              editable={false}
              content={{ editorState: content, storageKey: slug_ }}
            />
          ),
        )
        .with({ loading: true }, () => (
          <PanelLoader skeletonCount={skeletonCount} />
        ))
        .with({ error: P.not(undefined) }, () => (
          <div>Error fetching data</div>
        ))}
    </>
  )
}

export { EditablePanel }
