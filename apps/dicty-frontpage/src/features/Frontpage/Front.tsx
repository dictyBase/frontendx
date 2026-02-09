import { Helmet } from "react-helmet"
import { Grid, Container } from "@mui/material"
import { Theme } from "@mui/material/styles"
import { makeStyles } from "tss-react/mui"
import {
  RecentUpdates,
  ComingSoon,
  Featured,
  StatusReportContainer,
  Slideshow,
} from "@dictybase/ui-frontpage"
import { LatestPapers } from "./LatestPapers"
import { DictyInfoWithAuth } from "./DictyInfoWithAuth"
import { DictyNewsWithAuth } from "./DictyNewsWithAuth"

const useStyles = makeStyles()((theme: Theme) => ({
  topItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bottomItem: {
    padding: "1px 2px 1px 2px",
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("xl")]: {
      maxWidth: "90%",
    },
  },
}))

/** This is the frontpage component that appears when the user hits the "/" route. */

const Front = () => {
  const { classes } = useStyles()

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
        <Grid item className={classes.topItem} sm={12} md={12} xl={12}>
          <StatusReportContainer />
        </Grid>
        <Grid item className={classes.topItem} sm={12} md={6} xl={6}>
          <Slideshow />
        </Grid>
        <Grid item className={classes.topItem} sm={12} md={6} xl={6}>
          <DictyNewsWithAuth />
        </Grid>
        <Grid item className={classes.topItem} xs={12} xl={12}>
          <DictyInfoWithAuth />
        </Grid>
        <Grid item className={classes.topItem} xs={12} xl={12}>
          <LatestPapers />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={4} lg={4} xl={4}>
          <Featured />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={4} lg={4} xl={4}>
          <RecentUpdates />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={4} lg={4} xl={4}>
          <ComingSoon text="Recent Annotations coming soon!" />
        </Grid>
      </Grid>
    </Container>
  )
}

export { Front }
