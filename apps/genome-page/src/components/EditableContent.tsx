import { FunctionComponent, Dispatch, SetStateAction } from "react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

const EditableContent: FunctionComponent<{
  content: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}> = ({ content, setIsEditing }) => {
  const handleClick = () => {
    setIsEditing(true)
  }
  return (
    <Stack direction="column" spacing={1}>
      {content}
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Edit
        </Button>
      </Stack>
    </Stack>
  )
}

export { EditableContent }
