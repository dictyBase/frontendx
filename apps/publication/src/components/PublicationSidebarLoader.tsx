import React from "react"
import { makeStyles, Theme, Grid } from "@material-ui/core"
import { blue, grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    height: "100%",
    backgroundColor: blue[50],
    position: "sticky",
    top: 40,
    paddingTop: theme.spacing(3),
    boxShadow: `${grey[500]} 1px 0px 1px`,
    rowGap: theme.spacing(3),
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      boxShadow: `${grey[500]} 0px 1px 1px`,
      alignItems: "baseline",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      flexDirection: "row",
      columnGap: theme.spacing(3),
    },
  },
}))

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

const PublicationSidebarLoader = () => {
  const classes = useStyles()
  return <Grid container direction="column" className={classes.section} />
}

export { PublicationSidebarLoader }
