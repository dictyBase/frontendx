import { Paper, Grid } from "@mui/material"
import { SelectedPublication } from "common/@types"
import { RelatedGenesContent } from "./RelatedGenesContent"
import { RelatedGenesNavigation } from "./RelatedGenesNavigation"

type MentionedGenesProperties = {
  publication: SelectedPublication
}

const spacerStyle = {
  flex: "1 1 0%",
}

const RelatedGenesContainer = ({ publication }: MentionedGenesProperties) => (
  <Paper sx={{ padding: "1rem", paddingBottom: "2rem" }}>
    <Grid container direction="row">
      <Grid item sx={spacerStyle}>
        <RelatedGenesNavigation />
      </Grid>
      <Grid item sx={{ flexBasis: "60%" }}>
        <RelatedGenesContent publication={publication} />
      </Grid>
      <Grid item sx={spacerStyle} />
    </Grid>
  </Paper>
)

export { RelatedGenesContainer }
