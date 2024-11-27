import React from "react"
import { makeStyles, Theme, Grid, Box } from "@material-ui/core"
import { blue, grey } from "@material-ui/core/colors"
import CallMadeIcon from "@material-ui/icons/CallMade"
import ShareIcon from "@material-ui/icons/Share"
import EmailIcon from "@material-ui/icons/Email"

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: "none",
    color: "#0059b3",
  },
  section: {
    height: "100%",
    backgroundColor: blue[50],
    position: "sticky",
    top: 40,
    paddingTop: theme.spacing(3),
    borderRadius: "0.5rem",
    boxShadow: `${grey[500]} 1px 1px 1px`,
    rowGap: theme.spacing(3),
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      alignItems: "baseline",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      flexDirection: "row",
      columnGap: theme.spacing(3),
    },
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}))

type Properties = {
  doi: string | undefined | null
  title: string
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

const PublicationSidebar = ({ doi, title }: Properties) => {
  const classes = useStyles()
  const doiURL = `https://doi.org/${doi}`
  const url = window.location.href

  return (
    <Grid container direction="column" className={classes.section}>
      <Grid item>
        <a
          href={doiURL}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <CallMadeIcon />
            </Grid>
            <Grid item>Full Text</Grid>
          </Grid>
        </a>
      </Grid>
      <Grid item>
        <a
          href={`mailto:?subject=${title}&body=I thought you might find this article interesting: ${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <EmailIcon />
            </Grid>
            <Grid item>Email to</Grid>
          </Grid>
        </a>
      </Grid>
    </Grid>
  )
}

export { PublicationSidebar }
