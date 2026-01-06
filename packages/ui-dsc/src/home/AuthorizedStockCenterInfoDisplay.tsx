import { Box } from "@mui/material"
import { Editor } from "@dictybase/editor"
import { AuthorizedHeading } from "./AuthorizedHeading"

type StockCenterInfoDisplayProperties = {
  content: string
  slug: string
}

const AuthorizedStockCenterInfoDisplay = ({
  content,
  slug,
}: StockCenterInfoDisplayProperties) => (
  <Box>
    <AuthorizedHeading />
    <Editor
      editable={false}
      content={{ storageKey: slug, editorState: content }}
    />
  </Box>
)

export { AuthorizedStockCenterInfoDisplay }
