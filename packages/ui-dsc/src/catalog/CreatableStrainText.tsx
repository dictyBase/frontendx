import { Dispatch, SetStateAction } from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

const BUTTON_COLOR = "primary.main"

type CreatableStrainTextProperties = {
  /** State setter to enter creating mode */
  setIsCreating: Dispatch<SetStateAction<boolean>>
}

/**
 * Pill-shaped Create button rendered when a single-value strain field is currently empty.
 *
 * @param properties - Properties containing the `setIsCreating` state setter.
 * @returns The rendered CreatableStrainText component.
 */
const CreatableStrainText = ({
  setIsCreating,
}: CreatableStrainTextProperties) => {
  const handleOpenCreate = () => {
    setIsCreating(true)
  }

  return (
    <Button
      startIcon={<AddIcon />}
      onClick={handleOpenCreate}
      sx={{
        backgroundColor: BUTTON_COLOR,
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
          outlineColor: BUTTON_COLOR,
          outlineOffset: 2,
        },
      }}>
      Create
    </Button>
  )
}

export { CreatableStrainText, type CreatableStrainTextProperties }
