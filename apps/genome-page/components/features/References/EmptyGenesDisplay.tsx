import { makeStyles, Grid } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import { mapWithIndex as AmapWithIndex, makeBy as AmakeBy } from "fp-ts/Array"
import { GeneChipFiller } from "./GeneChipFiller"
import { EmptyGenesOverlay } from "./EmptyGenesOverlay"

type RelatedGenesProperties = {
  maxCount: number
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "100%",
    margin: "auto",
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

const EmptyGenesDisplay = ({ maxCount }: RelatedGenesProperties) => {
  const classes = useStyles()
  return (
    <Grid container spacing={2} className={classes.container}>
      <EmptyGenesOverlay />
      {pipe(
        AmakeBy(maxCount, () => filler),
        AmapWithIndex((index) => (
          <Grid item className={classes.item} key={index}>
            <GeneChipFiller />
          </Grid>
        )),
      )}
    </Grid>
  )
}

export { EmptyGenesDisplay }
