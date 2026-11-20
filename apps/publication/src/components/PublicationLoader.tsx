import React from "react"
import { Container, Box, Grid, Skeleton } from "@mui/material"
import { makeBy as AmakeBy } from "fp-ts/Array"
import { grey } from "@mui/material/colors"
import { PublicationSidebarLoader } from "./PublicationSidebarLoader"

const PublicationLoader = () => (
  <Box sx={{ backgroundColor: grey[100] }} data-testid="skeleton-loader">
    <Container
      disableGutters
      sx={{
        backgroundColor: "white",
        boxShadow: `2px 2px 7px ${grey[300]}, -2px 2px 7px ${grey[300]}`,
      }}>
      <Grid container direction="row">
        <Grid
          item
          xs={12}
          sm={12}
          md={1}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
            },
          })}>
          <PublicationSidebarLoader />
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <Box sx={{ padding: 3 }}>
            <Skeleton height="100px" />
            {AmakeBy(3, (index) => (
              <Skeleton key={`a-${index}`} height="40px" />
            ))}
            <br />
            {AmakeBy(8, (index) => (
              <Skeleton key={`b-${index}`} height="40px" />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
)

export { PublicationLoader }
