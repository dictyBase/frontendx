import { FunctionComponent, Dispatch, SetStateAction } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

const EditableInfoText: FunctionComponent<{
  text: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}> = ({ text, setIsEditing }) => {
  const handleClick = () => {
    setIsEditing(true)
  }
  return (
    <Stack direction="column" spacing={1}>
      {text}
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Edit
        </Button>
      </Stack>
    </Stack>
  )
}

export { EditableInfoText }
