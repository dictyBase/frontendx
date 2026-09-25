import { makeStyles } from "tss-react/mui"
import { green } from "@mui/material/colors"
import { Container, Typography, Grid } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const useStyles = makeStyles()({
  root: {
    backgroundColor: green[50],
    borderRadius: "0.5rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    fontWeight: 600,
  },
})

/**
 * Displayed when no phenotype annotation has been selected. Prompts the user
 * to pick a Quality and Entity from the search form above.
 */
const PhenotypeEmptyDisplay = () => {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <Typography variant="body2" data-testid="phenotype-empty-display">
            Select a Quality and Entity to search for strains with a phenotype
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeEmptyDisplay }