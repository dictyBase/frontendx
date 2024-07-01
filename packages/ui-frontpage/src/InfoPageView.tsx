import { Editor } from "@dictybase/editor"
import Box from "@material-ui/core/Box"
import { ContentBySlugQuery } from "dicty-graphql-schema"

type InfoPageViewProperties = {
  /** Page content object */
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

/** Displays the info page data that was fetched from the InfoPage component */

const InfoPageView = ({ data }: InfoPageViewProperties) => (
  <Box>
    <Editor
      editable={false}
      content={{ storageKey: data.slug, editorState: data.content }}
    />
  </Box>
)

export { InfoPageView }
