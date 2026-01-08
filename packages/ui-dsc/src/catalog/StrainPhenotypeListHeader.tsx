import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { useStyles } from "./phenotypeStyles"

/**
 * PhenotypeListHeader contains the list of headers at the
 * top of the phenotype display.
 */

const StrainPhenotypeListHeader = () => {
  const { classes } = useStyles()

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

export { StrainPhenotypeListHeader }
