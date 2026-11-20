import { orange } from "@mui/material/colors"
import { Box, Container, Typography, Grid } from "@mui/material"
import SearchOffIcon from "@mui/icons-material/SearchOff"

type PhenotypeNoResultsDisplayProperties = {
  /** The phenotype annotation that was searched for */
  phenotype: string
}

/**
 * Displayed when a phenotype search returns zero matching strains.
 */
const PhenotypeNoResultsDisplay = ({
  phenotype,
}: PhenotypeNoResultsDisplayProperties) => (
  <Container
    sx={{
      backgroundColor: orange[50],
      borderRadius: "0.5rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      fontWeight: 600,
    }}>
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <SearchOffIcon />
      </Grid>
      <Grid item>
        <Typography variant="body2" data-testid="phenotype-no-results">
          No strains found with phenotype&nbsp;
          <Box component="span" sx={{ fontStyle: "italic" }}>
            {`"${phenotype}"`}
          </Box>
        </Typography>
      </Grid>
    </Grid>
  </Container>
)

export { PhenotypeNoResultsDisplay }
