import { FunctionComponent, Dispatch, SetStateAction } from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

const buttonColor = "primary.main"

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
        backgroundColor: buttonColor,
        color: "primary.contrastText",
        borderRadius: "9999px",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        boxShadow: 2,
        transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          bgcolor: "primary.dark",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: buttonColor,
          outlineOffset: 2,
        },
      }}>
      Create
    </Button>
  )
}

export { CreatableInfoText }
