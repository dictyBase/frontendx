import { Typography, Grid } from "@mui/material"

type EmptyPublicationsProperties = {
  /* A description of the time frame specified by the user */
  range: string
}
/**
 * display a message when there are no publications available for a given range.
 * It renders a container with a fixed height and a grey background color. Inside the
 * container, it displays a centered message with the range for which there are no publications.
 */
const EmptyPublications = ({ range }: EmptyPublicationsProperties) => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={(theme) => ({
      height: "400px",
      marginTop: "30px",
      marginBottom: "50px",
      borderRadius: "10px",
      backgroundColor: theme.palette.grey[400],
    })}>
    <Grid
      item
      sx={{
        textAlign: "center",
      }}>
      <Typography variant="h2">
        <em>No Publications for this range:</em>
      </Typography>
      <Typography variant="subtitle1">
        <em>{range}</em>
      </Typography>
    </Grid>
  </Grid>
)

export { EmptyPublications }
