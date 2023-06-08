import { Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { formatDateISOString } from "../utils"

type RecentNewsPreviewMetadataProperties = {
  slug: string
  name: string
  updatedBy: {
    firstName: string
    lastName: string
  }
  updatedAt: string
}

const RecentNewsPreviewMetadata = ({
  slug,
  name,
  updatedAt,
  updatedBy,
}: RecentNewsPreviewMetadataProperties) => (
  <Grid container direction="column">
    <Grid container justifyContent="space-between">
      <Grid item>
        <Link to={`/news/${slug}`}>
          <Typography variant="h2">{name}</Typography>
        </Link>
      </Grid>
      <Grid item>
        <Typography>{formatDateISOString(updatedAt)}</Typography>
      </Grid>
    </Grid>
    <Grid item>
      <Typography>{`by ${updatedBy.firstName} ${updatedBy.lastName}`}</Typography>
    </Grid>
  </Grid>
)

export default RecentNewsPreviewMetadata
