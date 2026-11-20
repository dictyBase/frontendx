import { useState } from "react"
import { Button } from "@mui/material"
import { DeleteDialog } from "./DeleteDialog"

const DeleteDialogButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClick = () => {
    setIsDialogOpen(true)
  }

  const handleClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Button
        sx={{
          backgroundColor: "error.main",
          color: "error.contrastText",
        }}
        variant="contained"
        onClick={handleClick}>
        Delete
      </Button>
      <DeleteDialog open={isDialogOpen} onClose={handleClose} />
    </>
  )
}

export { DeleteDialogButton }
