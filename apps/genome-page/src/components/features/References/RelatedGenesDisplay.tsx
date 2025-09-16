import { makeStyles, Grid } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import {
  map as Amap,
  mapWithIndex as AmapWithIndex,
  makeBy as AmakeBy,
} from "fp-ts/Array"
import { Gene } from "dicty-graphql-schema"
import { GeneChip } from "./GeneChip"
import { GeneChipFiller } from "./GeneChipFiller"

type RelatedGenesProperties = {
  genes: Array<Gene>
  maxCount: number
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "0",
    padding: "0",
    listStyle: "none",
  },
  item: {
    flexBasis: "25%",
  },
  chip: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `2px 2px ${blueGrey[300]}`,
    fontSize: "1rem",
    width: "100%",
  },
}))

const filler = { _tag: "filler" }

const RelatedGenesDisplay = ({ genes, maxCount }: RelatedGenesProperties) => {
  const classes = useStyles()
  return (
    <Grid
      component="ul"
      container
      spacing={2}
      className={classes.container}
      data-testid="related-genes-list">
      {pipe(
        genes,
        Amap((gene) => (
          <Grid component="li" item className={classes.item} key={gene.id}>
            <GeneChip gene={gene} />
          </Grid>
        )),
      )}
      {pipe(
        AmakeBy(maxCount - genes.length, () => filler),
        AmapWithIndex((index) => (
          <Grid item className={classes.item} key={index}>
            <GeneChipFiller />
          </Grid>
        )),
      )}
    </Grid>
  )
}

export { RelatedGenesDisplay }
