// import { useContentBySlugQuery } from "dicty-graphql-schema"
import { P, match } from "ts-pattern"
import { Editor } from "editor"
// import { PanelLoader } from "./PanelLoader"

const temporaryContent = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 2,
                mode: "normal",
                style: "font-size: 20px;",
                text: "Content coming soon!",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "flex-layout",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

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

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditablePanel = ({ slug, skeletonCount }: EditablePanelProperties) => (
  // const { loading, error, data } = useContentBySlugQuery({
  //   variables: {
  //     slug,
  //   },
  //   fetchPolicy: "cache-and-network",
  // })

  <>
    {match({
      loading: false,
      error: undefined,
      data: { contentBySlug: { content: temporaryContent, slug: "home" } },
    })
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
            content={{
              editorState: JSON.stringify(content),
              storageKey: slug_,
            }}
          />
        ),
      )
      // .with({ loading: true }, () => (
      //   <PanelLoader skeletonCount={skeletonCount} />
      // ))
      // .with({ error: P.not(undefined) }, () => (
      //   <div>Error fetching data</div>
      // ))
      .otherwise(() => (
        <> This message should not appear. </>
      ))}
  </>
)

export { EditablePanel }
