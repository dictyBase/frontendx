import { FunctionComponent, SetStateAction } from "react"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const EditingContent: FunctionComponent<{
  content: string
  setIsEditing: SetStateAction<boolean>
}> = ({ content, setIsEditing }) => (
  <Stack direction="row">
    <TextField
      multiline
      fullWidth
      maxRows={4}
      variant="outlined"
      value={content}
    />
    <Button sx={{ alignSelf: "flex-start" }}> Save </Button>
    <Button sx={{ alignSelf: "flex-start" }}> Cancel </Button>
  </Stack>
)

export { EditingContent }
