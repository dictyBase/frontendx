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
 * Displayed when no phenotype has been entered in the search form. Prompts
 * the user to enter a phenotype above to search for matching strains.
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
            Enter a phenotype above to search for strains
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeEmptyDisplay }
