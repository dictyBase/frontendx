import { Paper, Typography, Grid, makeStyles } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import blue from "@material-ui/core/colors/blue"

const useNoStrainSelectedStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: blue[50],
  },
  gridContainer: {
    height: "100%",
  },
  infoText: {
    fontStyle: "italic",
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    fontSize: "5rem",
  },
}))

const NoStrainSelected = () => {
  const { root, gridContainer, searchIcon, infoText } =
    useNoStrainSelectedStyles()
  return (
    <Paper elevation={3} className={root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        className={gridContainer}>
        <Grid item>
          <Grid
            container
            direction="column"
            className={gridContainer}
            justifyContent="center"
            alignItems="center">
            <Grid item>
              <SearchIcon fontSize="large" className={searchIcon} />
            </Grid>
            <Grid item>
              <Typography className={infoText} color="textSecondary">
                Select a Strain to View Its Existing Phenotypes
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { NoStrainSelected }
