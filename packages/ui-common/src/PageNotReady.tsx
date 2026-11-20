import { Box, Grid, Button } from "@mui/material"
import FontAwesome from "react-fontawesome"
import { Image } from "@dictybase/dicty-image-mui5"

const paragraphStyle = {
  paddingLeft: "10px",
  paddingRight: "10px",
}

/**
 * Fallback component for non-existent routes -- "Page Not Ready"/"Under Construction"
 */

const PageNotReady = () => (
  <Grid container sx={{ marginTop: "40px" }} justifyContent="center">
    <Grid item xs={10} md={8}>
      <Box
        sx={{
          backgroundColor: "#eff8fb",
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
        <h1>
          <FontAwesome name="wrench" /> Content Not Ready
        </h1>
        <Box component="p" sx={paragraphStyle}>
          This page is not ready yet.
        </Box>
        <Box component="p" sx={paragraphStyle}>
          We are constantly adding content to our new website so check back
          soon!
        </Box>
        <Button
          sx={{ width: "25%", textTransform: "none" }}
          href="/"
          size="small"
          variant="contained"
          color="primary">
          Back to homepage
        </Button>
      </Box>
    </Grid>
  </Grid>
)

export { PageNotReady }
