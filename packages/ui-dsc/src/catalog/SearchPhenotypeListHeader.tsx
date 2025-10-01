import Grid from "@mui/material/Grid"
import Hidden from "@mui/material/Hidden"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"


const SearchPhenotypeListHeader = () => {
  return (
    <List sx={{ padding: 0 }}>
      <ListItem sx={{
        borderBottom: "1px solid #888",
        backgroundColor: "#f6f9fc",
        color: "#525f7f",
        fontWeight: 600,
      }}>
        <Grid container spacing={0} alignItems="center">
          <Grid item sm={3}>
            Strain Descriptor
          </Grid>
          <Hidden xsDown>
            <Grid item sm={3}>
              Associated Gene(s)
            </Grid>
          </Hidden>
          <Hidden mdDown>
            <Grid item sm={6}>
              Reference
            </Grid>
          </Hidden>
        </Grid>
      </ListItem>
    </List>
  )
}

export { SearchPhenotypeListHeader }
