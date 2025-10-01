import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const Heading = () => (
  <Grid
    item
    sx={{
      paddingBottom: "0px !important",
      "& h1": {
        fontSize: "48px",
        marginTop: "0px",
        marginBottom: "25px",
        borderBottom: "1px solid #eee",
      },
    }}>
    <Typography variant="h1">Welcome to Dicty Stock Center (DSC)</Typography>
  </Grid>
)

export { Heading }
