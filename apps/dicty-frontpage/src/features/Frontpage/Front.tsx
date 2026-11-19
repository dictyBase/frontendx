import { Grid, Container } from "@mui/material"
import { Theme } from "@mui/material/styles"
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

const topItemStyle = {
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 1,
  paddingRight: 1,
}

/** This is the frontpage component that appears when the user hits the "/" route. */

const Front = () => (
  <Container
    maxWidth="xl"
    sx={(theme: Theme) => ({
      marginTop: 2,
      marginBottom: 4,
      [theme.breakpoints.up("xl")]: {
        maxWidth: "90%",
      },
    })}>
    <title>dictyBase - your central resource for Dictyostelid genomics</title>
    <meta
      name="description"
      content="dictyBase is a central resource for Dictyostelid genomics"
    />
    <Grid container justifyContent="center">
      <Grid item sx={topItemStyle} sm={12} md={12} xl={12}>
        <StatusReportContainer />
      </Grid>
      <Grid item sx={topItemStyle} sm={12} md={6} xl={6}>
        <Slideshow />
      </Grid>
      <Grid item sx={topItemStyle} sm={12} md={6} xl={6}>
        <DictyNewsWithAuth />
      </Grid>
      <Grid item sx={topItemStyle} xs={12} xl={12}>
        <DictyInfoWithAuth />
      </Grid>
      <Grid item sx={topItemStyle} xs={12} xl={12}>
        <LatestPapers />
      </Grid>
      <Grid item sx={topItemStyle} xs={12} sm={4} lg={4} xl={4}>
        <Featured />
      </Grid>
      <Grid item sx={topItemStyle} xs={12} sm={4} lg={4} xl={4}>
        <RecentUpdates />
      </Grid>
      <Grid item sx={topItemStyle} xs={12} sm={4} lg={4} xl={4}>
        <ComingSoon text="Recent Annotations coming soon!" />
      </Grid>
    </Grid>
  </Container>
)

export { Front }
