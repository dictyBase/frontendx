import { makeStyles } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"
import { Container, Typography, Grid } from "@material-ui/core"
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline"

const useStyles = makeStyles({
  root: {
    backgroundColor: red[50],
    borderRadius: "0.5rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    fontWeight: 600,
  },
})

type PhenotypeReferenceDetailsErrorProperties = {
  publicationId: string
}

const PhenotypeReferenceDetailsError = ({
  publicationId,
}: PhenotypeReferenceDetailsErrorProperties) => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container spacing={1} alignItems="center" wrap="nowrap">
        <Grid item>
          <ErrorOutlineIcon />
        </Grid>
        <Grid item>
          <Typography variant="body2" data-testid="publication-display">
            {`Could not find Publication with ID ${publicationId}`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeReferenceDetailsError }
