import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles({
  rightContainer: {
    width: "80%",
    height: "100%",
    display: "table-cell",
    padding: "4px 56px 4px 24px",
    verticalAlign: "middle",
  },
  innerSpan: {
    height: "100%",
    fontSize: "0.8125rem",
    fontWeight: 400,
  },
})

/**
 * RightDisplay represents the right side of the inner panel content.
 */

const RightDisplay = ({ children }: any) => {
  const classes = useStyles()

  return (
    <Grid item xs={10} component="span" className={classes.rightContainer}>
      <span className={classes.innerSpan}>{children}</span>
    </Grid>
  )
}

export default RightDisplay
