import { makeStyles } from "tss-react/mui"
import { orange } from "@mui/material/colors"
import { Container, Typography, Grid } from "@mui/material"
import SearchOffIcon from "@mui/icons-material/SearchOff"

const useStyles = makeStyles()({
  root: {
    backgroundColor: orange[50],
    borderRadius: "0.5rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    fontWeight: 600,
  },
  phenotype: {
    fontStyle: "italic",
  },
})

type PhenotypeNoResultsDisplayProperties = {
  /** The phenotype annotation that was searched for */
  phenotype: string
}

/**
 * Displayed when a phenotype search returns zero matching strains.
 */
const PhenotypeNoResultsDisplay = ({
  phenotype,
}: PhenotypeNoResultsDisplayProperties) => {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <SearchOffIcon />
        </Grid>
        <Grid item>
          <Typography variant="body2" data-testid="phenotype-no-results">
            No strains found with phenotype&nbsp;
            <span className={classes.phenotype}>"{phenotype}"</span>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeNoResultsDisplay }