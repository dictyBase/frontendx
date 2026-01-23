import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  useState,
} from "react"
import { isEmpty as SisEmpty } from "fp-ts/string"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useAuthorizedUpdateGeneGeneralInfo } from "common/hooks/useAuthorizedUpdateGeneGeneralInfo"

const EditingInfoText: FunctionComponent<{
  id: string
  initialText: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}> = ({ id, initialText, setIsEditing }) => {
  const [text, setText] = useState(initialText)
  const update = useAuthorizedUpdateGeneGeneralInfo()

  const handleSave = () => {
    if (text !== initialText) update(id, { description: text })
    setIsEditing(false)
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    currentTarget: { value },
  }) => {
    setText(value)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <Stack direction="column" spacing={1}>
      <TextField
        autoFocus
        multiline
        fullWidth
        maxRows={4}
        variant="outlined"
        value={text}
        onChange={handleChange}
        InputProps={{ sx: { fontSize: ".8165rem" } }}
      />
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={SisEmpty(text)}>
          Save
        </Button>
        <Button variant="contained" color="inherit" onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  )
}

export { EditingInfoText }
