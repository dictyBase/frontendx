import React from "react"
import Grid from "@material-ui/core/Grid"
import Skeleton from "react-loading-skeleton"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.up(1300 + theme.spacing(3) * 2)]: {
        width: 1300,
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

export const PublicationLoader = (props: Props) => {
  const { classes } = props

  return (
    <Grid container spacing={2} className={classes.layout}>
      <Grid item xs={12}>
        <h1 className={classes.title}>dictyBase Literature</h1>
      </Grid>
      <Grid item xs={3}>
        <Skeleton count={5} />
      </Grid>
      <Grid item xs={9}>
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PublicationLoader)
