import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

/**
 * PhenotypeListHeader contains the list of headers at the
 * top of the phenotype display.
 */

const StrainPhenotypeListHeader = () => (
  <List sx={{ padding: 0 }}>
    <ListItem
      sx={{
        borderBottom: "1px solid #888",
        backgroundColor: "#f4f6f8",
        color: "#525f7f",
        fontWeight: 600,
      }}>
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

export { StrainPhenotypeListHeader }
