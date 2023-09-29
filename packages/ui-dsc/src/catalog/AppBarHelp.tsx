import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { HelpDialog } from "./HelpDialog"

const useStyles = makeStyles({
  helpIcon: {
    color: "#555",
  },
  helpButtonHolder: {
    minHeight: "inherit",
    height: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
  },
})

/**
 * AppBarHelp handles the display of the appbar help feature.
 */

const AppBarHelp = () => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false)
  const classes = useStyles()

  const handleClick = () => {
    setHelpDialogOpen(!helpDialogOpen)
  }

  return (
    <Box className={classes.helpButtonHolder}>
      <IconButton
        size="small"
        onClick={handleClick}
        title="Catalog Help"
        className={classes.helpIcon}
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
