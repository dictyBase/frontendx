import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  paper: {
    // minHeight: 600,
    width: "100%",
  },
  row: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    paddingLeft: "8px",
    paddingRight: "8px",
    "&:nth-child(odd)": {
      backgroundColor: "#F4F6F8",
    },
  },
  item: {
    paddingRight: "4px",
  },
  listHeaders: {
    borderBottom: "1px solid #888",
    backgroundColor: "#f4f6f8",
    color: "#525f7f",
    fontWeight: 600,
  },
  listTitle: {
    borderBottom: "1px solid #888",
    // textAlign: "center",
    // backgroundColor: "#f4f6f8",
    color: "#525f7f",
    fontWeight: 600,
    padding: "0.25rem",
  },
  list: {
    padding: 0,
  },
  button: {
    color: "#004080",
  },
})

/**
 * PhenotypeListHeader contains the list of headers at the
 * top of the phenotype display.
 */
const ExistingPhenotypeListHeader = () => {
  const classes = useStyles()

  return (
    <List className={classes.list}>
      <ListItem className={classes.listHeaders}>
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={3}>
            Phenotype
          </Grid>
          <Grid item xs={3}>
            Notes
          </Grid>
          <Grid item xs={3}>
            Assay & Environment
          </Grid>
          <Grid item xs={3}>
            Reference(s)
          </Grid>
        </Grid>
      </ListItem>
    </List>
  )
}

export { ExistingPhenotypeListHeader }
