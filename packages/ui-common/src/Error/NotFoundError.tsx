import { Grid, Typography, Container } from "@material-ui/core"
import { BackToHomepageButton } from "../BackToHomepageButton"
import { useStyles } from "./errorStyles"

/**
 * UI display when an item was not found.
 */

const NotFoundError = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justifyContent="center">
      <Grid item xs={10} md={8}>
        <Container className={classes.error400}>
          <img
            src="https://storage.dictybase.dev/editor/assets/2024-06-10/bd362d90-6a23-44a3-a5b4-fbaaaa5117bd"
            alt="Sad Dicty -- Page Not Found"
          />
          <Typography variant="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography className={classes.paragraph}>
            Sorry! We can&apos;t find that page.
          </Typography>
          <Typography className={classes.paragraph}>
            You can try one of the links in our navbar above, or head back to
            the homepage.
          </Typography>
          <BackToHomepageButton />
        </Container>
      </Grid>
    </Grid>
  )
}

export { NotFoundError }
