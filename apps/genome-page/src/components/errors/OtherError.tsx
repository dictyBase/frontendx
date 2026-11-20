import { Box, Grid, Typography } from "@mui/material"
import { Image } from "@dictybase/dicty-image-mui5"
import { ErrorMessage } from "./ErrorMessage"

/**
 * UI display when there is a general error.
 */

const OtherError = () => (
  <Grid container justifyContent="center">
    <Grid item xs={10} md={8}>
      <Box
        sx={{
          textAlign: "center",
          paddingTop: "30px",
          paddingBottom: "30px",
          marginBottom: "30px",
          borderRadius: "5px",
        }}>
        <Image
          src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
          alt="Sad Dicty Logo"
          width="350px"
          height="200%"
        />
        <Typography variant="h2"> Sorry, something went wrong. </Typography>
        <ErrorMessage />
      </Box>
    </Grid>
  </Grid>
)

export { OtherError }
