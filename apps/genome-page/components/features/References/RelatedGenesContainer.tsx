import { Paper, Grid, makeStyles } from "@material-ui/core"
import { SelectedPublication } from "common/@types"
import { RelatedGenesContent } from "./RelatedGenesContent"
import { RelatedGenesNavigation } from "./RelatedGenesNavigation"

type MentionedGenesProperties = {
  publication: SelectedPublication
}

const useStyles = makeStyles({
  withPadding: {
    padding: "1rem",
    paddingBottom: "2rem",
  },
  genes: {
    alignSelf: "center",
    paddingBottom: "2rem",
  },
  spacer: {
    flex: "1 1 0%",
  },
})

const RelatedGenesContainer = ({ publication }: MentionedGenesProperties) => {
  const classes = useStyles()
  return (
    <Paper className={classes.withPadding}>
      <Grid container direction="row">
        <Grid item className={classes.spacer}>
          <RelatedGenesNavigation />
        </Grid>
        <Grid item>
          <RelatedGenesContent publication={publication} />
        </Grid>
        <Grid item className={classes.spacer} />
      </Grid>
    </Paper>
  )
}

export { RelatedGenesContainer }
