import { FunctionComponent, Dispatch, SetStateAction } from "react"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const EditingContent: FunctionComponent<{
  content: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}> = ({ content, setIsEditing }) => {
  const handleSave = () => {}
  const handleCancel = () => {
    setIsEditing(false)
  }
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        multiline
        fullWidth
        maxRows={4}
        variant="outlined"
        value={content}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="contained" color="inherit" onClick={handleCancel}>
        Cancel
      </Button>
    </Stack>
  )
}

export { EditingContent }
