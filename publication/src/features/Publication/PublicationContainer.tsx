import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
        width: 900,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    title: {
      textAlign: "center",
    },
  })

interface Props {
  classes: {
    layout: string
    title: string
  }
}

/**
 * PublicationContainer is the main component for an individual publication page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const PublicationContainer = (props: Props) => {
  const { classes } = props
  return (
    <Grid container spacing={16} className={classes.layout}>
      <Grid item xs={12}>
        <h1 className={classes.title}>dictyBase Literature</h1>
      </Grid>
      <Grid item xs={3}>
        <LeftSidebar />
      </Grid>
      <Grid item xs={9}>
        <PublicationDisplay />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PublicationContainer)
