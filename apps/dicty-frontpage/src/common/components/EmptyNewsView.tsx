import { Container, Typography, Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 35px 15px 35px",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
})

const EmptyNewsView = () => {
  const { header } = useStyles()
  return (
    <Container>
      <Grid className={header}>
        <Typography variant="h1" align="center">
          Dicty Community Resource News
        </Typography>
      </Grid>
      <Grid justifyContent="center" container>
        <Grid item>
          <Typography variant="h2">
            There are currently no news items.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { EmptyNewsView }
