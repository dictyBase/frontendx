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
    <Stack direction="column" spacing={1}>
      <TextField
        InputProps={{ sx: { fontSize: ".8165rem" } }}
        multiline
        fullWidth
        maxRows={4}
        variant="outlined"
        defaultValue={content}
      />
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="inherit" onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  )
}

export { EditingContent }
