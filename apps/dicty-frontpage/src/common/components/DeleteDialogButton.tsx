import { useState } from "react"
import { Button, makeStyles } from "@material-ui/core"
import { DeleteDialog } from "./DeleteDialog"

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}))

const DeleteDialogButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { button } = useStyles()

  const handleClick = () => {
    setIsDialogOpen(true)
  }

  const handleClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Button className={button} variant="contained" onClick={handleClick}>
        Delete
      </Button>
      <DeleteDialog open={isDialogOpen} onClose={handleClose} />
    </>
  )
}

export { DeleteDialogButton }
