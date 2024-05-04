import { Container, Grid, makeStyles } from "@material-ui/core"
import { TitleBox } from "./TitleBox"
import { RecentStrainItems } from "./RecentStrainItems"
import { RecentPlasmidItems } from "./RecentPlasmidItems"
import NewReleasesIcon from '@material-ui/icons/NewReleases'

const useRecentUpdateStyles = makeStyles({
  main: {
    borderRadius: "10px",
    backgroundColor: "#eff8fb",
  },
  inner: {
    paddingTop: "10px",
    paddingBottom: "10px",
    color: "#04313f",
  },
})

const RecentUpdates = () => {
  const { main, inner } = useRecentUpdateStyles()
  return (
    <Container disableGutters className={main}>
      <TitleBox content="New Stock Center Items" icon={<NewReleasesIcon />} />
      <Container className={inner}>
        <Grid direction="column" container>
          <Grid item>
            <RecentStrainItems />
          </Grid>
          <Grid item>
            <RecentPlasmidItems />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export { RecentUpdates }
