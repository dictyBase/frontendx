import { FunctionComponent, useState } from "react"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import Grow from "@mui/material/Grow"
import Fade from "@mui/material/Fade"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

const DeletableChip: FunctionComponent<{
  label: string
  handleDelete: (value: string) => Promise<void>
}> = ({ label, handleDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleDeleteClick = () => {
    setIsConfirming(true)
  }

  const handleConfirm = () => {
    handleDelete(label)
    setIsConfirming(false)
  }

  const handleCancel = () => {
    setIsConfirming(false)
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        minWidth: isConfirming ? 140 : "auto",
        transition: "min-width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
      {/* Normal State: Chip */}
      <Fade in={!isConfirming} timeout={200}>
        <Box
          sx={{
            position: isConfirming ? "absolute" : "relative",
            pointerEvents: isConfirming ? "none" : "auto",
          }}>
          <Grow in timeout={300}>
            <Chip label={label} onDelete={handleDeleteClick} />
          </Grow>
        </Box>
      </Fade>

      {/* Confirmation State: Delete/Cancel Buttons */}
      <Fade in={isConfirming} timeout={200}>
        <Box
          sx={{
            position: isConfirming ? "relative" : "absolute",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            pointerEvents: isConfirming ? "auto" : "none",
          }}>
          <Box
            sx={{
              fontSize: "0.8125rem",
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}>
            {`Delete ${label}?`}
          </Box>
          <IconButton
            size="small"
            onClick={handleConfirm}
            sx={{
              width: 28,
              height: 28,
              bgcolor: "error.main",
              color: "white",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            aria-label="Confirm delete">
            <CheckIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleCancel}
            sx={{
              width: 28,
              height: 28,
              bgcolor: "action.selected",
              color: "text.primary",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            aria-label="Cancel delete">
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Fade>
    </Box>
  )
}

export { DeletableChip }
