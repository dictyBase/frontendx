import { Grid, Box, Typography } from "@material-ui/core"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type LatestPapersProperties = {
  data: Array<PublicationItem>
}

type SinglePaperProperties = {
  data: PublicationItem
}

const SinglePaper = ({ data }: SinglePaperProperties) => (
  <Box>
    <Typography>{data.title}</Typography>
  </Box>
)

const LatestPapersView = ({ data }: LatestPapersProperties) => (
  <Grid>
    {data.map((p) => (
      <SinglePaper data={p} />
    ))}
  </Grid>
)

export { LatestPapersView }
