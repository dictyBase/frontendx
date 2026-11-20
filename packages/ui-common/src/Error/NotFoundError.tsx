import { Grid, Typography, Container } from "@mui/material"
import { BackToHomepageButton } from "../BackToHomepageButton"
import { errorStyles } from "./errorStyles"

/**
 * UI display when an item was not found.
 */

const NotFoundError = () => (
  <Grid container sx={errorStyles.mainGrid} justifyContent="center">
    <Grid item xs={10} md={8}>
      <Container sx={errorStyles.error400}>
        <img
          src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
          alt="Sad Dicty -- Page Not Found"
        />
        <Typography variant="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography sx={errorStyles.paragraph}>
          Sorry! We can&apos;t find that page.
        </Typography>
        <Typography sx={errorStyles.paragraph}>
          You can try one of the links in our navbar above, or head back to the
          homepage.
        </Typography>
        <BackToHomepageButton />
      </Container>
    </Grid>
  </Grid>
)

export { NotFoundError }
