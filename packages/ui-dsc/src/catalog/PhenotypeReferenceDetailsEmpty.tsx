import makeStyles from '@mui/styles/makeStyles';
import { yellow } from "@mui/material/colors"
import { Container, Typography, Grid } from "@mui/material"
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined"

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
