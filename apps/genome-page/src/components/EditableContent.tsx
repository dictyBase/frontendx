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
    <Stack direction="row" spacing={1}>
      {content}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Edit
      </Button>
    </Stack>
  )
}

export { EditableContent }
