import { Container, Grid, Typography, makeStyles } from "@material-ui/core"

const useFeaturedStyles = makeStyles((theme) => ({
  main: {
    borderRadius: "10px",
    backgroundColor: "#eff8fb",
  },
  inner: {
    paddingTop: "10px",
    paddingBottom: "10px",
    color: "#04313f",
  },
}))

const Featured = () => {
  const { main, inner } = useFeaturedStyles()
  return (
    <Container disableGutters className={main}>
      <Container className={inner}>
        <Grid spacing={1} direction="column" container>
          <Grid item>
            <Typography variant="h1"> Featured </Typography>
          </Grid>
          <Grid item>
            <a href="#">
              <Typography> Dicty Stock Center </Typography>
            </a>
          </Grid>
          <Grid item>
            <a href="#">
              <Typography> Gene Browser </Typography>
            </a>
          </Grid>
          <Grid item>
            <a href="#">
              <Typography> Gene Page </Typography>
            </a>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export { Featured }
