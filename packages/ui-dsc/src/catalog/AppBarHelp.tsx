import { useState } from "react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { HelpDialog } from "./HelpDialog"

/**
 * AppBarHelp handles the display of the appbar help feature.
 */

const AppBarHelp = () => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false)

  const handleClick = () => {
    setHelpDialogOpen(!helpDialogOpen)
  }

  return (
    <Box sx={{
      minHeight: "inherit",
      height: "100%",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: "4px",
    }}>
      <IconButton
        size="small"
        onClick={handleClick}
        title="Catalog Help"
        sx={{ color: "#555" }}
        aria-label="Learn more about the stock catalog page">
        <HelpOutlineIcon />
      </IconButton>
      <HelpDialog
        helpDialogOpen={helpDialogOpen}
        setHelpDialogOpen={setHelpDialogOpen}
      />
    </Box>
  )
}

export { AppBarHelp }
