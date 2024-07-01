import { Container, Grid, makeStyles } from "@material-ui/core"
import NewReleasesIcon from "@material-ui/icons/NewReleases"
import { TitleBox } from "./TitleBox"
import { RecentStrainItems } from "./RecentStrainItems"
import { RecentPlasmidItems } from "./RecentPlasmidItems"

const useRecentUpdateStyles = makeStyles({
  main: {
    borderRadius: "10px",
    backgroundColor: "#eff8fb",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
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
        <Grid spacing={3} direction="column" container>
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
