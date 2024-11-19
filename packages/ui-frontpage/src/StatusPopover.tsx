import React from "react"
import { Link } from "react-router-dom"
import { Typography, Popover, Grid, makeStyles } from "@material-ui/core"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import { UptimeProperties } from "./types"
import { StatusList } from "./StatusList"

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

type StatusListProperties = {
  summaries: Array<UptimeProperties>
}
const StatusPopover = ({ summaries }: StatusListProperties) => {
  const classes = useStyles()
  const [anchorElement, setAnchorElement] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorElement(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorElement(null)
  }

  const open = Boolean(anchorElement)

  return (
    <div>
      <Link to="https://status.dictybase.dev/">
        <Grid
          style={{ color: "green", textDecoration: "underline" }}
          container
          alignItems="center">
          <Grid item>
            <Typography
              variant="h3"
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}>
              Live Site Status
            </Typography>
          </Grid>
          <FiberManualRecordIcon />
          <Grid item />
        </Grid>
      </Link>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <StatusList summaries={summaries} />
      </Popover>
    </div>
  )
}

export { StatusPopover }
