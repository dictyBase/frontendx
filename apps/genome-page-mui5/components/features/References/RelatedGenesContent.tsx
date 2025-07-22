import { Grid } from "@material-ui/core"
import { SelectedPublication } from "common/@types"
import { RelatedGenesHeader } from "./RelatedGenesHeader"
import { RelatedGenesPager } from "./RelatedGenesPager"

type RelatedGenesContentProperties = {
  publication: SelectedPublication
}

const RelatedGenesContent = ({
  publication,
}: RelatedGenesContentProperties) => (
  <Grid container direction="column" alignItems="stretch" spacing={3}>
    <Grid item>
      <RelatedGenesHeader publication={publication} />
    </Grid>
    <Grid item>
      <RelatedGenesPager genes={publication.related_genes} />
    </Grid>
  </Grid>
)

export { RelatedGenesContent }
