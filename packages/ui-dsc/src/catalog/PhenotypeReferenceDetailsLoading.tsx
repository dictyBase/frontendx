import { blue } from "@material-ui/core/colors"
import { Container, Typography, Grid, CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    backgroundColor: blue[50],
    borderRadius: "0.5rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    fontWeight: 600,
  },
})

const PhenotypeReferenceDetailsLoading = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container spacing={1} alignItems="center" wrap="nowrap">
        <Grid item>
          <CircularProgress thickness={5.4} size={20}/>
        </Grid>
        <Grid item>
          <Typography variant="body2">Searching Publications...</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeReferenceDetailsLoading }
