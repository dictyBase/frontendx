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
import { useAuthorizedCreateGeneGeneralInfo } from "common/hooks/useAuthorizedCreateGeneGeneralInfo"

const CreatingInfoText: FunctionComponent<{
  id: string
  setIsCreating: Dispatch<SetStateAction<boolean>>
}> = ({ id, setIsCreating }) => {
  const [text, setText] = useState("")
  const create = useAuthorizedCreateGeneGeneralInfo()

  const handleSave = () => {
    if (SisEmpty(text)) return
    create(id, { description: text })
    setIsCreating(false)
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    currentTarget: { value },
  }) => {
    setText(value)
  }

  const handleCancel = () => {
    setIsCreating(false)
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

export { CreatingInfoText }
