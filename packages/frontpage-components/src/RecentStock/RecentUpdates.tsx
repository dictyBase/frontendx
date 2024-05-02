import { Container, Grid, Typography, makeStyles } from "@material-ui/core"
import { TitleBox } from "./TitleBox"
import { RecentStrainItems } from "./RecentStrainItems"
import { RecentPlasmidItems } from "./RecentPlasmidItems"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import blue from "@material-ui/core/colors/blue"

const useRecentUpdateStyles = makeStyles((theme) => ({
  main: {
    borderRadius: "10px",
    backgroundColor: "#eff8fb",
  },
  inner: {
    paddingTop: "5px",
    paddingBottom: "10px",
    color: "#04313f",
  },
}))

const RecentUpdates = () => {
  const { main, inner } = useRecentUpdateStyles()
  return (
    <Container disableGutters className={main}>
      <TitleBox content="New Stock Center Items" icon={<ShoppingCartIcon />} />
      <Container className={inner}>
        <Grid spacing={1} justifyContent="flex-start" container>
          <Grid item>
            <Typography variant="h3"> Strains </Typography>
          </Grid>
          <Grid item>
            <RecentStrainItems />
          </Grid>
          <Grid item>
            <Typography variant="h3"> Plasmids </Typography>
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
