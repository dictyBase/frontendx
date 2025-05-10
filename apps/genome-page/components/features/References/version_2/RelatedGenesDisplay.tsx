import { makeStyles, Grid } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import { mapWithIndex as AmapWithIndex } from "fp-ts/Array"
import { Gene } from "dicty-graphql-schema"
import { GeneChip } from "./GeneChip"

type RelatedGenesProperties = { genes: Array<Gene> }

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "auto"
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

const RelatedGenesDisplay = ({ genes }: RelatedGenesProperties) => {
  const classes = useStyles()
  return (
    <Grid container spacing={2} className={classes.container}>
      {pipe(
        genes,
        AmapWithIndex((index, gene) => (
          <Grid item className={classes.item} key={index}>
            <GeneChip key={gene.id} gene={gene} />
          </Grid>
        )),
      )}
    </Grid>
  )
}

export { RelatedGenesDisplay }
