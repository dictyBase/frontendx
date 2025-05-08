import { Grid, makeStyles } from "@material-ui/core"
import { SelectedPublication } from "common/@types"
import { RelatedGenesHeader } from "./RelatedGenesHeader"
import { RelatedGenesDisplay } from "./RelatedGenesDisplay"

type RelatedGenesContentProperties = {
  publication: SelectedPublication
}

const useStyles = makeStyles({
  genes: {
    alignSelf: "center",
  },
})

const RelatedGenesContent = ({
  publication,
}: RelatedGenesContentProperties) => {
  const classes = useStyles()
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <RelatedGenesHeader publication={publication} />
      </Grid>
      <Grid item className={classes.genes}>
        <RelatedGenesDisplay genes={publication.related_genes} />
      </Grid>
    </Grid>
  )
}

export { RelatedGenesContent }
