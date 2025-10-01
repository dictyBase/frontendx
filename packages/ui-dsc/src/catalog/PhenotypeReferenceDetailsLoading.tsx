import { blue } from "@mui/material/colors"
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material"


const PhenotypeReferenceDetailsLoading = () => {
  return (
    <Container sx={{
      backgroundColor: blue[50],
      borderRadius: "0.5rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      fontWeight: 600,
    }}>
      <Grid container spacing={1} alignItems="center" wrap="nowrap">
        <Grid item>
          <CircularProgress thickness={5.4} size={20} />
        </Grid>
        <Grid item>
          <Typography variant="body2">Searching Publications...</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeReferenceDetailsLoading }
