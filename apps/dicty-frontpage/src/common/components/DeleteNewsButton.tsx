import { useState } from "react"
import { Fab, Tooltip, makeStyles } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { red } from "@material-ui/core/colors"
import { DeleteSelectedNewsDialog } from "./DeleteSelectedNewsDialog"

const useDeleteNewsButtonStyles = makeStyles({
  root: {
    backgroundColor: red[700],
    color: red[50],
    "&:hover": {
      backgroundColor: red[900],
    },
  },
})

const DeleteNewsButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { root } = useDeleteNewsButtonStyles()
  const handleClick = () => {
    setIsDialogOpen(true)
  }
  const handleClose = () => {
    setIsDialogOpen(false)
  }
  return (
    <>
      <Tooltip
        title="Delete Selected News Articles"
        aria-label="delete-news-articles">
        <Fab className={root} onClick={handleClick}>
          <DeleteIcon />
        </Fab>
      </Tooltip>
      <DeleteSelectedNewsDialog open={isDialogOpen} onClose={handleClose} />
    </>
  )
}

export { DeleteNewsButton }
