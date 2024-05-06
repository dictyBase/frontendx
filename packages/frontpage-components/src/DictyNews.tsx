import { Box, Typography, Grid } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { makeBy as AmakeBy, map as Amap } from "fp-ts/Array"

const DictyNews = () => (
  <Box>
    <Grid direction="column" spacing={1} container>
      <Grid item>
        <Typography variant="h1">Dicty News</Typography>
      </Grid>
      {pipe(
        AmakeBy(5, (index) => index),
        Amap((key) => (
          <Grid key={key} item>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Grid>
        )),
      )}
    </Grid>
  </Box>
)

export { DictyNews }
