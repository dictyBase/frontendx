import { Grid, Typography } from "@mui/material"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { grey } from "@mui/material/colors"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { commaSeparateWithAnd } from "common/utils/strings"
import { SelectedPublication } from "common/@types"

type RelatedGenesHeaderProperties = {
  publication: SelectedPublication
}

const RelatedGenesHeader = ({
  publication: { title, authors, journal, pages, related_genes },
}: RelatedGenesHeaderProperties) => (
  <Grid container direction="column" spacing={1}>
    <Grid item>
      <Typography variant="h4" sx={{ color: grey[800] }}>
        <b>{related_genes.length}</b> Genes mentioned in &nbsp;
      </Typography>
    </Grid>
    <Grid item sx={{ marginBottom: "0.25rem" }}>
      <Typography variant="h2">
        {parseFormattedStringToDomElements(title)} <i>{journal}</i>, {pages}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body1">
        {pipe(
          authors,
          Amap((author) => author.last_name),
          commaSeparateWithAnd,
        )}
      </Typography>
    </Grid>
  </Grid>
)

export { RelatedGenesHeader }
