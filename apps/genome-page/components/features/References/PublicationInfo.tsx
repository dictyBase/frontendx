import { Grid, Typography } from "@material-ui/core"
import { SelectedPublication } from "common/@types"

type PublicationInfoProperties = {
  publication: SelectedPublication
}

const PublicationInfo = ({ publication }: PublicationInfoProperties) => (
  <Grid container direction="column" justifyContent="center">
    <Grid item>
      <Grid container direction="row" justifyContent="center">
        <Typography variant="h2"> {publication.title} </Typography>
      </Grid>
    </Grid>
  </Grid>
)

export { PublicationInfo }
