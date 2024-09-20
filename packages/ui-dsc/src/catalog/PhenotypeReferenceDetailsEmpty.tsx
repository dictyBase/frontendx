import { makeStyles } from "@material-ui/core/styles"
import { yellow } from "@material-ui/core/colors"
import { Container, Typography, Grid } from "@material-ui/core"
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined"

const useStyles = makeStyles({
  root: {
    backgroundColor: yellow[50],
    borderRadius: "0.5rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    fontWeight: 600,
  },
})

const PhenotypeReferenceDetailsEmpty = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <LibraryBooksOutlinedIcon />
        </Grid>
        <Grid item>
          <Typography variant="body2" data-testid="publication-display">
            Enter a Publication ID
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeReferenceDetailsEmpty }
