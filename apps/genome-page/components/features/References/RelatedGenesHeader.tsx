import { Grid, Typography, makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { grey } from "@material-ui/core/colors"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { commaSeparateWithAnd } from "common/utils/strings"
import { SelectedPublication } from "common/@types"

type RelatedGenesHeaderProperties = {
  publication: SelectedPublication
}

const useStyles = makeStyles({
  text: {
    color: grey[800],
  },
  main: {
    marginBottom: "0.25rem",
  },
})

const RelatedGenesHeader = ({
  publication: { title, authors, journal, pages, related_genes },
}: RelatedGenesHeaderProperties) => {
  const classes = useStyles()
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h4" className={classes.text}>
          <b>{related_genes.length}</b> Genes mentioned in &nbsp;
        </Typography>
      </Grid>
      <Grid item className={classes.main}>
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
}

export { RelatedGenesHeader }
