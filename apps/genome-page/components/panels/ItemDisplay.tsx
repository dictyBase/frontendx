import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles({
  container: {
    borderBottom: "1px dotted #A3BAE9",
    display: "table",
    height: "48px",
  },
})

/**
 * Wrapper component for each item inside panel. This is used with the
 * LeftDisplay and RightDisplay as children.
 */

const ItemDisplay = ({ children }: any) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      {children}
    </Grid>
  )
}

export { ItemDisplay }
