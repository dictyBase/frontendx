import { red } from "@mui/material/colors"
import { Container, Typography, Grid } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"


type PhenotypeReferenceDetailsErrorProperties = {
  publicationId: string
}

const PhenotypeReferenceDetailsError = ({
  publicationId,
}: PhenotypeReferenceDetailsErrorProperties) => {
  return (
    <Container sx={{
      backgroundColor: red[50],
      borderRadius: "0.5rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      fontWeight: 600,
    }}>
      <Grid container spacing={1} alignItems="center" wrap="nowrap">
        <Grid item>
          <ErrorOutlineIcon />
        </Grid>
        <Grid item>
          <Typography variant="body2" data-testid="publication-display">
            {`Could not find Publication with ID ${publicationId}`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeReferenceDetailsError }
