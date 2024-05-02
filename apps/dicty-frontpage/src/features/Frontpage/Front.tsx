import { Helmet } from "react-helmet"
import { Box, Grid, Container } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { DictyNews, RecentUpdates, ComingSoon } from "frontpage-components"
import { Slideshow } from "./Slideshow"
import { LatestPapers } from "./LatestPapers"
import { Popular } from "./Popular"

const useStyles = makeStyles((theme: Theme) => ({
  topItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bottomItem: {
    padding: "1px 2px 1px 2px",
  },
  main: {
    [theme.breakpoints.up("xl")]: {
      maxWidth: "90%",
    },
  },
}))

/** This is the frontpage component that appears when the user hits the "/" route. */

const Front = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="xl" className={classes.main}>
      <Helmet>
        <title>
          dictyBase - your central resource for Dictyostelid genomics
        </title>
        <meta
          name="description"
          content="dictyBase is a central resource for Dictyostelid genomics"
        />
      </Helmet>
      <Grid container justifyContent="center">
        <Grid item className={classes.topItem} sm={12} md={6} xl={6}>
          <Slideshow />
        </Grid>
        <Grid item className={classes.topItem} sm={12} md={6} xl={6}>
          <DictyNews />
        </Grid>
        <Grid item className={classes.topItem} xs={12} xl={12}>
          <LatestPapers />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={4} lg={4} xl={4}>
          <Popular />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={4} lg={4} xl={4}>
          <RecentUpdates />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={4} lg={4} xl={4}>
          <ComingSoon text="Recent Annotations coming soon!" height="325px" />
        </Grid>
      </Grid>
    </Container>
  )
}

export { Front }
