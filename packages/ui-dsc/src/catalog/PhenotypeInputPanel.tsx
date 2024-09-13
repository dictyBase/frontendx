import { Paper, Container, Grid, makeStyles } from "@material-ui/core"
import { StrainAutocomplete } from "./StrainAutocomplete"
import { PhenotypeAutocomplete } from "./PhenotypeAutocomplete"
import { PhenotypeNotesField } from "./PhenotypeNotesField"

const useStyles = makeStyles({
  root: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
})
const PhenotypeInputPanel = () => {
  const { root } = useStyles()
  return (
    <Paper elevation={3} className={root}>
      <Container>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <StrainAutocomplete />
          </Grid>
          <Grid item>
            <PhenotypeAutocomplete />
          </Grid>
          <Grid item>
            <PhenotypeAutocomplete />
          </Grid>
          <Grid item>
            <PhenotypeAutocomplete />
          </Grid>
          <Grid item>
            <PhenotypeAutocomplete />
          </Grid>
          <Grid item>
            <PhenotypeNotesField />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}

export { PhenotypeInputPanel }
