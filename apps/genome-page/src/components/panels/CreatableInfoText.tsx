import { FunctionComponent, Dispatch, SetStateAction } from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

const CreatableInfoText: FunctionComponent<{
  setIsCreating: Dispatch<SetStateAction<boolean>>
}> = ({ setIsCreating }) => {
  const handleOpenCreate = () => {
    setIsCreating(true)
  }
  return (
    <Button
      startIcon={<AddIcon />}
      onClick={handleOpenCreate}
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        borderRadius: "9999px",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}>
      Create
    </Button>
  )
}

export { CreatableInfoText }
