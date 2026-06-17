import { Box } from "@mui/material"
import { Editor } from "@dictybase/editor"

type StockCenterInfoDisplayProperties = {
  content: string
  slug: string
}

const StockCenterInfoDisplay = ({
  content,
  slug,
}: StockCenterInfoDisplayProperties) => (
  <Box>
    <Editor
      editable={false}
      content={{ storageKey: slug, editorState: content }}
    />
  </Box>
)

export { StockCenterInfoDisplay }
