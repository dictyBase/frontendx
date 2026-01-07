import Grid from "@mui/material/Grid"
import Hidden from "@mui/material/Hidden"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  listHeaders: {
    borderBottom: "1px solid #888",
    backgroundColor: "#f6f9fc",
    color: "#525f7f",
    fontWeight: 600,
  },
  list: {
    padding: 0,
  },
});

const SearchPhenotypeListHeader = () => {
  const { classes } = useStyles()

  return (
    (<List className={classes.list}>
      <ListItem className={classes.listHeaders}>
        <Grid container spacing={0} alignItems="center">
          <Grid item sm={3}>
            Strain Descriptor
          </Grid>
          <Hidden smDown>
            <Grid item sm={3}>
              Associated Gene(s)
            </Grid>
          </Hidden>
          <Hidden lgDown>
            <Grid item sm={6}>
              Reference
            </Grid>
          </Hidden>
        </Grid>
      </ListItem>
    </List>)
  );
}

export { SearchPhenotypeListHeader }
