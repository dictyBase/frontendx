import { Box } from "@mui/material"
import { Editor } from "@dictybase/editor"

type StockCenterInfoDisplayProperties = {
  content: string
}

const StockCenterInfoDisplay = ({
  content,
}: StockCenterInfoDisplayProperties) => (
  <Box>
    <Editor editable={false} initialState={content} />
  </Box>
)

export { StockCenterInfoDisplay }
