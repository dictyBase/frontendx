import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme: Theme) => ({
  leftContainer: {
    backgroundColor: "#e6f2ff",
    fontSize: "1.1em",
    fontWeight: 400,
    display: "table-cell",
    padding: "4px 56px 4px 24px",
    verticalAlign: "middle",
    [theme.breakpoints.down("sm")]: {
      padding: "2px 8px 2px 8px",
      minWidth: 95,
    },
  },
  innerSpan: {
    height: "100%",
    verticalAlign: "middle",
  },
}))

/**
 * LeftDisplay represents the left side of the inner panel content.
 */

const LeftDisplay = ({ children }: any) => {
  const classes = useStyles()

  return (
    <Grid item xs={2} component="span" className={classes.leftContainer}>
      <span className={classes.innerSpan}>{children}</span>
    </Grid>
  )
}

export default LeftDisplay
