import { Box } from "@mui/material"
import { Editor } from "@dictybase/editor"
import { Heading } from "./Heading"

type StockCenterInfoDisplayProperties = {
  content: string
  slug: string
}

const StockCenterInfoDisplay = ({
  content,
  slug,
}: StockCenterInfoDisplayProperties) => (
  <Box>
    <Heading />
    <Editor
      editable={false}
      content={{ storageKey: slug, editorState: content }}
    />
  </Box>
)

export { StockCenterInfoDisplay }
